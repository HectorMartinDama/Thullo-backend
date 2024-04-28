import { Nullable } from '../../../Shared/domain/Nullable';
import { User } from './User';
import { UserId } from './types/UserId';

export interface UserRepository {
  save(user: User): Promise<Nullable<User>>;
  delete(email: string, id: UserId): Promise<void>;
  search(email: string): Promise<Nullable<User>>;
}
