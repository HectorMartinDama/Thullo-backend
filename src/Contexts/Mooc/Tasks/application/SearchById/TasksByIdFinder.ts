import { TaskRepository } from '../../domain/TaskRepository';
import { TaskId } from '../../domain/types/TaskId';
import { TaskNotExist } from './TaskNotExist';

export class TasksByIdFinder {
  constructor(private taskRepository: TaskRepository) {}

  async run(taskId: string, userId: string) {
    const task = await this.taskRepository.search(new TaskId(taskId));
    if (!task) {
      throw new TaskNotExist();
    }
    return task;
  }
}
