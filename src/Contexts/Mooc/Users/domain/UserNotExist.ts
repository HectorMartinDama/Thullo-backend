export class UserNotExist extends Error {
  constructor() {
    super('The user do not exists');
  }
}
