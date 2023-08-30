import { useDispatch } from 'react-redux';
import { alertSliceActions } from 'store/alert';

export const useAlert = () => {
  const dispatch = useDispatch();

  const addAlert = (message, severity = 'error') => {
    dispatch(
      alertSliceActions.setAlert({
        message,
        severity,
        isOpen: true
      })
    );
    setTimeout(() => {
      dispatch(
        alertSliceActions.setAlert({
          message: '',
          severity: 'error',
          isOpen: false
        })
      );
    }, 3000);
  };

  return { addAlert };
};
