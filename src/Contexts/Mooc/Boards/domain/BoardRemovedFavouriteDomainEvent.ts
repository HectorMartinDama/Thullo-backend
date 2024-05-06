import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type BoardRemovedFavouriteDomainEventAttributes = {
  readonly userId: string;
  readonly id: string;
};

export class BoardRemovedFavouriteDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'board.removedFavourite';
  readonly userId: string;
  readonly id: string;

  constructor({
    aggregateId,
    userId,
    id,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    userId: string;
    id: string;
    occurredOn?: Date;
  }) {
    super({ eventName: BoardRemovedFavouriteDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
    this.id = id;
  }

  toPrimitives(): BoardRemovedFavouriteDomainEventAttributes {
    const { userId, id } = this;
    return { userId, id };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: BoardRemovedFavouriteDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new BoardRemovedFavouriteDomainEvent({
      aggregateId,
      userId: attributes.userId,
      id: attributes.id,
      eventId,
      occurredOn
    });
  }
}
