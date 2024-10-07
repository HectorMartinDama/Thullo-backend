import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type DeletedTaskDomainEventAttributes = {
  readonly userId: string;
};

export class TaskDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.deleted';
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
    super({ eventName: TaskDeletedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
  }

  toPrimitives(): DeletedTaskDomainEventAttributes {
    const { userId } = this;
    return { userId };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: DeletedTaskDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskDeletedDomainEvent({
      aggregateId,
      userId: attributes.userId,
      eventId,
      occurredOn
    });
  }
}
