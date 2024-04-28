import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type TaskAddedCoverDomainEventAttributes = {
  readonly cover: string;
};

export class TaskAddedCoverDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'task.addedCover';
  readonly cover: string;

  constructor({
    aggregateId,
    cover,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    cover: string;
    occurredOn?: Date;
  }) {
    super({ eventName: TaskAddedCoverDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.cover = cover;
  }

  toPrimitives(): TaskAddedCoverDomainEventAttributes {
    const { cover } = this;
    return { cover };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TaskAddedCoverDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TaskAddedCoverDomainEvent({
      aggregateId,
      cover: attributes.cover,
      eventId,
      occurredOn
    });
  }
}
