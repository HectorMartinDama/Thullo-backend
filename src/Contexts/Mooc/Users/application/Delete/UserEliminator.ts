import { EventBus } from '../../../../Shared/domain/EventBus';
import { BoardRespository } from '../../../Boards/domain/BoardRepository';
import { ListRepository } from '../../../Lists/domain/ListRepository';
import { TaskRepository } from '../../../Tasks/domain/TaskRepository';
import { UserNotExist } from '../../domain/UserNotExist';
import { UserRepository } from '../../domain/UserRepository';
import { UserId } from '../../domain/types/UserId';

export class UserEliminator {
  constructor(
    private repository: UserRepository,
    private boardRepository: BoardRespository,
    private listRepository: ListRepository,
    private taskRepository: TaskRepository,
    private eventBus: EventBus
  ) {}

  async run(params: { email: string; id: UserId }): Promise<void> {
    const user = await this.repository.search(params.email);
    if (user) {
      await this.repository.delete(params.email, params.id);
      const boards = await this.boardRepository.searchAll(params.id);
      if (boards) {
        boards.map(async board => {
          await this.boardRepository.delete(params.id, board.id);
          let lists = await this.listRepository.searchAllListsCompleteBoard(board.id);
          if (lists) {
            lists.map(async list => {
              console.log(list.id);
              await this.listRepository.delete(params.id, list.id);
              if (list.tasks) {
                await this.taskRepository.deleteListTasks(params.id, list.id);
              }
            });
          }
        });
      }
      user.delete(params.id, params.email);
      await this.eventBus.publish(user.pullDomainEvents());
    }
    if (!user) {
      throw new UserNotExist();
    }
  }
}
