import { EventBus } from '../../../../Shared/domain/EventBus';
import { BoardCannotModify } from '../../../Boards/domain/BoardCannotModify';
import { BoardRespository } from '../../../Boards/domain/BoardRepository';
import { BoardId } from '../../../Boards/domain/types/BoardId';
import { UserId } from '../../../Users/domain/types/UserId';
import { List } from '../../domain/List';
import { ListRepository } from '../../domain/ListRepository';
import { ListId } from '../../domain/types/ListId';
import { ListTitle } from '../../domain/types/ListTitle';

export class ListCreator {
  constructor(
    private repository: ListRepository,
    private boardRepository: BoardRespository,
    private eventBus: EventBus
  ) {}

  async run(params: { id: ListId; title: ListTitle; boardId: BoardId; userId: UserId }): Promise<void> {
    const canModify = await this.boardRepository.checkCanModify(params.userId, params.boardId);
    if (!canModify) throw new BoardCannotModify();
    const list = List.create(params.id, params.title);
    await this.repository.save(params.userId, params.boardId, list);
    await this.eventBus.publish(list.pullDomainEvents());
  }
}
