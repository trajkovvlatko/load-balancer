import React, {useState} from 'react';
import BalancerForm from './components/BalancerForm';
import Balancer from './lib/Balancer';
import ITaskRunnerItem from './interfaces/ITaskRunnerItem';
import {numToArr} from './helpers/main';

import './styles/main.css';
import TaskRunnersList from './components/TaskRunnersList';
import TasksList from './components/TasksList';

function App() {
  const [taskRunners, setTaskRunners] = useState<ITaskRunnerItem[]>([]);
  const [numTasks, setNumTasks] = useState<number>(0);

  const onAddTaskRunners = (t: ITaskRunnerItem[]) => {
    setTaskRunners(t);
  };

  const onAddTasks = (n: number) => {
    setNumTasks(n);
  };

  const onTaskRunnersChange = (availableTaskRunners: number) => {
    const newTaskRunners = taskRunners.map((t, i) => {
      t.state = i >= availableTaskRunners ? 'busy' : 'pending';
      return t;
    });
    setTaskRunners(newTaskRunners);
  };

  const onTasksChange = (n: number) => setNumTasks(n);

  const generateTasks = (n: number) => {
    return numToArr(n).map((_, i) => {
      return {
        name: `task ${i + 1}`,
        status: 'pending',
        file: 'task.js',
      };
    });
  };

  const run = () => {
    const balancer = new Balancer({
      numTaskRunners: taskRunners.length,
      onTaskRunnersChange,
      onTasksChange,
    });
    balancer.addTasks(generateTasks(numTasks));
  };

  return (
    <>
      <h1>Balancer</h1>
      <BalancerForm
        onAddTaskRunners={onAddTaskRunners}
        onAddTasks={onAddTasks}
      />

      <hr />

      <TaskRunnersList taskRunners={taskRunners} />

      <hr />

      <TasksList numTasks={numTasks} />

      <hr />

      <button onClick={run}>RUN</button>
    </>
  );
}

export default App;
