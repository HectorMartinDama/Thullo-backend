import { EventBus } from '../../../../Shared/domain/EventBus';
import { BoardRespository } from '../../domain/BoardRepository';
import { BoardBackground } from '../../domain/types/BoardBackground';
import { BoardId } from '../../domain/types/BoardId';
import { BoardTitle } from '../../domain/types/BoardTitle';
import { BoardVisibility } from '../../domain/types/BoardVisibility';
import { Board } from '../../domain/Board';
import { UserId } from '../../../Users/domain/types/UserId';

export class BoardCreator {
  constructor(private repository: BoardRespository, private eventBus: EventBus) {}

  async run(params: {
    id: BoardId;
    title: BoardTitle;
    background: BoardBackground;
    visibility: BoardVisibility;
    description?: string;
    userId: UserId;
  }): Promise<void> {
    console.log(params.description, 'desde boardcreator');
    const board = Board.create(params.id, params.title, params.background, params.visibility, params.description);
    await this.repository.save(params.userId, board);
    await this.eventBus.publish(board.pullDomainEvents());
  }
}
