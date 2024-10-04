import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type TaskAddedLabelDomainEventAttributes = {
  readonly title: string;
};

export class TaskAddedLabelDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.addedLabel';
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
    super({ eventName: TaskAddedLabelDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.title = title;
  }

  toPrimitives(): TaskAddedLabelDomainEventAttributes {
    const { title } = this;
    return { title };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TaskAddedLabelDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskAddedLabelDomainEvent({
      aggregateId,
      title: attributes.title,
      eventId,
      occurredOn
    });
  }
}
