import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: process.env.REACT_APP_ADAL_TENANT,
  clientId: process.env.REACT_APP_ADAL_CLIENTID,
  endpoints: {},
  cacheLocation: process.env.REACT_APP_ADAL_CACHE_LOCATION,
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(
  authContext,
  adalConfig.endpoints.api,
);
