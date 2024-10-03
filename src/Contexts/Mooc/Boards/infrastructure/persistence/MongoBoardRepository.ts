import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { List } from '../../../Lists/domain/List';
import { ListDocument } from '../../../Lists/infrastructure/persistence/MongoListRepository';
import { Task } from '../../../Tasks/domain/Task';
import { UserId } from '../../../Users/domain/types/UserId';
import { Board } from '../../domain/Board';
import { BoardRespository } from '../../domain/BoardRepository';
import { BoardId } from '../../domain/types/BoardId';
import { UserDocument } from '../../../Users/infrastructure/persistence/MongoUserRepository';
import { User } from '../../../Users/domain/User';
import { BoardVisibility } from '../../domain/types/BoardVisibility';
import { BoardBackground } from '../../domain/types/BoardBackground';

export interface BoardDocument {
  _id: string;
  title: string;
  background: string;
  visibility: string;
  description: string;
  user: UserDocument[];
  members: UserDocument[];
  lists: ListDocument[];
  favourites: Array<string>;
}

export class MongoBoardRepository extends MongoRepository<Board> implements BoardRespository {
  public save(userId: UserId, board: Board): Promise<void> {
    return this.registerBoard(userId, board);
  }

  public async delete(userId: UserId, id: BoardId): Promise<void> {
    const collection = await this.collection();
    await collection.deleteOne({ _id: id.value, user: userId.value });
  }

  public async searchAll(userId: UserId): Promise<Board[]> {
    const collection = await this.collection();
    const pipelineBoard = [
      {
        $match: {
          $or: [{ user: userId.value }, { 'members.value': userId.value }]
        }
      },
      { $sort: { createdAt: 1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'members.value', // Campo en la colección board
          foreignField: '_id', // Campo en la colección user
          as: 'membersDetails' // Nombre del nuevo campo con los datos de usuario
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'favourites',
          foreignField: '_id',
          as: 'favouritesDetails'
        }
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          background: { $first: '$background' },
          visibility: { $first: '$visibility' },
          favourites: { $first: '$favouritesDetails' },
          members: { $first: '$membersDetails' }
        }
      }
    ];

    const boardsComplete = await collection.aggregate<BoardDocument>(pipelineBoard).toArray();

