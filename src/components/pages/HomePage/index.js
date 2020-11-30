import React from 'react'

import TaskListProvider from 'context/taskList.context';
import { getState } from 'utils/localStorage';

import List from 'components/List';
import Form from 'components/Form';

import { StyledWrapper } from './styles';

const defaultStateValue = getState() || [];

function HomePage() {
  return (
    <TaskListProvider defaultState={defaultStateValue}>
      <StyledWrapper>
        <Form />
        <List />
      </StyledWrapper>
    </TaskListProvider>
  );
}

export default HomePage
