import ITask from './ITask';

export default interface ITaskRunner {
  assignTask: (task: ITask) => void;
  runTask: () => void;
}
