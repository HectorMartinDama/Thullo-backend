import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateUserDomainEventAttributes = {
  readonly name: string;
  readonly email: string;
  readonly image: string;
};

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.created';

  readonly name: string;
  readonly email: string;
  readonly image: string;

  constructor({
    aggregateId,
    name,
    email,
    image,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    name: string;
    email: string;
    image: string;
    occurredOn?: Date;
  }) {
    super({ eventName: UserCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.name = name;
    this.email = email;
    this.image = image;
  }

  toPrimitives(): CreateUserDomainEventAttributes {
    const { name, email, image } = this;
    return { name, email, image };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: CreateUserDomainEventAttributes;
  }): DomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params;
    return new UserCreatedDomainEvent({
      aggregateId,
      name: attributes.name,
      email: attributes.email,
      image: attributes.image,
      eventId,
      occurredOn
    });
  }
}
