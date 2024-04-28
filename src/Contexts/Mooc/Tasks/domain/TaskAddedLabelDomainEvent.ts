import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type TaskAddedLabelDomainEventAttributes = {
  readonly title: string;
  readonly color: string;
};

export class TaskAddedLabelDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.addedLabel';
  readonly title: string;
  readonly color: string;

  constructor({
    aggregateId,
    title,
    color,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    title: string;
    color: string;
    occurredOn?: Date;
  }) {
    super({ eventName: TaskAddedLabelDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.title = title;
    this.color = color;
  }

  toPrimitives(): TaskAddedLabelDomainEventAttributes {
    const { title, color } = this;
    return { title, color };
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
      color: attributes.color,
      eventId,
      occurredOn
    });
  }
}
