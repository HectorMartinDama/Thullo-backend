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
import { TaskRenamedTitleDomainEvent } from './TaskRenamedTitleDomainEvent';
import { TaskPriority } from './types/TaskPriority';
import { TaskRemovedLabelDomainEvent } from './TaskRemovedLabelDomainEvent';
import { TaskChangedPriorityDomainEvent } from './TaskChangedPriorityDomainEvent';
import { TaskDeletedDomainEvent } from './TaskDeletedDomainEvent';

export class Task extends AggregateRoot {
  readonly id: TaskId;
  readonly title: TaskTitle;
  readonly priority: TaskPriority;
  readonly createdAt: Date;
  readonly description?: TaskDescription;
  readonly cover?: TaskCover;
  readonly labels?: Array<Object>;
  readonly attachments?: Array<Attachament>;

  constructor(
    id: TaskId,
    title: TaskTitle,
    priority: TaskPriority,
    createdAt: Date,
    description?: TaskDescription,
    cover?: TaskCover,
    labels?: Array<Object>,
    attachments?: Array<Attachament>
  ) {
    super();
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.createdAt = createdAt;
    this.description = description;
    this.cover = cover;
    this.labels = labels;
    this.attachments = attachments;
  }

  static create(id: TaskId, title: TaskTitle): Task {
    const task = new Task(id, title, 4, new Date());
    task.record(new TaskCreatedDomainEvent({ aggregateId: task.id.value, title: task.title.value }));
    return task;
  }

  delete(userId: UserId) {
    this.record(new TaskDeletedDomainEvent({ aggregateId: this.id.value, userId: userId.value }));
  }

  addDescription(description: string) {
    this.record(new TaskAddedDescriptionDomainEvent({ aggregateId: this.id.value, description }));
  }

  addCover(cover: string) {
    this.record(new TaskAddedCoverDomainEvent({ aggregateId: this.id.value, cover }));
  }

  addLabel(title: string) {
    this.record(new TaskAddedLabelDomainEvent({ aggregateId: this.id.value, title: title }));
  }

  removeLabel(userId: UserId, labelId: string) {
    this.record(
      new TaskRemovedLabelDomainEvent({ aggregateId: this.id.value, userId: userId.value, labelId: labelId })
    );
  }

  renameTitle(userId: UserId, title: string) {
    this.record(new TaskRenamedTitleDomainEvent({ aggregateId: this.id.value, userId: userId.value, title }));
  }

  changePriority(userId: UserId, priority: number) {
    this.record(new TaskChangedPriorityDomainEvent({ aggregateId: this.id.value, userId: userId.value, priority }));
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
    priority: number;
    createdAt: Date;
    description?: string;
    cover?: string;
    labels?: Array<Object>;
    attachment?: Array<Attachament>;
  }): Task {
    const { id, title, priority, createdAt, description, cover, labels, attachment } = plainData;

    const taskId = new TaskId(id);
    const taskTitle = new TaskTitle(title);
    const taskPriority = new TaskPriority(priority);
    const taskCreatedAt = createdAt;
    const taskDescription = description ? new TaskDescription(description) : undefined;
    const taskCover = cover ? new TaskCover(cover) : undefined;

    return new Task(taskId, taskTitle, taskPriority, taskCreatedAt, taskDescription, taskCover, labels, attachment);
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      title: this.title.value,
      priority: this.priority,
      createdAt: this.createdAt,
      description: this.description?.value,
      cover: this.cover?.value,
      labels: this.labels,
      attachments: this.attachments
    };
  }
}
