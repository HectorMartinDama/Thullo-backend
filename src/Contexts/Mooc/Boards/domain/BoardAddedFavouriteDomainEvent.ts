import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type BoardAddedFavouriteDomainEventAttributes = {
  readonly userId: string;
  readonly id: string;
};

export class BoardAddedFavouriteDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'board.addedFavourite';
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
    super({ eventName: BoardAddedFavouriteDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
    this.id = id;
  }

  toPrimitives(): BoardAddedFavouriteDomainEventAttributes {
    const { userId, id } = this;
    return { userId, id };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: BoardAddedFavouriteDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new BoardAddedFavouriteDomainEvent({
      aggregateId,
      userId: attributes.userId,
      id: attributes.id,
      eventId,
      occurredOn
    });
  }
}
