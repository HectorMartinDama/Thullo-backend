import { EventBus } from '../../../../Shared/domain/EventBus';
import { BoardCannotModify } from '../../../Boards/domain/BoardCannotModify';
import { BoardRespository } from '../../../Boards/domain/BoardRepository';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { UserId } from '../../../Users/domain/types/UserId';
import { ListRepository } from '../../domain/ListRepository';
import { ListId } from '../../domain/types/ListId';

export class ListUpdator {
  constructor(
    private repository: ListRepository,
    private boardRepository: BoardRespository,
    private eventBus: EventBus
  ) {}

  async run(params: { listsId: Array<ListId>; userId: UserId; boardId: BoardId }): Promise<void> {
    const canModify = await this.boardRepository.checkCanModify(params.userId, params.boardId);
    if (!canModify) throw new BoardCannotModify();
    const lists = await this.repository.searchAllListsByBoard(params.boardId);
    await this.repository.updateOrder(params.listsId, params.boardId);
    lists?.map(list => this.eventBus.publish(list.pullDomainEvents()));
  }
}
