import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type BoardChangedBackgroundDomainEventAttributes = {
  readonly userId: string;
};

export class BoardChangedBackgroundDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'board.changedBackground';
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
    super({ eventName: BoardChangedBackgroundDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
  }

  toPrimitives(): BoardChangedBackgroundDomainEventAttributes {
    const { userId } = this;
    return { userId };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: BoardChangedBackgroundDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new BoardChangedBackgroundDomainEvent({
      aggregateId,
      userId: attributes.userId,
      eventId,
      occurredOn
    });
  }
}
