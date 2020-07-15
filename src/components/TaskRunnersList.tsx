import React from 'react';
import ITaskRunnerItem from '../interfaces/ITaskRunnerItem';
import TaskRunnerItem from './TaskRunnerItem';

function TaskRunnersList(props: {taskRunners: ITaskRunnerItem[]}) {
  return (
    <>
      <h4>Available task runners</h4>
      {props.taskRunners.map((t, i) => (
        <TaskRunnerItem t={t} key={`task-runner-${i + 1}`} />
      ))}
    </>
  );
}

export default TaskRunnersList;
