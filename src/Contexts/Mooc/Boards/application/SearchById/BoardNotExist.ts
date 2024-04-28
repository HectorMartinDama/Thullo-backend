export class BoardNotExist extends Error {
  constructor() {
    super('The board do not exists');
  }
}
