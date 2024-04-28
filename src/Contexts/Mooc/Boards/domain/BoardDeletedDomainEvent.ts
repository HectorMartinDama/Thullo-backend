import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type BoardDeletedDomainEventAttributes = {
  readonly userId: string;
};

export class BaordDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'board.deleted';
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
    super({ eventName: BaordDeletedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
  }

  toPrimitives(): BoardDeletedDomainEventAttributes {
    const { userId } = this;
    return { userId };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: BoardDeletedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new BaordDeletedDomainEvent({
      aggregateId,
      userId: attributes.userId,
      eventId,
      occurredOn
    });
  }
}
