import React from 'react';
import styles from './ClientList.module.scss';

function ClientList() {
  const { main } = styles;
  return (
    <div className={main}>
      <h2>Client List</h2>
    </div>
  );
}

export default ClientList;
