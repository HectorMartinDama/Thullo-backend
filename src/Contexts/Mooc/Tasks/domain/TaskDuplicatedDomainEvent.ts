import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type TaskDuplicatedDomainEventAttributes = {
  readonly title: string;
  readonly id: string;
  readonly userId: string;
};

export class TaskDuplicatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.duplicated';
  readonly title: string;
  readonly id: string;
  readonly userId: string;

  constructor({
    aggregateId,
    userId,
    id,
    title,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    id: string;
    userId: string;
    title: string;
  }) {
    super({ eventName: TaskDuplicatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.id = id;
    this.userId = userId;
    this.title = title;
  }

  toPrimitives(): TaskDuplicatedDomainEventAttributes {
    const { userId, title, id } = this;
    return { userId, title, id };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TaskDuplicatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskDuplicatedDomainEvent({
      aggregateId,
      userId: attributes.userId,
      title: attributes.title,
      id: attributes.id,
      eventId,
      occurredOn
    });
  }
}
