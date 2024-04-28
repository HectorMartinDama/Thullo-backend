import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type BoardChangedVisibiltyDomainEventAttributes = {
  readonly userId: string;
};

export class BoardChangedVisibiltyDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'board.changedVisibility';
  readonly userId: string;

  constructor({
    aggregateId,
    userId,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    userId: string;
  }) {
    super({ eventName: BoardChangedVisibiltyDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
  }

  toPrimitives(): BoardChangedVisibiltyDomainEventAttributes {
    const { userId } = this;
    return { userId };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: BoardChangedVisibiltyDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new BoardChangedVisibiltyDomainEvent({
      aggregateId,
      userId: attributes.userId,
      eventId,
      occurredOn
    });
  }
}
