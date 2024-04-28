import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type BoardAddedMemberDomainEventAttributes = {
  readonly memberId: string;
  readonly memberEmail: string;
};

export class BoardAddedMemberDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'board.addedMember';
  readonly memberId: string;
  readonly memberEmail: string;

  constructor({
    aggregateId,
    memberId,
    memberEmail,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    memberId: string;
    memberEmail: string;
    occurredOn?: Date;
  }) {
    super({ eventName: BoardAddedMemberDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.memberId = memberId;
    this.memberEmail = memberEmail;
  }

  toPrimitives(): BoardAddedMemberDomainEventAttributes {
    const { memberId, memberEmail } = this;
    return { memberId, memberEmail };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: BoardAddedMemberDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new BoardAddedMemberDomainEvent({
      aggregateId,
      memberId: attributes.memberId,
      memberEmail: attributes.memberEmail,
      eventId,
      occurredOn
    });
  }
}
