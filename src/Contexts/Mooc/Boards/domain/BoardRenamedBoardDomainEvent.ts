import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type BoardRenamedBoardDomainEventAttributes = {
  readonly userId: string;
  readonly title: string;
};

export class BoardRenamedBoardDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'board.changedTitle';
  readonly userId: string;
  readonly title: string;

  constructor({
    aggregateId,
    userId,
    title,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    userId: string;
    title: string;
  }) {
    super({ eventName: BoardRenamedBoardDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
    this.title = title;
  }

  toPrimitives(): BoardRenamedBoardDomainEventAttributes {
    const { userId, title } = this;
    return { userId, title };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: BoardRenamedBoardDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new BoardRenamedBoardDomainEvent({
      aggregateId,
      userId: attributes.userId,
      title: attributes.title,
      eventId,
      occurredOn
    });
  }
}
