import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import styles from './ErrorMessageSnackbar.module.scss';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function ErrorMessageSnackbar(props) {
  const { message, severity, open } = props;
  const { body } = styles;

  return (
    <Snackbar open={open}>
      <Alert
        className={body}
        severity={severity}
        sx={{ width: '100%' }}
        style={{ backgroundColor: severity === 'info' ? '#C1C19F' : '' }}>
        {message}!
      </Alert>
    </Snackbar>
  );
}

export default ErrorMessageSnackbar;
