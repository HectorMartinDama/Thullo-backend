import { EventBus } from '../../../../Shared/domain/EventBus';
import { UserId } from '../../../Users/domain/types/UserId';
import { BoardRespository } from '../../domain/BoardRepository';
import { BoardBackground } from '../../domain/types/BoardBackground';
import { BoardId } from '../../domain/types/BoardId';

export class BoardChangerBackground {
  constructor(private repository: BoardRespository, private eventBus: EventBus) {}

  async run(params: { id: BoardId; userId: UserId; background: BoardBackground }): Promise<void> {
    const board = await this.repository.searchById(params.userId, params.id);
    if (board) {
      board.changeBackground(params.userId);
      await this.repository.changeBackground(params.userId, params.id, params.background);
      await this.eventBus.publish(board.pullDomainEvents());
    }
  }
}
