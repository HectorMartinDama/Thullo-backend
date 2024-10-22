import { UserId } from '../../../Users/domain/types/UserId';
import { ListRepository } from '../../domain/ListRepository';
import { ListId } from '../../domain/types/ListId';
import { ListNotExist } from './ListNotExist';

export class ListByIdFinder {
  constructor(private listRepository: ListRepository) {}

  async run(listId: string, userId: string) {
    const list = await this.listRepository.search(new ListId(listId), new UserId(userId));
    if (!list) throw new ListNotExist();
    return list;
  }
}
