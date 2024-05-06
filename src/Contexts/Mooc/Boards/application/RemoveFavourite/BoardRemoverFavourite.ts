import { EventBus } from '../../../../Shared/domain/EventBus';
import { UserId } from '../../../Users/domain/types/UserId';
import { BoardRespository } from '../../domain/BoardRepository';
import { BoardId } from '../../domain/types/BoardId';
import { BoardNotExist } from '../SearchById/BoardNotExist';

export class BoardRemoverFavourite {
  constructor(private repository: BoardRespository, private eventBus: EventBus) {}

  async run(params: { id: BoardId; userId: UserId }): Promise<void> {
    const board = await this.repository.searchById(params.userId, params.id);
    if (board) {
      board.removeFavourite(params.userId, params.id);
      await this.repository.removeFavourite(params.userId, params.id);
      await this.eventBus.publish(board.pullDomainEvents());
    }
    if (!board) {
      throw new BoardNotExist();
    }
  }
}
