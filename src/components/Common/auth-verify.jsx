import React, { useEffect } from 'react';
import jwt from 'jwt-decode';
// import { useIdleTimer } from 'react-idle-timer';
import { withRouter } from './with-router';

function AuthVerify(props) {
  const {
    router: { location },
    logOut
  } = props;

  useEffect(() => {
    const refreshToken = localStorage.getItem('refresh');

    if (refreshToken) {
      const { exp } = jwt(refreshToken);

      if (exp * 1000 < Date.now()) {
        logOut();
      }
      setTimeout(() => {
        logOut();
      }, exp * 1000 - Date.now());
    }
  }, [location]);

  // const onIdle = () => {
  //   logOut();
  // };

  // const { getRemainingTime } = useIdleTimer({
  //   onIdle,
  //   timeout: 3600 * 1000,
  // })

  return <div> </div>;
}

export default withRouter(AuthVerify);
