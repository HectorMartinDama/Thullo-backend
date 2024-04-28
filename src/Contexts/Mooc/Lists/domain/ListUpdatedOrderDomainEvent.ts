import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type ListUpdatedOrderDomainEventAttributes = {
  readonly listsId: Array<string>;
  readonly userId: string;
  readonly boardId: string;
};

export class ListUpdatedOrderDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'list.updatedOrder';
  readonly listsId: Array<string>;
  readonly userId: string;
  readonly boardId: string;

  constructor({
    aggregateId,
    listsId,
    userId,
    boardId,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    listsId: Array<string>;
    userId: string;
    boardId: string;
  }) {
    super({ eventName: ListUpdatedOrderDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.listsId = listsId;
    this.userId = userId;
    this.boardId = boardId;
  }

  toPrimitives(): ListUpdatedOrderDomainEventAttributes {
    const { listsId, userId, boardId } = this;
    return { listsId, userId, boardId };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: ListUpdatedOrderDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new ListUpdatedOrderDomainEvent({
      aggregateId,
      listsId: attributes.listsId,
      userId: attributes.userId,
      boardId: attributes.boardId,
      eventId,
      occurredOn
    });
  }
}
