import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserEmail } from './types/UserEmail';
import { UserImage } from './types/UserImage';
import { UserName } from './types/UserName';
import { UserId } from './types/UserId';
import { UserCreatedDomainEvent } from './UserCreatedDomainEvent';
import { UserDeletedDomainEvent } from './UserDeletedDomainEvent';

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly name: UserName;
  readonly email: UserEmail;
  readonly image: UserImage;

  constructor({ id, name, email, image }: { id: UserId; name: UserName; email: UserEmail; image: UserImage }) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.image = image;
  }

  static create(id: UserId, name: UserName, email: UserEmail, image: UserImage): User {
    const user = new User({ id, name, email, image });
    user.record(
      new UserCreatedDomainEvent({
        aggregateId: user.id.value,
        name: user.name.value,
        email: user.email.value,
        image: user.image.value
      })
    );
    return user;
  }

  delete(id: UserId, email: string) {
    this.record(new UserDeletedDomainEvent({ aggregateId: this.id.value, id: id.value, email: email }));
  }

  static fromPrimitives(plainData: { id: string; name: string; email: string; image: string }): User {
    return new User({
      id: new UserId(plainData.id),
      name: new UserName(plainData.name),
      email: new UserEmail(plainData.email),
      image: new UserImage(plainData.image)
    });
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      image: this.image.value
    };
  }
}
