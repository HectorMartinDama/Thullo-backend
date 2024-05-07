import { BoardId } from '../../../Boards/domain/types/BoardId';
import { ListRepository } from '../../../Lists/domain/ListRepository';
import { UserId } from '../../../Users/domain/types/UserId';
import { TaskRepository } from '../../domain/TaskRepository';
import { Attachament } from '../../domain/types/TaskAttachment';

export class SearchAllAttachmentsFinder {
  constructor(private listRepository: ListRepository, private taskRepository: TaskRepository) {}

  async run(id: BoardId, userId: UserId): Promise<Attachament[]> {
    const lists = await this.listRepository.searchAllListsByBoard(id);
    let attachments: Array<Attachament> = [];

    if (!lists || lists.length === 0) {
      return attachments; // Devolver un arreglo vacío si no se encontraron listas
    }

    const listsId = lists.map(list => list.id);

    await Promise.all(
      listsId.map(async listId => {
        let existsAttachments = await this.taskRepository.getAttachments(userId, listId);
        if (existsAttachments && existsAttachments.length > 0) {
          attachments.push(...existsAttachments); // Agrega los archivos al arreglo attachments
        }
      })
    );
    return attachments;
  }
}
