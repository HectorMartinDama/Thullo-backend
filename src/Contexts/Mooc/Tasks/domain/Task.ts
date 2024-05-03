import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { TaskTitle } from './types/TaskTitle';
import { TaskId } from './types/TaskId';
import { TaskCreatedDomainEvent } from './TaskCreatedDomainEvent';
import { TaskAddedCoverDomainEvent } from './TaskAddedCoverDomainEvent';
import { TaskCover } from './types/TaskCover';
import { ListId } from '../../Lists/domain/types/ListId';
import { TaskUpdatedPositionDomainEvent } from './TaskUpdatedPositionDomainEvent';
import { UserId } from '../../Users/domain/types/UserId';
import { TaskAddedLabelDomainEvent } from './TaskAddedLabelDomainEvent';
import { TaskAddedAttachmentDomainEvent } from './TaskAddedAttachmentDomainEvent';
import { Attachament } from './types/TaskAttachment';

export class Task extends AggregateRoot {
  readonly id: TaskId;
  readonly title: TaskTitle;
  readonly cover?: TaskCover;
  readonly labels?: Array<Object>;
  readonly attachments?: Array<Attachament>;

  constructor(
    id: TaskId,
    title: TaskTitle,
    cover?: TaskCover,
    labels?: Array<Object>,
    attachments?: Array<Attachament>
  ) {
    super();
    this.id = id;
    this.title = title;
    this.cover = cover;
    this.labels = labels;
    this.attachments = attachments;
  }

  static create(id: TaskId, title: TaskTitle): Task {
    const task = new Task(id, title);
    task.record(new TaskCreatedDomainEvent({ aggregateId: task.id.value, title: task.title.value }));
    return task;
  }

  addCover(cover: string) {
    this.record(new TaskAddedCoverDomainEvent({ aggregateId: this.id.value, cover: cover }));
  }

  addLabel(title: string, color: string) {
    this.record(new TaskAddedLabelDomainEvent({ aggregateId: this.id.value, title: title, color: color }));
  }

  addAttachment(name: string, url: string, key: string) {
    this.record(new TaskAddedAttachmentDomainEvent({ aggregateId: this.id.value, name: name, url: url, key: key }));
  }

  updatePosition(listId: ListId, userId: UserId) {
    this.record(
      new TaskUpdatedPositionDomainEvent({
        aggregateId: this.id.value,
        listId: listId.value,
        userId: userId.value
      })
    );
  }

  static fromPrimitives(plainData: {
    id: string;
    title: string;
    cover?: string;
    labels?: Array<Object>;
    attachment?: Array<Attachament>;
  }): Task {
    if (plainData.cover && plainData.labels && plainData.attachment) {
      return new Task(
        new TaskId(plainData.id),
        new TaskTitle(plainData.title),
        new TaskCover(plainData.cover),
        plainData.labels || undefined,
        plainData.attachment || undefined
      );
    } else if (plainData.labels && plainData.cover) {
      return new Task(
        new TaskId(plainData.id),
        new TaskTitle(plainData.title),
        new TaskCover(plainData.cover),
        plainData.labels
      );
    } else if (plainData.cover) {
      return new Task(
        new TaskId(plainData.id),
        new TaskTitle(plainData.title),
        new TaskCover(plainData.cover) || undefined,
        plainData.labels || undefined,
        plainData.attachment || undefined
      );
    }
    return new Task(new TaskId(plainData.id), new TaskTitle(plainData.title));
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      title: this.title.value,
      cover: this.cover?.value,
      labels: this.labels,
      attachments: this.attachments
    };
  }
}
