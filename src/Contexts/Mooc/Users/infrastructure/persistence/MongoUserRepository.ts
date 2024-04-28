import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { UserId } from '../../domain/types/UserId';

export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  image: string;
}

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  public async save(user: User): Promise<Nullable<User>> {
    return this.registerUser(user);
  }

  public async delete(email: string, id: UserId): Promise<void> {
    const collection = await this.collection();
    await collection.deleteOne({ email: email, _id: id.value });
  }

  public async search(email: string): Promise<Nullable<User>> {
    const collection = await this.collection();
    const document = await collection.findOne<UserDocument>({ email: email });
    console.log('usuario encontrado', document);
    return document ? User.fromPrimitives({ ...document, id: document._id }) : null;
  }

  protected collectionName(): string {
    return 'users';
  }
}
