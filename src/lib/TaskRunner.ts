import ITask from '../interfaces/ITask';
import ITaskRunner from '../interfaces/ITaskRunner';

interface ISuccess {
  data: string;
}

interface IError {
  message: string;
}

class TaskRunner implements ITaskRunner {
  private task: ITask;
  private worker: Worker;

  assignTask(task: ITask): void {
    this.task = task;
  }

  runTask(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.worker = new Worker(this.task.file);
      this.worker.addEventListener('message', (e: ISuccess) => {
        return this.onSuccess(e, resolve);
      });
      this.worker.addEventListener('error', (e: IError) => {
        return this.onError(e, reject);
      });
    });
  }

  onSuccess(event: ISuccess, done: any): void {
    console.log(`${this.task.name} responded with: ${event.data}`);
    this.task.status = 'completed';
    this.worker.terminate();
    return done();
  }

  onError(event: IError, done: any): void {
    console.error(`${this.task.name} failed: ${event.message}`);
    this.task.status = 'failed';
    this.worker.terminate();
    return done();
  }
}

export default TaskRunner;
