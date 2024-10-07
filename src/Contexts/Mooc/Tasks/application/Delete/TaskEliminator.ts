import { TaskId } from '../../domain/types/TaskId';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { TaskRepository } from '../../domain/TaskRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { BoardRespository } from '../../../Boards/domain/BoardRepository';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { BoardCannotModify } from '../../../Boards/domain/BoardCannotModify';
import { TaskNotExist } from '../SearchById/TaskNotExist';

export class TaskEliminator {
  constructor(
    private boardRepository: BoardRespository,
    private taskRepository: TaskRepository,
    private eventBus: EventBus
  ) {}

  async run(params: { boardId: BoardId; id: TaskId; userId: UserId }): Promise<void> {
    const canModify = await this.boardRepository.checkCanModify(params.userId, params.boardId);

    console.log('canModify', canModify);
    if (!canModify) throw new BoardCannotModify();
    const task = await this.taskRepository.search(params.id);
    if (task) {
      task.delete(params.userId); // agrego el evento de dominio
      await this.taskRepository.deleteTask(task.id);
      await this.eventBus.publish(task.pullDomainEvents());
    }
    if (!task) throw new TaskNotExist();
  }
}
