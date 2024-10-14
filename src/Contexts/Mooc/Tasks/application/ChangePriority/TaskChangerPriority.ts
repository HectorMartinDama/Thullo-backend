import { TaskId } from '../../domain/types/TaskId';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { TaskRepository } from '../../domain/TaskRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { TaskNotExist } from '../SearchById/TaskNotExist';
import { BoardRespository } from '../../../Boards/domain/BoardRepository';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { BoardCannotModify } from '../../../Boards/domain/BoardCannotModify';

export class TaskChangerPriority {
  constructor(
    private boardRepository: BoardRespository,
    private repository: TaskRepository,
    private eventBus: EventBus
  ) {}

  async run(params: { id: TaskId; boardId: BoardId; userId: UserId; priority: number }): Promise<void> {
    const canModify = await this.boardRepository.checkCanModify(params.userId, params.boardId);
    if (!canModify) throw new BoardCannotModify();
    const task = await this.repository.search(params.id);
    if (task) {
      task.changePriority(params.userId, params.priority);
      await this.repository.changePriority(params.id, params.priority);
      await this.eventBus.publish(task.pullDomainEvents());
    }
    if (!task) throw new TaskNotExist();
  }
}
