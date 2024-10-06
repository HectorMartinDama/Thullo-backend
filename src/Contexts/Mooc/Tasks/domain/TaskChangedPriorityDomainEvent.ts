import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type TaskChangedPriorityDomainEventAttributes = {
  readonly priority: number;
  readonly userId: string;
};

export class TaskChangedPriorityDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.changedPriority';
  readonly priority: number;
  readonly userId: string;

  constructor({
    aggregateId,
    userId,
    priority,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    userId: string;
    priority: number;
  }) {
    super({ eventName: TaskChangedPriorityDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
    this.priority = priority;
  }

  toPrimitives(): TaskChangedPriorityDomainEventAttributes {
    const { userId, priority } = this;
    return { userId, priority };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TaskChangedPriorityDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskChangedPriorityDomainEvent({
      aggregateId,
      userId: attributes.userId,
      priority: attributes.priority,
      eventId,
      occurredOn
    });
  }
}
