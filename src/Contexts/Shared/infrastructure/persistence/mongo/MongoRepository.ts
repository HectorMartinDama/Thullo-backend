import { Collection, MongoClient } from 'mongodb';
import { MongoCriteriaConverter } from '../../../../Backoffice/Courses/infrastructure/persistence/MongoCriteriaConverter';
import { AggregateRoot } from '../../../domain/AggregateRoot';
import { Criteria } from '../../../domain/criteria/Criteria';
import { UserId } from '../../../../Mooc/Users/domain/types/UserId';
import { Nullable } from '../../../domain/Nullable';
import { User } from '../../../../Mooc/Users/domain/User';
import { BoardId } from '../../../../Mooc/Boards/domain/types/BoardId';
import { ListId } from '../../../../Mooc/Lists/domain/types/ListId';

export abstract class MongoRepository<T extends AggregateRoot> {
  private criteriaConverter: MongoCriteriaConverter;

  constructor(private _client: Promise<MongoClient>) {
    this.criteriaConverter = new MongoCriteriaConverter();
  }

  protected abstract collectionName(): string;

  protected client(): Promise<MongoClient> {
    return this._client;
  }

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(this.collectionName());
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection();

    const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined };

    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
  }

  protected async registerBoard(userId: UserId, aggregateRoot: T): Promise<void> {
    const collection = await this.collection();
    const document = { ...aggregateRoot.toPrimitives(), user: userId.value, createdAt: new Date(), id: undefined };
    await collection.updateOne({ _id: aggregateRoot.toPrimitives().id }, { $set: document }, { upsert: true });
  }

  protected async registerList(userId: UserId, boardId: BoardId, aggregateRoot: T): Promise<void> {
    const collection = await this.collection();

    //TODO lo debo comprobar si el tablero existe en el usuario

    const document = {
      ...aggregateRoot.toPrimitives(),
      user: userId.value,
      board: boardId.value,
      id: undefined
    };

    console.log(document);

    await collection.updateOne({ _id: aggregateRoot.toPrimitives().id }, { $set: document }, { upsert: true });
  }

  protected async registerTask(userId: UserId, listId: ListId, aggregateRoot: T): Promise<void> {
    const collection = await this.collection();

    const document = {
      ...aggregateRoot.toPrimitives(),
      createdAt: new Date(),
      list: listId.value,
      user: userId.value,
      id: undefined
    };
    await collection.updateOne({ _id: aggregateRoot.toPrimitives().id }, { $set: document }, { upsert: true });
  }

  protected async deleteList(userId: UserId, id: ListId): Promise<void> {
    const collection = await this.collection();
    await collection.deleteOne({ _id: id.value, user: userId.value });
  }

  protected async registerUser(aggregateRoot: T): Promise<Nullable<User>> {
    const collection = await this.collection();
    const { id, email } = aggregateRoot.toPrimitives();

    const user = await collection.findOne({ email: email });

    // if not exists the user, save the user in db
    if (!user) {
      const document = {
        ...aggregateRoot.toPrimitives(),
        _id: id,
        id: undefined
      };

      await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
      return document;
    }
    return null;
  }

  protected async searchByCriteria<D>(criteria: Criteria): Promise<D[]> {
    const query = this.criteriaConverter.convert(criteria);

    const collection = await this.collection();

    return await collection.find<D>(query.filter, {}).sort(query.sort).skip(query.skip).limit(query.limit).toArray();
  }
}
