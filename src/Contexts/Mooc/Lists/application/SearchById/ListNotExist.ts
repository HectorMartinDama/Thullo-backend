export class ListNotExist extends Error {
  constructor() {
    super('The list do not exists');
  }
}
