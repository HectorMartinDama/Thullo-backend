import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type TaskAddedDescriptionDomainEventAttributes = {
  readonly description: string;
};

export class TaskAddedDescriptionDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.addedDescription';
  readonly description: string;

  constructor({
    aggregateId,
    description,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    description: string;
    occurredOn?: Date;
  }) {
    super({ eventName: TaskAddedDescriptionDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.description = description;
  }

  toPrimitives(): TaskAddedDescriptionDomainEventAttributes {
    const { description } = this;
    return { description };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TaskAddedDescriptionDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskAddedDescriptionDomainEvent({
      aggregateId,
      description: attributes.description,
      eventId,
      occurredOn
    });
  }
}
