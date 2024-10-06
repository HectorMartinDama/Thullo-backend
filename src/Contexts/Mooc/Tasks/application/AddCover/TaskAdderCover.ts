import { EventBus } from '../../../../Shared/domain/EventBus';
import { TaskRepository } from '../../domain/TaskRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { TaskId } from '../../domain/types/TaskId';

export class TaskAdderCover {
  constructor(private repository: TaskRepository, private eventBus: EventBus) {}

  async run(params: { id: TaskId; cover: string; userId: UserId }): Promise<void> {
    const task = await this.repository.search(params.id);

    if (task) {
      task.addCover(params.cover);
      await this.repository.addCover(params.userId, params.id, params.cover);
      await this.eventBus.publish(task.pullDomainEvents());
    }
  }
}
