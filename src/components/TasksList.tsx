import React from 'react';
import TaskItem from './TaskItem';
import {numToArr} from '../helpers/main';

interface IProps {
  numTasks: number;
}

function TasksList(props: IProps) {
  return (
    <>
      <h4>Pending tasks</h4>
      {numToArr(props.numTasks).map((_, i) => (
        <TaskItem i={i + 1} key={`task-${i + 1}`} />
      ))}
    </>
  );
}

export default TasksList;
