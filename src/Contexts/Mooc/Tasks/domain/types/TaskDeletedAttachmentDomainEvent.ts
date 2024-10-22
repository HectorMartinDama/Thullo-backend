import { DomainEvent } from '../../../../Shared/domain/DomainEvent';

type TaskDeletedAttachmentDomainEventAttributes = {
  readonly key: string;
  readonly userId: string;
};

export class TaskDeletedAttachmentDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.deletedAttachment';
  readonly key: string;
  readonly userId: string;

  constructor({
    aggregateId,
    key,
    userId,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    userId: string;
    key: string;
    occurredOn?: Date;
  }) {
    super({ eventName: TaskDeletedAttachmentDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.key = key;
    this.userId = userId;
  }

  toPrimitives(): TaskDeletedAttachmentDomainEventAttributes {
    const { key, userId } = this;
    return { key, userId };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TaskDeletedAttachmentDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskDeletedAttachmentDomainEvent({
      aggregateId,
      key: attributes.key,
      userId: attributes.userId,
      eventId,
      occurredOn
    });
  }
}
