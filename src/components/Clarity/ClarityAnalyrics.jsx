import { useEffect } from 'react';

const ClarityAnalytics = () => {
  useEffect(() => {
    if (process.env.REACT_APP_API_URL.includes('bizzy.ai')) {
      ((c, l, a, r, i, t, y) => {
        c[a] =
          c[a] ||
          // eslint-disable-next-line func-names
          function () {
            // eslint-disable-next-line prefer-rest-params
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = `https://www.clarity.ms/tag/${i}`;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', 'gf7igia3bu');
    }
  }, []);
};

export default ClarityAnalytics;
