import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Task } from '../../Tasks/domain/Task';
import { UserId } from '../../Users/domain/types/UserId';
import { ListCreatedDomainEvent } from './ListCreatedDomainEvent';
import { ListDeletedDomainEvent } from './ListDeletedDomainEvent';
import { ListId } from './types/ListId';
import { ListTitle } from './types/ListTitle';

export class List extends AggregateRoot {
  readonly id: ListId;
  readonly title: ListTitle;
  readonly tasks?: Array<Task>;

  constructor(id: ListId, title: ListTitle, tasks?: Array<Task>) {
    super();
    this.id = id;
    this.title = title;
    this.tasks = tasks;
  }

  static create(id: ListId, title: ListTitle): List {
    const list = new List(id, title);
    list.record(new ListCreatedDomainEvent({ aggregateId: list.id.value, title: list.title.value }));
    return list;
  }

  delete(userId: UserId) {
    this.record(new ListDeletedDomainEvent({ aggregateId: this.id.value, userId: userId.value }));
  }

  static fromPrimitives(plainData: { id: string; title: string; tasks?: Array<Task> }): List {
    return new List(new ListId(plainData.id), new ListTitle(plainData.title), plainData.tasks || []);
  }

  toPrimitives(): any {
    return { id: this.id.value, title: this.title.value, tasks: this.tasks?.map(task => task.toPrimitives()) };
  }
}
