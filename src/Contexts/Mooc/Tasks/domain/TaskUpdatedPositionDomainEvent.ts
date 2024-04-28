import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type TaskUpdatedPositionDomainEventAttributes = {
  readonly listId: string;
  readonly userId: string;
};

export class TaskUpdatedPositionDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.updatedPosition';
  readonly listId: string;
  readonly userId: string;

  constructor({
    aggregateId,
    listId,
    userId,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    listId: string;
    userId: string;
  }) {
    super({ eventName: TaskUpdatedPositionDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.listId = listId;
    this.userId = userId;
  }

  toPrimitives(): TaskUpdatedPositionDomainEventAttributes {
    const { listId, userId } = this;
    return { listId, userId };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TaskUpdatedPositionDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskUpdatedPositionDomainEvent({
      aggregateId,
      listId: attributes.listId,
      userId: attributes.userId,
      eventId,
      occurredOn
    });
  }
}
