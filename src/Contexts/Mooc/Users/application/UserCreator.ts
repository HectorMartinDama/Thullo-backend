import { EventBus } from '../../../Shared/domain/EventBus';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { UserEmail } from '../domain/types/UserEmail';
import { UserId } from '../domain/types/UserId';
import { UserImage } from '../domain/types/UserImage';
import { UserName } from '../domain/types/UserName';

export class UserCreator {
  constructor(private respository: UserRepository, private eventBus: EventBus) {}

  async run(params: { id: UserId; name: UserName; email: UserEmail; image: UserImage }): Promise<void> {
    const user = User.create(params.id, params.name, params.email, params.image);
    const userCreated = await this.respository.save(user);
    if (!userCreated) throw new Error('User already exists');
    await this.eventBus.publish(user.pullDomainEvents()); // publicando los eventos que se generaron en el usuario
  }
}
