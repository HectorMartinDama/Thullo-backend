import { EventBus } from '../../../../Shared/domain/EventBus';
import { ListRepository } from '../../../Lists/domain/ListRepository';
import { TaskRepository } from '../../../Tasks/domain/TaskRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { BoardRespository } from '../../domain/BoardRepository';
import { BoardId } from '../../domain/types/BoardId';

export class BoardEliminator {
  constructor(
    private repository: BoardRespository,
    private listRepository: ListRepository,
    private taskRepository: TaskRepository,
    private eventBus: EventBus
  ) {}

  async run(params: { id: BoardId; userId: UserId }): Promise<void> {
    const board = await this.repository.searchById(params.userId, params.id);
    if (board) {
      await this.repository.delete(params.userId, params.id);
      const lists = await this.listRepository.searchAllListsCompleteBoard(params.id);
      console.log('listas encontradas: (deben tambien estar con las listas)', lists);
      if (lists) {
        lists.map(async list => {
          // elimino la list
          await this.listRepository.delete(params.userId, list.id);
          if (list.tasks) {
            // elimino las tasks
            await this.taskRepository.deleteListTasks(params.userId, list.id);
          }
        });
      }
      board.delete(params.userId); // agregamos el evento de dominio
      await this.eventBus.publish(board.pullDomainEvents());
    }
  }
}
