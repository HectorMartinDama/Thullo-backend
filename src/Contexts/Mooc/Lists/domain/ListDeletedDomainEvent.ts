import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type DeletedListDomainEventAttributes = {
  readonly userId: string;
};

export class ListDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'list.deleted';
  readonly userId: string;

  constructor({
    aggregateId,
    userId,

    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    userId: string;
    occurredOn?: Date;
  }) {
    super({ eventName: ListDeletedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
  }

  toPrimitives(): DeletedListDomainEventAttributes {
    const { userId } = this;
    return { userId };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: DeletedListDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new ListDeletedDomainEvent({
      aggregateId,
      userId: attributes.userId,
      eventId,
      occurredOn
    });
  }
}
