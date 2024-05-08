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
import { TaskAddedDescriptionDomainEvent } from './TaskAddedDescriptionDomainEvent';
import { TaskDescription } from './types/TaskDescription';

export class Task extends AggregateRoot {
  readonly id: TaskId;
  readonly title: TaskTitle;
  readonly description?: TaskDescription;
  readonly cover?: TaskCover;
  readonly labels?: Array<Object>;
  readonly attachments?: Array<Attachament>;

  constructor(
    id: TaskId,
    title: TaskTitle,
    description?: TaskDescription,
    cover?: TaskCover,
    labels?: Array<Object>,
    attachments?: Array<Attachament>
  ) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.cover = cover;
    this.labels = labels;
    this.attachments = attachments;
  }

  static create(id: TaskId, title: TaskTitle): Task {
    const task = new Task(id, title);
    task.record(new TaskCreatedDomainEvent({ aggregateId: task.id.value, title: task.title.value }));
    return task;
  }

  addDescription(description: string) {
    this.record(new TaskAddedDescriptionDomainEvent({ aggregateId: this.id.value, description }));
  }

  addCover(cover: string) {
    this.record(new TaskAddedCoverDomainEvent({ aggregateId: this.id.value, cover }));
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
    description?: string;
    cover?: string;
    labels?: Array<Object>;
    attachment?: Array<Attachament>;
  }): Task {
    const { id, title, description, cover, labels, attachment } = plainData;

    const taskId = new TaskId(id);
    const taskTitle = new TaskTitle(title);
    const taskDescription = description ? new TaskDescription(description) : undefined;
    const taskCover = cover ? new TaskCover(cover) : undefined;

    return new Task(taskId, taskTitle, taskDescription, taskCover, labels, attachment);
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description?.value,
      cover: this.cover?.value,
      labels: this.labels,
      attachments: this.attachments
    };
  }
}
