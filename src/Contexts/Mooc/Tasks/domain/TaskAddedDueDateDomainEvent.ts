import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type TaskAddedDueDateDomainEventAttributes = {
  readonly date: string;
};

export class TaskAddedDueDateDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.addedDueDate';
  readonly date: string;

  constructor({
    aggregateId,
    date,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    date: string;
    occurredOn?: Date;
  }) {
    super({ eventName: TaskAddedDueDateDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.date = date;
  }

  toPrimitives(): TaskAddedDueDateDomainEventAttributes {
    const { date } = this;
    return { date };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TaskAddedDueDateDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskAddedDueDateDomainEvent({
      aggregateId,
      date: attributes.date,
      eventId,
      occurredOn
    });
  }
}
