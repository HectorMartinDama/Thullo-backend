import { TaskId } from '../../domain/types/TaskId';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { TaskRepository } from '../../domain/TaskRepository';
import { ListId } from '../../../Lists/domain/types/ListId';
import { UserId } from '../../../Users/domain/types/UserId';

export class TaskUpdatorPosition {
  constructor(private repository: TaskRepository, private eventBus: EventBus) {}

  async run(params: { id: TaskId; listId: ListId; tasksId: Array<TaskId>; userId: UserId }): Promise<void> {
    const task = await this.repository.search(params.id, params.userId);
    if (task) {
      task.updatePosition(params.listId, params.userId); // agrego el evento de dominio
      await this.repository.updatePosition(params.tasksId, params.userId, params.listId, params.id);
      await this.eventBus.publish(task.pullDomainEvents());
    }
  }
}
