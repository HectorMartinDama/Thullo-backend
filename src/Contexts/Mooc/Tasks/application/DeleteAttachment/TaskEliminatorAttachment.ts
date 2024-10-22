import { TaskRepository } from '../../domain/TaskRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { TaskId } from '../../domain/types/TaskId';
import { TaskNotExist } from '../SearchById/TaskNotExist';

export class TaskEliminatorAttachment {
  constructor(private repository: TaskRepository, private eventBus: EventBus) {}

  // solo puede eliminar tu propio comentario
  async run(params: { id: TaskId; key: string; userId: UserId }): Promise<void> {
    const task = await this.repository.search(params.id);
    if (task) {
      task.deleteAttchament(params.userId, params.key);
      await this.repository.deleteAttachment(params.id, params.key, params.userId);
      await this.eventBus.publish(task.pullDomainEvents());
    }
    if (!task) throw new TaskNotExist();
  }
}
