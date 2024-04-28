import { EventBus } from '../../../../Shared/domain/EventBus';
import { TaskRepository } from '../../../Tasks/domain/TaskRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { ListRepository } from '../../domain/ListRepository';
import { ListId } from '../../domain/types/ListId';

export class ListEliminator {
  constructor(private repository: ListRepository, private taskRepository: TaskRepository, private eventBus: EventBus) {}

  async run(params: { id: ListId; userId: UserId }): Promise<void> {
    const list = await this.repository.search(params.id, params.userId);

    if (list) {
      list.delete(params.userId); // agrego el evento de dominio
      await this.repository.delete(params.userId, params.id);
      // cambiar se hay tasks
      await this.taskRepository.deleteListTasks(params.userId, params.id); // Borra la lista
      await this.eventBus.publish(list.pullDomainEvents()); // empujo el evento de dominio a rabbitmq
    }
  }
}
