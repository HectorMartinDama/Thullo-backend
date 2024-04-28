import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreatedBoardDomainEventAttributes = {
  readonly title: string;
  readonly background: string;
  readonly visibility: string;
  readonly description?: string;
};

export class BoardCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'board.created';

  readonly title: string;
  readonly background: string;
  readonly visibility: string;
  readonly description?: string;

  constructor({
    aggregateId,
    title,
    background,
    visibility,
    description,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    title: string;
    background: string;
    visibility: string;
    description?: string;
    occurredOn?: Date;
  }) {
    super({ eventName: BoardCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.title = title;
    this.background = background;
    this.visibility = visibility;
    this.description = description;
  }

  toPrimitives(): CreatedBoardDomainEventAttributes {
    const { title, background, visibility, description } = this;
    return {
      title,
      background,
      visibility,
      description
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CreatedBoardDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new BoardCreatedDomainEvent({
      aggregateId,
      title: attributes.title,
      background: attributes.background,
      visibility: attributes.visibility,
      description: attributes.description,
      eventId,
      occurredOn
    });
  }
}
