import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { List } from '../../Lists/domain/List';
import { User } from '../../Users/domain/User';
import { UserId } from '../../Users/domain/types/UserId';
import { BoardAddedFavouriteDomainEvent } from './BoardAddedFavouriteDomainEvent';
import { BoardAddedMemberDomainEvent } from './BoardAddedMemberDomainEvent';
import { BoardChangedBackgroundDomainEvent } from './BoardChangedBackgroundDomainEvent';
import { BoardChangedVisibiltyDomainEvent } from './BoardChangedVisibiltyDomainEvent';
import { BoardCreatedDomainEvent } from './BoardCreatedDomainEvent';
import { BaordDeletedDomainEvent } from './BoardDeletedDomainEvent';
import { BoardRemovedFavouriteDomainEvent } from './BoardRemovedFavouriteDomainEvent';
import { BoardBackground } from './types/BoardBackground';
import { BoardId } from './types/BoardId';
import { BoardTitle } from './types/BoardTitle';
import { BoardVisibility } from './types/BoardVisibility';

export class Board extends AggregateRoot {
  readonly id: BoardId;
  readonly title: BoardTitle;
  readonly background: BoardBackground;
  readonly visibility: BoardVisibility;
  readonly user?: User;
  readonly members?: Array<User>;
  readonly lists?: Array<List>;
  readonly description?: string;
  readonly favourites?: Array<string>;

  constructor(
    id: BoardId,
    title: BoardTitle,
    background: BoardBackground,
    visibility: BoardVisibility,
    description?: string,
    user?: User,
    members?: Array<User>,
    favourites?: Array<string>,
    lists?: Array<List>
  ) {
    super();
    this.id = id;
    this.title = title;
    this.background = background;
    this.visibility = visibility;
    this.description = description;
    this.user = user;
    this.members = members;
    this.favourites = favourites;
    this.lists = lists;
  }

  static create(
    id: BoardId,
    title: BoardTitle,
    background: BoardBackground,
    visibility: BoardVisibility,
    description?: string
  ): Board {
    const board = new Board(id, title, background, visibility, description);
    board.record(
      new BoardCreatedDomainEvent({
        aggregateId: board.id.value,
        title: board.title.value,
        description: board.description,
        background: board.background.value,
        visibility: board.visibility.value
      })
    );
    return board;
  }

  delete(userId: UserId) {
    this.record(new BaordDeletedDomainEvent({ aggregateId: this.id.value, userId: userId.value }));
  }

  addMember(memberId: string, email: string) {
    this.record(new BoardAddedMemberDomainEvent({ aggregateId: this.id.value, memberId, memberEmail: email }));
  }

  addFavourite(userId: UserId, id: BoardId) {
    this.record(new BoardAddedFavouriteDomainEvent({ aggregateId: this.id.value, userId: userId.value, id: id.value }));
  }

  removeFavourite(userId: UserId, id: BoardId) {
    this.record(
      new BoardRemovedFavouriteDomainEvent({ aggregateId: this.id.value, userId: userId.value, id: id.value })
    );
  }

  changeVisibility(userId: UserId) {
    this.record(new BoardChangedVisibiltyDomainEvent({ aggregateId: this.id.value, userId: userId.value }));
  }

  changeBackground(userId: UserId) {
    this.record(new BoardChangedBackgroundDomainEvent({ aggregateId: this.id.value, userId: userId.value }));
  }

  static fromPrimitives(plainData: {
    id: string;
    title: string;
    background: string;
    visibility: string;
    user?: User;
    members?: Array<User>;
    lists?: Array<List>;
    favourites?: Array<string>;
    description?: string;
  }): Board {
    return new Board(
      new BoardId(plainData.id),
      new BoardTitle(plainData.title),
      new BoardBackground(plainData.background),
      new BoardVisibility(plainData.visibility),
      plainData.description,
      plainData.user,
      plainData.members || [],
      plainData.favourites || [],
      plainData.lists || []
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      title: this.title.value,
      background: this.background.value,
      visibility: this.visibility.value,
      user: this.user?.toPrimitives(),
      members: this.members?.map(member => member.toPrimitives()),
      lists: this.lists?.map(list => list.toPrimitives()),
      description: this.description,
      favourites: this.favourites
    };
  }
}
