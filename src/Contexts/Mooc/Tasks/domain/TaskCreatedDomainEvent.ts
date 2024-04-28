import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreatedTaskDomainEventAttributes = {
  readonly title: string;
};

export class TaskCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.created';
  readonly title: string;

  constructor({
    aggregateId,
    title,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    title: string;
    occurredOn?: Date;
  }) {
    super({ eventName: TaskCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.title = title;
  }

  toPrimitives(): CreatedTaskDomainEventAttributes {
    const { title } = this;
    return { title };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CreatedTaskDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskCreatedDomainEvent({
      aggregateId,
      title: attributes.title,
      eventId,
      occurredOn
    });
  }
}
