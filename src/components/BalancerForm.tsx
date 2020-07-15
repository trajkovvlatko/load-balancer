import React, {useRef} from 'react';
import ITaskRunnerItem from '../interfaces/ITaskRunnerItem';
import {numToArr} from '../helpers/main';

interface IProps {
  onAddTaskRunners: (t: ITaskRunnerItem[]) => void;
  onAddTasks: (n: number) => void;
}

function BalancerForm(props: IProps) {
  const numTaskRunnersRef = useRef(null);
  const numTasksRef = useRef(null);

  const onAddTaskRunners = () => {
    if (numTaskRunnersRef && numTaskRunnersRef.current) {
      const numTaskRunners = parseInt(numTaskRunnersRef.current.value);
      const taskRunners: ITaskRunnerItem[] = numToArr(numTaskRunners).map(
        (_, i) => {
          return {i, state: 'pending'};
        }
      );
      props.onAddTaskRunners(taskRunners);
    }
  };

  const onAddTasks = () => {
    if (numTasksRef && numTasksRef.current) {
      const numTasks = parseInt(numTasksRef.current.value);
      props.onAddTasks(numTasks);
    }
  };

  return (
    <>
      <h3>Balancer</h3>
      <div>
        <input
          ref={numTaskRunnersRef}
          type='number'
          placeholder='Number of task runners'
        />
        <button onClick={onAddTaskRunners}>Add task runners</button>
      </div>

      <div>
        <input ref={numTasksRef} type='number' placeholder='Number of tasks' />
        <button onClick={onAddTasks}>Add tasks</button>
      </div>
    </>
  );
}

export default BalancerForm;
