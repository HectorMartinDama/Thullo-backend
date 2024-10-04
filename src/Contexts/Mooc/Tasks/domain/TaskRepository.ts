import { Nullable } from '../../../Shared/domain/Nullable';
import { ListId } from '../../Lists/domain/types/ListId';
import { UserId } from '../../Users/domain/types/UserId';
import { Task } from './Task';
import { Attachament } from './types/TaskAttachment';
import { TaskId } from './types/TaskId';

export interface TaskRepository {
  save(userId: UserId, listId: ListId, task: Task): Promise<void>;
  search(id: TaskId, userId: UserId): Promise<Nullable<Task>>;
  rename(userId: UserId, id: TaskId, title: string): Promise<void>;
  addDescription(userId: UserId, id: TaskId, description: string): Promise<void>;
  addCover(userId: UserId, id: TaskId, cover: string): Promise<void>;
  addLabel(id: TaskId, userId: UserId, title: string): Promise<void>;
  addAttachment(id: TaskId, userId: UserId, name: string, url: string, key: string): Promise<void>;
  updatePosition(tasksId: Array<TaskId>, userId: UserId, listId: ListId, id: TaskId): Promise<void>;
  deleteListTasks(userId: UserId, listId: ListId): Promise<void>;
  getAttachments(userId: UserId, listsId: ListId): Promise<Nullable<Attachament[]>>;
}
