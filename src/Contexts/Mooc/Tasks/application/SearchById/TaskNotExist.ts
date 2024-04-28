export class TaskNotExist extends Error {
  constructor() {
    super('The task do not exists');
  }
}
