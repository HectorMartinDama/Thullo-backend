export class BoardCannotModify extends Error {
  constructor() {
    super('The user cannot modify the board');
  }
}
