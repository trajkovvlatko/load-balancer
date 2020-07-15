import ITaskRunner from '../interfaces/ITaskRunner';
import ITask from '../interfaces/ITask';
import TaskRunner from './TaskRunner';

interface IProps {
  numTaskRunners: number;
  onTaskRunnersChange?: (n: number) => void;
  onTasksChange?: (n: number) => void;
}

class Balancer {
  private taskRunners: ITaskRunner[] = [];
  private tasks: ITask[] = [];
  private onTaskRunnersChange?: (n: number) => void;
  private onTasksChange?: (n: number) => void;

  constructor(props: IProps) {
    const {numTaskRunners, onTaskRunnersChange, onTasksChange} = props;
    this.onTaskRunnersChange = onTaskRunnersChange;
    this.onTasksChange = onTasksChange;

    for (let i = 0; i < numTaskRunners; i++) {
      this.addTaskRunner(new TaskRunner());
    }
  }

  addTaskRunner(taskRunner: ITaskRunner): void {
    this.taskRunners.push(taskRunner);
  }

  addTasks(tasks: ITask[]): void {
    this.tasks = [...this.tasks, ...tasks];

    while (this.hasFreeTaskRunners() && this.hasTasks()) {
      this.process();
    }
  }

  private async process() {
    console.log(`Number of tasks left to process: ${this.tasks.length}`);
    if (!this.hasTasks() || !this.hasFreeTaskRunners()) return;

    const task = this.tasks.shift();
    if (this.onTasksChange) {
      this.onTasksChange(this.tasks.length);
    }

    const taskRunner = this.taskRunners.shift();
    if (this.onTaskRunnersChange) {
      this.onTaskRunnersChange(this.taskRunners.length);
    }

    taskRunner.assignTask(task);
    await taskRunner.runTask();

    console.log(`Task ${task.name} completed with status: ${task.status}`);

    this.releaseTaskRunner(taskRunner);

    console.log('Available task runners: ', this.taskRunners.length);
  }

  private releaseTaskRunner(taskRunner: ITaskRunner): void {
    this.taskRunners.push(taskRunner);
    if (this.onTaskRunnersChange) {
      this.onTaskRunnersChange(this.taskRunners.length);
    }
    this.process();
  }

  private hasFreeTaskRunners(): boolean {
    return this.taskRunners.length > 0;
  }

  private hasTasks(): boolean {
    return this.tasks.length > 0;
  }
}

export default Balancer;
