import { UserId } from '../../../Users/domain/types/UserId';
import { TaskRepository } from '../../domain/TaskRepository';
import { TaskId } from '../../domain/types/TaskId';
import { TaskNotExist } from './TaskNotExist';

export class TasksByIdFinder {
  constructor(private taskRepository: TaskRepository) {}

  async run(taskId: string, userId: string) {
    const task = await this.taskRepository.search(new TaskId(taskId), new UserId(userId));
    if (!task) {
      throw new TaskNotExist();
    }
    return task;
  }
}
