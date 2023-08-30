import log from 'loglevel';
import remote from 'loglevel-plugin-remote';

const customJSON = (l) => ({
  message: l.message,
  log_level: l.level.label
});

const apiPath = `${process.env.REACT_APP_LOG_URL}logger`;
remote.apply(log, {
  format: customJSON,
  url: apiPath
});

export default log;
