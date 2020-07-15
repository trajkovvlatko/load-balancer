import React from 'react';

interface IProps {
  i: number;
}

function TaskItem(props: IProps) {
  return <div className='task'>{props.i}</div>;
}

export default TaskItem;
