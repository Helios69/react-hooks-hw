import React from 'react'

import TaskListProvider from 'context/taskList.context';

import List from 'components/List';
import Form from 'components/Form';

import { StyledWrapper } from './styles';

function HomePage() {
  return (
    <TaskListProvider>
      <StyledWrapper>
        <Form />
        <List />
      </StyledWrapper>
    </TaskListProvider>
  );
}

export default HomePage
