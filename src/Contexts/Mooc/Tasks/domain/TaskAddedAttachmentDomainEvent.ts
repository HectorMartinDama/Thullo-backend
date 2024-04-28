import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type TaskAddedAttachmentDomainEventAttributes = {
  readonly url: string;
  readonly name: string;
  readonly key: string;
};

export class TaskAddedAttachmentDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.addedAttachment';
  readonly url: string;
  readonly name: string;
  readonly key: string;

  constructor({
    aggregateId,
    name,
    url,
    key,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    name: string;
    url: string;
    key: string;
    occurredOn?: Date;
  }) {
    super({ eventName: TaskAddedAttachmentDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.name = name;
    this.url = url;
    this.key = key;
  }

  toPrimitives(): TaskAddedAttachmentDomainEventAttributes {
    const { name, url, key } = this;
    return { name, url, key };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TaskAddedAttachmentDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskAddedAttachmentDomainEvent({
      aggregateId,
      name: attributes.name,
      url: attributes.url,
      key: attributes.key,
      eventId,
      occurredOn
    });
  }
}
