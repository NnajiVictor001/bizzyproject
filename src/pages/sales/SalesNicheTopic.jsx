import React from 'react';
import SelectedNicheTopicForm from 'components/Forms/SelectedNicheTopicForm';

import styles from './SalesNicheTopic.module.scss';

function SalesNicheTopic() {
  const { container } = styles;

  return (
    <div className={container}>
      <SelectedNicheTopicForm />
    </div>
  );
}

export default SalesNicheTopic;