    return boardsComplete.map(board =>
      Board.fromPrimitives({
        title: board.title,
        background: board.background,
        visibility: board.visibility,
        favourites: board.favourites,
        id: board._id,
        members: board.members.map(member =>
          User.fromPrimitives({ id: member._id, email: member.email, image: member.image, name: member.name })
        )
      })
    );
  }

  public async searchByIdComplete(userId: UserId, boardId: BoardId): Promise<Nullable<Board>> {
    const collection = await this.collection();

    let currentBoard = await collection.findOne<BoardDocument>({ _id: boardId.value });

    let pipelineBoard; //  join the both table boards, lists and tasks

    if (currentBoard?.visibility === 'public') {
      // all people see the board
      pipelineBoard = [
        {
          $match: {
            _id: boardId.value
          }
        },
        {
          $lookup: {
            from: 'lists',
            localField: '_id',
            foreignField: 'board',
            as: 'lists'
          }
        },
        {
          $lookup: {
            from: 'users', // Colección a la que se hace join
            localField: 'user', // Campo en la colección board
            foreignField: '_id', // Campo en la colección user
            as: 'userDetails' // Nombre del nuevo campo con los datos de usuario
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'favourites',
            foreignField: '_id',
            as: 'favouritesDetails'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'members.value', // Campo en la colección board
            foreignField: '_id', // Campo en la colección user
            as: 'membersDetails' // Nombre del nuevo campo con los datos de usuario
          }
        },
        {
          $unwind: '$lists'
        },
        {
          $lookup: {
            from: 'tasks',
            localField: 'lists._id',
            foreignField: 'list',
            as: 'lists.tasks'
          }
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            background: { $first: '$background' },
            visibility: { $first: '$visibility' },
            description: { $first: '$description' },
            user: { $first: '$userDetails' },
            members: { $first: '$membersDetails' },
            favourites: { $first: '$favouritesDetails' },
            lists: { $push: '$lists' }
          }
        }
      ];
    } else {
      pipelineBoard = [
        {
          $match: {
            _id: boardId.value,
            $or: [{ user: userId.value }, { 'members.value': userId.value }]
          }
        },
        {
          $lookup: {
            from: 'lists',
            localField: '_id',
            foreignField: 'board',
            as: 'lists'
          }
        },
        {
          $lookup: {
            from: 'users', // Colección a la que se hace join
            localField: 'user', // Campo en la colección board
            foreignField: '_id', // Campo en la colección user
            as: 'userDetails' // Nombre del nuevo campo con los datos de usuario
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'favourites',
            foreignField: '_id',
            as: 'favouritesDetails'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'members.value', // Campo en la colección board
            foreignField: '_id', // Campo en la colección user
            as: 'membersDetails' // Nombre del nuevo campo con los datos de usuario
          }
        },
        {
          $unwind: '$lists'
        },
        {
          $lookup: {
            from: 'tasks',
            localField: 'lists._id',
            foreignField: 'list',
            as: 'lists.tasks'
          }
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            background: { $first: '$background' },
            visibility: { $first: '$visibility' },
            description: { $first: '$description' },
            favourites: { $first: '$favouritesDetails' },
            members: { $first: '$membersDetails' },
            user: { $first: '$userDetails' },
            lists: { $push: '$lists' }
          }
        }
      ];
    }

    const boardCompleteTask = await collection.aggregate<BoardDocument>(pipelineBoard).toArray();

    console.log(
      'desde mongo',
      boardCompleteTask[0].lists.map(list => console.log(list))
    );

    return boardCompleteTask[0]
      ? Board.fromPrimitives({
          id: boardCompleteTask[0]._id,
          title: boardCompleteTask[0].title,
          background: boardCompleteTask[0].background,
          visibility: boardCompleteTask[0].visibility,
          description: boardCompleteTask[0].description,
          favourites: boardCompleteTask[0].favourites,
          user: User.fromPrimitives({
            id: boardCompleteTask[0].user[0]._id,
            name: boardCompleteTask[0].user[0].name,
            email: boardCompleteTask[0].user[0].email,
            image: boardCompleteTask[0].user[0].image
          }),
          members: boardCompleteTask[0].members.map(member =>
            User.fromPrimitives({ id: member._id, email: member.email, image: member.image, name: member.name })
          ),
          lists: boardCompleteTask[0].lists.map(list =>
            List.fromPrimitives({
              id: list._id,
              title: list.title,
              tasks: list.tasks.map(task =>
                Task.fromPrimitives({
                  id: task._id,
                  title: task.title,
                  description: task.description,
                  createdAt: task.createdAt,
                  cover: task.cover,
                  labels: task.labels,
                  attachment: task.attachments
                })
              )
            })
          )
        })
      : null;
  }

  public async searchById(userId: UserId, boardId: BoardId): Promise<Nullable<Board>> {
    try {
      const collection = await this.collection();
      let currentBoard = await collection.findOne<BoardDocument>({ _id: boardId.value });

      let pipelineBoard;
      if (currentBoard?.visibility === 'public') {
        // all people see the board
        pipelineBoard = [
          {
            $match: {
              _id: boardId.value
            }
          },
          {
            $lookup: {
              from: 'users', // Colección a la que se hace join
              localField: 'user', // Campo en la colección board
              foreignField: '_id', // Campo en la colección user
              as: 'userDetails' // Nombre del nuevo campo con los datos de usuario
            }
          },
          {
            $group: {
              _id: '$_id',
              title: { $first: '$title' },
              background: { $first: '$background' },
              visibility: { $first: '$visibility' },
              description: { $first: '$description' },
              user: { $first: '$userDetails' }
            }
          }
        ];
      } else {
        pipelineBoard = [
          {
            $match: {
              _id: boardId.value,
              $or: [{ user: userId.value }, { 'members.value': userId.value }]
            }
          },
          {
            $lookup: {
              from: 'users', // Colección a la que se hace join
              localField: 'user', // Campo en la colección board
              foreignField: '_id', // Campo en la colección user
              as: 'userDetails' // Nombre del nuevo campo con los datos de usuario
            }
          },
          {
            $group: {
              _id: '$_id',
              title: { $first: '$title' },
              background: { $first: '$background' },
              visibility: { $first: '$visibility' },
              description: { $first: '$description' },
              user: { $first: '$userDetails' }
            }
          }
        ];
      }

      const boardCompleteTask = await collection.aggregate<BoardDocument>(pipelineBoard).toArray();
      return boardCompleteTask[0]
        ? Board.fromPrimitives({
            id: boardCompleteTask[0]._id,
            title: boardCompleteTask[0].title,
            background: boardCompleteTask[0].background,
            visibility: boardCompleteTask[0].visibility,
            description: boardCompleteTask[0].description,
            user: User.fromPrimitives({
              id: boardCompleteTask[0].user[0]._id,
              name: boardCompleteTask[0].user[0].name,
              email: boardCompleteTask[0].user[0].email,
              image: boardCompleteTask[0].user[0].image
            })
          })
        : null;
    } catch (error) {
      console.log(error);
    }
  }

  public async addMember(userId: UserId, boardId: BoardId, memberId: UserId): Promise<void> {
    const collection = await this.collection();
    const filter = { _id: boardId.value, user: userId.value, members: { $nin: [userId.value] } };
    const updateBoard = { $push: { members: memberId } };
    await collection.updateOne(filter, updateBoard);
  }

  public async addFavourite(userId: UserId, id: BoardId): Promise<void> {
    const collection = await this.collection();

    const filter = {
      $and: [
        { _id: id.value },
        { favourites: { $nin: [userId.value] } },
        {
          $or: [{ user: userId.value }, { members: userId.value }]
        }
      ]
    };
    const updateBoard = { $push: { favourites: userId.value } };
    await collection.updateOne(filter, updateBoard);
  }

  public async removeFavourite(userId: UserId, id: BoardId): Promise<void> {
    const collection = await this.collection();
    await collection.updateOne({ _id: id.value }, { $pull: { favourites: userId.value } });
  }

  public async checkCanModify(userId: UserId, boardId: BoardId): Promise<Boolean> {
    const collection = await this.collection();
    const board = await collection.findOne<BoardDocument>({
      _id: boardId.value,
      $or: [{ user: userId.value }, { 'members.value': userId.value }]
    });
    if (board) return true;
    return false;
  }

  public async changeVisibility(userId: UserId, id: BoardId, visibility: BoardVisibility): Promise<void> {
    const collection = await this.collection();

    await collection.findOneAndUpdate(
      { _id: id.value, user: userId.value },
      { $set: { visibility: visibility.value } }
    );
  }

  public async changeBackground(userId: UserId, id: BoardId, background: BoardBackground): Promise<void> {
    const collection = await this.collection();

    await collection.findOneAndUpdate(
      { _id: id.value, user: userId.value },
      { $set: { background: background.value } }
    );
  }

  public async rename(userId: UserId, id: BoardId, title: string): Promise<void> {
    const collection = await this.collection();
    await collection.findOneAndUpdate({ _id: id.value, user: userId.value }, { $set: { title: title } });
  }

  protected collectionName(): string {
    return 'boards';
  }
}
