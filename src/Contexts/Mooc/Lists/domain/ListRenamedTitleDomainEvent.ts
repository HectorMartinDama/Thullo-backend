import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type ListRenamedTitleDomainEventAttributes = {
  readonly userId: string;
  readonly title: string;
};

export class ListRenamedTitleDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'list.changeTitle';
  readonly userId: string;
  readonly title: string;

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
    super({ eventName: ListRenamedTitleDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
    this.title = title;
  }

  toPrimitives(): ListRenamedTitleDomainEventAttributes {
    const { userId, title } = this;
    return { userId, title };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: ListRenamedTitleDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new ListRenamedTitleDomainEvent({
      aggregateId,
      userId: attributes.userId,
      title: attributes.title,
      eventId,
      occurredOn
    });
  }
}
