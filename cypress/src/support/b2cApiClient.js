// B2C Admin REST access for both PaaS and SaaS test environments.
let accessToken;
let accessTokenExpiresAt;

const getConfig = () => ({
  apiEndpoint: Cypress.env('API_ENDPOINT')?.replace(/\/+$/, ''),
  username: Cypress.env('COMMERCE_ADMIN_USERNAME'),
  password: Cypress.env('COMMERCE_ADMIN_PASSWORD'),
  imsClientId: Cypress.env('IMS_CLIENT_ID'),
  imsClientSecret: Cypress.env('IMS_CLIENT_SECRET'),
  imsOrgId: Cypress.env('IMS_ORG_ID'),
});

const getErrorMessage = (body) => (
  body && typeof body === 'object'
    ? body.message || body.error_description || body.error
    : body
);

const getPaasAuth = (config) => {
  if (!config.apiEndpoint || !config.username || !config.password) {
    throw new Error('Missing Adobe Commerce PaaS Admin credentials in Cypress configuration.');
  }

  const apiUrl = `${config.apiEndpoint}/rest/default`;

  if (accessToken) {
    return cy.wrap({
      apiUrl,
      token: accessToken,
      headers: {},
    }, { log: false });
  }

  return cy.request({
    method: 'POST',
    url: `${apiUrl}/V1/integration/admin/token`,
    body: {
      username: config.username,
      password: config.password,
    },
    failOnStatusCode: false,
    log: false,
  }).then(({ status, body }) => {
    if (status < 200 || status >= 300) {
      const message = getErrorMessage(body);
      throw new Error(
        `Adobe Commerce Admin login failed with ${status}${message ? `: ${message}` : '.'}`,
      );
    }

    if (!body || typeof body !== 'string') {
      throw new Error('Adobe Commerce Admin login returned an invalid token response.');
    }

    accessToken = body;
    return {
      apiUrl,
      token: accessToken,
      headers: {},
    };
  });
};

const getSaasAuth = (config) => {
  if (!config.apiEndpoint || !config.imsClientId || !config.imsClientSecret || !config.imsOrgId) {
    throw new Error('Missing Adobe Commerce SaaS IMS credentials in Cypress configuration.');
  }

  if (accessToken && Date.now() < accessTokenExpiresAt) {
    return cy.wrap({
      apiUrl: config.apiEndpoint,
      token: accessToken,
      headers: {
        'x-api-key': config.imsClientId,
        'x-gw-ims-org-id': config.imsOrgId,
      },
    }, { log: false });
  }

  return cy.request({
    method: 'POST',
    url: 'https://ims-na1.adobelogin.com/ims/token/v3',
    form: true,
    body: {
      client_id: config.imsClientId,
      client_secret: config.imsClientSecret,
      grant_type: 'client_credentials',
      scope: [
        'openid',
        'AdobeID',
        'email',
        'profile',
        'additional_info.roles',
        'additional_info.projectedProductContext',
        'commerce.accs',
      ].join(','),
    },
    failOnStatusCode: false,
    log: false,
  }).then(({ status, body }) => {
    if (status < 200 || status >= 300) {
      const message = getErrorMessage(body);
      throw new Error(
        `Adobe IMS login failed with ${status}${message ? `: ${message}` : '.'}`,
      );
    }

    if (!body.access_token || !body.expires_in) {
      throw new Error('Adobe IMS login returned an invalid token response.');
    }

    accessToken = body.access_token;
    accessTokenExpiresAt = Date.now() + (Math.max(body.expires_in - 60, 0) * 1000);

    return {
      apiUrl: config.apiEndpoint,
      token: accessToken,
      headers: {
        'x-api-key': config.imsClientId,
        'x-gw-ims-org-id': config.imsOrgId,
      },
    };
  });
};

const getAuth = (config) => {
  const hasPaasCredentials = config.username && config.password;
  const hasSaasCredentials = config.imsClientId && config.imsClientSecret && config.imsOrgId;

  if (hasPaasCredentials && hasSaasCredentials) {
    throw new Error('Both PaaS and SaaS Adobe Commerce credentials are configured in one workflow.');
  }

  if (hasPaasCredentials) {
    return getPaasAuth(config);
  }

  if (hasSaasCredentials) {
    return getSaasAuth(config);
  }

  throw new Error('Missing Adobe Commerce API credentials in Cypress configuration.');
};

const request = ({
  method = 'GET',
  endpoint,
  query,
  body,
}) => {
  if (!endpoint.startsWith('/') || endpoint.includes('://')) {
    throw new Error(`Commerce API endpoint must be a relative path starting with "/": ${endpoint}`);
  }

  const config = getConfig();

  return getAuth(config).then(({ apiUrl, token, headers }) => cy.request({
    method,
    url: `${apiUrl}${endpoint}`,
    qs: query,
    body,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
    log: false,
  })).then(({ status, body: responseBody }) => {
    if (status === 401) {
      accessToken = null;
      accessTokenExpiresAt = null;
    }

    if (status < 200 || status >= 300) {
      const message = getErrorMessage(responseBody);
      throw new Error(
        `Commerce API ${method.toUpperCase()} ${endpoint} failed with ${status}`
        + `${message ? `: ${message}` : '.'}`,
      );
    }

    return responseBody;
  });
};

const findCustomerByEmail = (customerEmail) => request({
  endpoint: '/V1/customers/search',
  query: {
    'searchCriteria[filterGroups][0][filters][0][field]': 'email',
    'searchCriteria[filterGroups][0][filters][0][value]': customerEmail,
    'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
    'searchCriteria[pageSize]': 1,
  },
}).then((response) => response.items?.[0] || null);

const requestCustomerOtp = (customerId, reason = 'test') => request({
  method: 'POST',
  endpoint: `/V1/customer/${customerId}/otp`,
  body: {
    customerId,
    reason,
  },
});

const deleteCustomerByEmail = (customerEmail) => findCustomerByEmail(customerEmail)
  .then((customer) => {
    if (!customer) {
      return null;
    }

    return request({
      method: 'DELETE',
      endpoint: `/V1/customers/${customer.id}`,
    });
  });

module.exports = {
  deleteCustomerByEmail,
  findCustomerByEmail,
  requestCustomerOtp,
};
