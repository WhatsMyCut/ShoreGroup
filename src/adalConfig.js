import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: process.env.REACT_APP_ADAL_TENANT,
  clientId: process.env.REACT_APP_ADAL_CLIENTID,
  endpoints: {},
  redirectUri: ((loc, port) => `${loc.protocol}//${loc.hostname}${port}/`)(
    window.location,
    window.location.port !== 443 ? `:${window.location.port}` : '',
  ),
  cacheLocation: process.env.REACT_APP_ADAL_CACHE_LOCATION,
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(
  authContext,
  adalConfig.endpoints.api,
);
