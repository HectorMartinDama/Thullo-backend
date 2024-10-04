import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type TaskRemovedLabelDomainEventAttributes = {
  readonly labelId: string;
  readonly userId: string;
};

export class TaskRemovedLabelDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.removedLabel';
  readonly labelId: string;
  readonly userId: string;

  constructor({
    aggregateId,
    labelId,
    userId,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    userId: string;
    labelId: string;
    occurredOn?: Date;
  }) {
    super({ eventName: TaskRemovedLabelDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.labelId = labelId;
    this.userId = userId;
  }

  toPrimitives(): TaskRemovedLabelDomainEventAttributes {
    const { labelId, userId } = this;
    return { labelId, userId };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TaskRemovedLabelDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskRemovedLabelDomainEvent({
      aggregateId,
      labelId: attributes.labelId,
      userId: attributes.userId,
      eventId,
      occurredOn
    });
  }
}
