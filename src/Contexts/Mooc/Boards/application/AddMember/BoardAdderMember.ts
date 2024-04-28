import { EventBus } from '../../../../Shared/domain/EventBus';
import { UserNotExist } from '../../../Users/domain/UserNotExist';
import { UserRepository } from '../../../Users/domain/UserRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { BoardRespository } from '../../domain/BoardRepository';
import { BoardId } from '../../domain/types/BoardId';

export class BoardAdderMember {
  constructor(
    private repository: BoardRespository,
    private userRepository: UserRepository,
    private eventBus: EventBus
  ) {}

  async run(params: { id: BoardId; email: string; userId: UserId }): Promise<void> {
    const board = await this.repository.searchById(params.userId, params.id);
    const user = await this.userRepository.search(params.email);
    if (user && board) {
      board.addMember(user.id.value, user.email.value);
      await this.repository.addMember(params.userId, params.id, user.id);
      await this.eventBus.publish(board.pullDomainEvents());
    }
    if (!user) {
      throw new UserNotExist();
    }
  }
}
