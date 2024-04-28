import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreatedListDomainEventAttributes = {
  readonly title: string;
};

export class ListCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'list.created';
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
    super({ eventName: ListCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.title = title;
  }

  toPrimitives(): CreatedListDomainEventAttributes {
    const { title } = this;
    return { title };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CreatedListDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new ListCreatedDomainEvent({
      aggregateId,
      title: attributes.title,
      eventId,
      occurredOn
    });
  }
}
