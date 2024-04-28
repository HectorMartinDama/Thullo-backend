import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { ListId } from '../../../Lists/domain/types/ListId';
import { UserId } from '../../../Users/domain/types/UserId';
import { CreateTaskCommand } from '../../domain/CreateTaskCommand';
import { TaskId } from '../../domain/types/TaskId';
import { TaskTitle } from '../../domain/types/TaskTitle';
import { TaskCreator } from './TaskCreator';

export class CreateTaskCommandHandler implements CommandHandler<CreateTaskCommand> {
  constructor(private taskCreator: TaskCreator) {}

  subscribedTo(): Command {
    return CreateTaskCommand;
  }

  async handle(command: CreateTaskCommand): Promise<void> {
    const id = new TaskId(command.id);
    const title = new TaskTitle(command.title);
    const listId = new ListId(command.listId);
    const boardId = new BoardId(command.boardId);
    const userId = new UserId(command.userId);
    await this.taskCreator.run({ id, title, listId, boardId, userId });
  }
}
