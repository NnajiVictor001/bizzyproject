import { apiCall } from 'helpers/api-config';

export const useStripeHook = () => {
  const accessToken = localStorage.getItem('token');

  const checkStripeConnection = async () =>
    await apiCall('get', '/payments/stripe-oauth/connect_account/', accessToken);

  return { checkStripeConnection };
};
