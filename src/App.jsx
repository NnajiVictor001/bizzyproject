import AppRoutes from 'Routes';
import { BlockBox } from 'components/Common/Block';
import MessageSnackbar from 'helpers/MessageSnackbar';

import React from 'react';
import { useSelector } from 'react-redux';

function App() {
  const alert = useSelector((state) => state.alert);

  return (
    <BlockBox>
      <AppRoutes />
      <MessageSnackbar message={alert.message} severity={alert.severity} open={alert.isOpen} />
    </BlockBox>
  );
}

export default App;
