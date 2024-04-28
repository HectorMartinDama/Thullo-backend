// import { List } from '../../../Lists/domain/List';
// import { BoardDocument } from '../../infrastructure/persistence/MongoBoardRepository';

// interface BoardAllResponse {
//   id: string;
//   title: string;
//   background: string;
//   visibility: string;
//   lists: Array<List>;
// }

// export class BoardResponse {
//   public readonly id: string;
//   public readonly title: string;
//   public readonly background: string;
//   public readonly visibility: string;
//   public readonly lists: Array<List>;

//   constructor(board: BoardDocument) {
//     this.id = board._id;
//     this.title = board.title;
//     this.background = board.background;
//     this.visibility = board.visibility;
//     this.lists = board.lists?.map(list => list.toPrimitives());
//   }
// }
