import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { List } from '../../domain/List';
import { ListRepository } from '../../domain/ListRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { ListId } from '../../domain/types/ListId';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { TaskDocument } from '../../../Tasks/infrastructure/persistence/MongoTaskRepository';
import { Task } from '../../../Tasks/domain/Task';

export interface ListDocument {
  _id: string;
  title: string;
  tasks: TaskDocument[];
}

export class MongoListRepository extends MongoRepository<List> implements ListRepository {
  public save(userId: UserId, boardId: BoardId, list: List): Promise<void> {
    return this.registerList(userId, boardId, list);
  }

  public delete(userId: UserId, listId: ListId): Promise<void> {
    return this.deleteList(userId, listId);
  }

  public async updateOrder(listsId: Array<ListId>, boardId: BoardId): Promise<void> {
    const collection = await this.collection();

    const originalsList = await collection.find({ _id: { $in: listsId.map(id => id.value) } }).toArray();
    const objetosOrdenados = listsId.map(id => originalsList.find(list => list._id === id.value));

    await collection.deleteMany({ board: boardId.value });
    await collection.insertMany(objetosOrdenados);
  }

  public async search(id: ListId, userId: UserId): Promise<Nullable<List>> {
    const collection = await this.collection();
    const document = await collection.findOne<ListDocument>({ _id: id.value, user: userId.value });

    return document
      ? List.fromPrimitives({
          ...document,
          id: document._id,
          tasks: []
        })
      : null;
  }

  public async searchAllListsByBoard(boardId: BoardId): Promise<Nullable<Array<List>>> {
    const collection = await this.collection();
    const lists = await collection.find({ board: boardId.value }, {}).toArray();

    return lists
      ? lists.map(list =>
          List.fromPrimitives({
            title: list.title,
            id: list._id
          })
        )
      : null;
  }

  public async searchAllListsCompleteBoard(boardId: BoardId): Promise<Nullable<Array<List>>> {
    const collection = await this.collection();
    const pipelineListTasks = [
      {
        $match: {
          board: boardId.value
        }
      },
      {
        $lookup: {
          from: 'tasks',
          localField: '_id', // Campo en la colección list
          foreignField: 'list', // Campo en la colección user
          as: 'tasks' // Nombre del nuevo campo con los datos de usuario
        }
      },
      {
        $unwind: '$tasks'
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          tasks: { $push: '$tasks' }
        }
      }
    ];

    const lists = await collection.aggregate<ListDocument>(pipelineListTasks).toArray();

    return lists.map(list =>
      List.fromPrimitives({
        id: list._id,
        title: list.title,
        tasks: list.tasks.map(task => Task.fromPrimitives({ id: task._id, title: task.title }))
      })
    );
  }

  protected collectionName(): string {
    return 'lists';
  }
}
