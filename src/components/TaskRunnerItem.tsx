import React from 'react';
import ITaskRunnerItem from '../interfaces/ITaskRunnerItem';

function TaskRunnerItem(props: {t: ITaskRunnerItem}) {
  const {t} = props;
  return <div className={`task-runner ${t.state}`}>{t.i + 1}</div>;
}

export default TaskRunnerItem;
