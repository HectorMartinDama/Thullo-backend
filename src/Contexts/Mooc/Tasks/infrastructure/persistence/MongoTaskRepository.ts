import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { TaskRepository } from '../../domain/TaskRepository';
import { Task } from '../../domain/Task';
import { UserId } from '../../../Users/domain/types/UserId';
import { ListId } from '../../../Lists/domain/types/ListId';
import { TaskId } from '../../domain/types/TaskId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { Attachament } from '../../domain/types/TaskAttachment';

export interface TaskDocument {
  _id: string;
  title: string;
  cover?: string;
  description?: string;
  labels?: Array<Object>;
  attachments?: Array<Attachament>;
}

export class MongoTaskRepository extends MongoRepository<Task> implements TaskRepository {
  public save(userId: UserId, listId: ListId, task: Task): Promise<void> {
    return this.registerTask(userId, listId, task);
  }

  public async search(id: TaskId, userId: UserId): Promise<Nullable<Task>> {
    const collection = await this.collection();
    const document = await collection.findOne<TaskDocument>({ _id: id.value, user: userId.value });

    console.log(document);

    return document
      ? Task.fromPrimitives({
          id: document._id,
          title: document.title,
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

  public async addLabel(id: TaskId, userId: UserId, title: string, color: string): Promise<void> {
    const collection = await this.collection();
    const filter = { _id: id.value, user: userId.value };
    const document = { title, color };

    const updateDocument = { $push: { labels: document } };

    await collection.updateOne(filter, updateDocument);
  }

  public async addAttachment(id: TaskId, userId: UserId, name: string, url: string, key: string): Promise<void> {
    const collection = await this.collection();
    const filter = { _id: id.value, user: userId.value };
    const document = { name, url, key, createdAt: new Date() };

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

  protected collectionName(): string {
    return 'tasks';
  }
}
