import { EventBus } from '../../../../Shared/domain/EventBus';
import { BoardRespository } from '../../../Boards/domain/BoardRepository';
import { ListId } from '../../../Lists/domain/types/ListId';
import { UserId } from '../../../Users/domain/types/UserId';
import { Task } from '../../domain/Task';
import { TaskRepository } from '../../domain/TaskRepository';
import { TaskId } from '../../domain/types/TaskId';
import { TaskTitle } from '../../domain/types/TaskTitle';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { BoardCannotModify } from '../../../Boards/domain/BoardCannotModify';

export class TaskCreator {
  constructor(
    private repository: TaskRepository,
    private boardRepository: BoardRespository,
    private eventBus: EventBus
  ) {}

  async run(params: { id: TaskId; title: TaskTitle; listId: ListId; boardId: BoardId; userId: UserId }): Promise<void> {
    const canModify = await this.boardRepository.checkCanModify(params.userId, params.boardId);
    if (!canModify) throw new BoardCannotModify();
    const task = Task.create(params.id, params.title);
    await this.repository.save(params.userId, params.listId, task);
    await this.eventBus.publish(task.pullDomainEvents());
  }
}
