import { EventBus } from '../../../../Shared/domain/EventBus';
import { UserId } from '../../../Users/domain/types/UserId';
import { BoardRespository } from '../../domain/BoardRepository';
import { BoardId } from '../../domain/types/BoardId';
import { BoardVisibility } from '../../domain/types/BoardVisibility';

export class BoardChangerVisibility {
  constructor(private repository: BoardRespository, private eventBus: EventBus) {}

  async run(params: { id: BoardId; userId: UserId; visibility: BoardVisibility }): Promise<void> {
    const board = await this.repository.searchById(params.userId, params.id);
    if (board) {
      board.changeVisibility(params.userId);
      await this.repository.changeVisibility(params.userId, params.id, params.visibility);
      await this.eventBus.publish(board.pullDomainEvents());
    }
  }
}
