import { EventBus } from '../../../../Shared/domain/EventBus';
import { UserId } from '../../../Users/domain/types/UserId';
import { BoardRespository } from '../../domain/BoardRepository';
import { BoardId } from '../../domain/types/BoardId';

export class BoardRenamerBoard {
  constructor(private repository: BoardRespository, private eventBus: EventBus) {}

  async run(params: { id: BoardId; userId: UserId; title: string }): Promise<void> {
    const board = await this.repository.searchById(params.userId, params.id);
    if (board) {
      board.renameTitle(params.userId, params.title);
      await this.repository.rename(params.userId, params.id, params.title);
      await this.eventBus.publish(board.pullDomainEvents());
    }
  }
}
