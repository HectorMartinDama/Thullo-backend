import { TaskId } from '../../domain/types/TaskId';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { BoardRespository } from '../../../Boards/domain/BoardRepository';
import { TaskRepository } from '../../domain/TaskRepository';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { BoardCannotModify } from '../../../Boards/domain/BoardCannotModify';
import { UserId } from '../../../Users/domain/types/UserId';
import { TaskNotExist } from '../SearchById/TaskNotExist';

export class TaskDuplicator {
  constructor(
    private repository: TaskRepository,
    private boardRepository: BoardRespository,
    private eventBus: EventBus
  ) {}

  async run(params: { id: TaskId; boardId: BoardId; userId: UserId }): Promise<void> {
    const canModify = await this.boardRepository.checkCanModify(params.userId, params.boardId);
    if (!canModify) throw new BoardCannotModify();
    const task = await this.repository.search(params.id);
    if (task) {
      await this.repository.duplicateTask(params.id);
      await this.eventBus.publish(task.pullDomainEvents());
    }
    if (!task) throw new TaskNotExist();
  }
}
