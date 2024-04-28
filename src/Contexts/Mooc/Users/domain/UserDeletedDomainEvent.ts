import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type UserDeletedDomainEventAttributes = {
  readonly email: string;
  readonly id: string;
};

export class UserDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.deleted';
  readonly email: string;
  readonly id: string;

  constructor({
    aggregateId,
    email,
    id,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    email: string;
    id: string;
    occurredOn?: Date;
  }) {
    super({ eventName: UserDeletedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.email = email;
    this.id = id;
  }

  toPrimitives(): UserDeletedDomainEventAttributes {
    const { email, id } = this;
    return { email, id };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: UserDeletedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserDeletedDomainEvent({
      aggregateId,
      email: attributes.email,
      id: attributes.id,
      eventId,
      occurredOn
    });
  }
}
