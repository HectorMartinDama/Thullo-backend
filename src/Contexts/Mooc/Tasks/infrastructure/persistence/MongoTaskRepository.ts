import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { TaskRepository } from '../../domain/TaskRepository';
import { Task } from '../../domain/Task';
import { UserId } from '../../../Users/domain/types/UserId';
import { ListId } from '../../../Lists/domain/types/ListId';
import { TaskId } from '../../domain/types/TaskId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { Attachament } from '../../domain/types/TaskAttachment';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { User } from '../../../Users/domain/User';
import { UserDocument } from '../../../Users/infrastructure/persistence/MongoUserRepository';

export interface TaskDocument {
  _id: string;
  title: string;
  priority: number;
  description?: string;
  createdAt: Date;
  user: UserDocument;
  dueDate?: string;
  cover?: string;
  labels?: Array<Object>;
  attachments?: Array<Attachament>;
}

export class MongoTaskRepository extends MongoRepository<Task> implements TaskRepository {
  public save(userId: UserId, listId: ListId, task: Task): Promise<void> {
    return this.registerTask(userId, listId, task);
  }

  public async search(id: TaskId): Promise<Nullable<Task>> {
    const collection = await this.collection();

    const pipelineTask = [
      {
        $match: {
          _id: id.value // Filtra por el ID único de la tarea
        }
      },
      {
        $lookup: {
          from: 'users', // Trae detalles del usuario que creó la tarea
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: {
          path: '$userDetails', // Desenrolla para tener userDetails como objeto
          preserveNullAndEmptyArrays: true // En caso de que no haya detalles, preserva el campo vacío
        }
      },
      {
        $unwind: {
          // Desenrolla el array de attachments para procesarlos individualmente
          path: '$attachments',
          preserveNullAndEmptyArrays: true // En caso de que no haya attachments, se preserva el array vacío
        }
      },
      {
        $lookup: {
          // Trae los detalles del usuario que subió cada attachment
          from: 'users',
          localField: 'attachments.user', // Supongo que cada attachment tiene un campo 'uploadedBy' que referencia al usuario
          foreignField: '_id',
          as: 'attachments.user'
        }
      },
      {
        $unwind: {
          // Desenrolla el resultado de 'attachments.userDetails' para aplanarlo
          path: '$attachments.user',
          preserveNullAndEmptyArrays: true // Si no hay detalles del usuario, preserva el array vacío
        }
      },
      {
        $group: {
          // Agrupamos nuevamente para reconstruir el array de attachments
          _id: '$_id',
          title: { $first: '$title' },
          createdAt: { $first: '$createdAt' },
          priority: { $first: '$priority' },
          dueDate: { $first: '$dueDate' },
          description: { $first: '$description' },
          cover: { $first: '$cover' },
          labels: { $first: '$labels' },
          user: { $first: '$userDetails' }, // userDetails ahora será un objeto, no un array
          attachments: { $push: '$attachments' } // Reconstruye el array de attachments con los detalles del usuario
        }
      },
      { $limit: 1 } // Limita el resultado a un documento
    ];

    const document = await collection.aggregate<TaskDocument>(pipelineTask).next();

    console.log('document', document);

    return document
      ? Task.fromPrimitives({
          id: document._id,
          title: document.title,
          createdAt: document.createdAt,
          priority: document.priority,
          user: User.fromPrimitives({
            id: document.user?._id,
            name: document.user?.name,
            email: document.user?.email,
            image: document.user?.image
          }),
          dueDate: document.dueDate,
          description: document.description,
          cover: document.cover,
          labels: document.labels,
          attachment: document.attachments
        })
      : null;
  }

  public async deleteListTasks(userId: UserId, listId: ListId): Promise<void> {
    const collection = await this.collection();
    await collection.deleteMany({ list: listId.value, user: userId.value });
  }

  public async addDescription(userId: UserId, id: TaskId, description: string): Promise<void> {
    const collection = await this.collection();
    const filter = { _id: id.value, user: userId.value };
    const updateDocument = { $set: { description: description } };
    await collection.updateOne(filter, updateDocument);
  }

  public async addCover(userId: UserId, id: TaskId, cover: string): Promise<void> {
    const collection = await this.collection();
    const filter = { _id: id.value, user: userId.value };
    const updateDocument = { $set: { cover: cover } };
    await collection.updateOne(filter, updateDocument);
  }

  public async addLabel(id: TaskId, userId: UserId, title: string): Promise<void> {
    const collection = await this.collection();
    const filter = { _id: id.value, user: userId.value };
    const document = { title, _id: Uuid.random().value };
    const updateDocument = { $push: { labels: document } };
    await collection.updateOne(filter, updateDocument);
  }

  public async addDueDate(id: TaskId, userId: UserId, date: string): Promise<void> {
    console.log('add due date');
    const collection = await this.collection();
    const filter = { _id: id.value, user: userId.value };
    const updateDocument = { $set: { dueDate: date } };
    await collection.updateOne(filter, updateDocument);
  }

  public async removeLabel(id: TaskId, labelId: string, userId: UserId): Promise<void> {
    const collection = await this.collection();
    await collection.updateOne({ _id: id.value, user: userId.value }, { $pull: { labels: { _id: labelId } } });
  }

  public async deleteAttachment(id: TaskId, key: string, userId: UserId): Promise<void> {
    const collection = await this.collection();
    await collection.updateOne({ _id: id.value }, { $pull: { attachments: { name: key, user: userId.value } } });
  }

  public async addAttachment(id: TaskId, userId: UserId, name: string, url: string, key: string): Promise<void> {
    const collection = await this.collection();
    const filter = { _id: id.value };
    const document = { name, url, user: userId.value, key, createdAt: new Date() };

    const updateDocument = { $push: { attachments: document } };
    await collection.updateOne(filter, updateDocument);
  }

  public async updatePosition(tasksId: TaskId[], userId: UserId, listId: ListId, id: TaskId): Promise<void> {
    const collection = await this.collection();
    const originalsTasks = await collection.find({ _id: { $in: tasksId.map(id => id.value) } }).toArray();
    const tasksOrganized = tasksId.map(id => originalsTasks.find(task => task._id === id.value));
    tasksOrganized.map(task => (task.list = listId.value));

    console.log('orignal tasks', listId.value);

    await collection.deleteOne({ _id: id.value, user: userId.value }); // borro la task de la posicion origen
    await collection.deleteMany({ list: listId.value, user: userId.value }); // borro todas tasks de la lista destino
    await collection.insertMany(tasksOrganized); // inserto las tasks ordenadas en la lista destino

    console.log('tasks organizadas de ¡una vex', tasksOrganized, 'tasksIds', tasksId);
  }

  public async getAttachments(userId: UserId, listId: ListId): Promise<Attachament[]> {
    const collection = await this.collection();
    let attachments: Array<Attachament> = [];

    const tasks = await collection.find({ list: listId.value }).toArray();

    if (tasks) {
      tasks.map(task => {
        if (task.attachments) {
          attachments.push(...task.attachments);
        }
      });
    }
    return attachments;
  }

  public async rename(userId: UserId, id: ListId, title: string): Promise<void> {
    const collection = await this.collection();
    await collection.findOneAndUpdate({ _id: id.value, user: userId.value }, { $set: { title: title } });
  }

  public async changePriority(id: TaskId, priority: number): Promise<void> {
    const collection = await this.collection();
    await collection.findOneAndUpdate({ _id: id.value }, { $set: { priority: priority } });
  }

  public async duplicateTask(id: TaskId): Promise<void> {
    const collection = await this.collection();
    const task = await collection.findOne({ _id: id.value });
    if (task) {
      task._id = Uuid.random().value; // generar un nuevo id automaticamente
      await collection.insertOne(task);
    }
  }

  public async deleteTask(id: TaskId): Promise<void> {
    const collection = await this.collection();
    await collection.deleteOne({ _id: id.value });
  }

  protected collectionName(): string {
    return 'tasks';
  }
}
