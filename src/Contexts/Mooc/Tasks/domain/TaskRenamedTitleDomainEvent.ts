import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type TaskRenamedTitleDomainEventAttributes = {
  readonly title: string;
  readonly userId: string;
};

export class TaskRenamedTitleDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.changedTitle';
  readonly title: string;
  readonly userId: string;

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
    super({ eventName: TaskRenamedTitleDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
    this.title = title;
  }

  toPrimitives(): TaskRenamedTitleDomainEventAttributes {
    const { userId, title } = this;
    return { userId, title };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TaskRenamedTitleDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskRenamedTitleDomainEvent({
      aggregateId,
      userId: attributes.userId,
      title: attributes.title,
      eventId,
      occurredOn
    });
  }
}
