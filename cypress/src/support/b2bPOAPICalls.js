const ACCSApiClient = require('./accsClient');
const { assignCustomerToCompany } = require('./b2bQuoteAPICalls');

// Direct HTTP request to GraphQL endpoint (no auth needed)
const BASE_URL =
  'https://na1-sandbox.api.commerce.adobe.com/LwndYQs37CvkUQk9WEmNkz';

const GRAPHQL_URL = `${BASE_URL}/graphql`;
const ASSIGN_ROLES_URL = `${BASE_URL}/V1/company/assignRoles`;
const COMPANY_ROLE_URL = `${BASE_URL}/V1/company/role`;
const IMS_CLIENT_ID = process.env.IMS_CLIENT_ID;
const IMS_ORG_ID = process.env.IMS_ORG_ID;

async function createCustomer({
  firstname,
  lastname,
  email,
  password,
  isSubscribed,
}) {
  const mutation = `
    mutation {
      createCustomerV2(
        input: {
          firstname: "${firstname}"
          lastname: "${lastname}"
          email: "${email}"
          password: "${password}"
          is_subscribed: ${isSubscribed}
        }
      ) {
        customer {
          id
          firstname
          lastname
          email
          is_subscribed
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation }),
  });

  const responseData = await response.json();
  console.log('GraphQL response:', responseData);

  if (!response.ok || responseData.errors) {
    throw new Error(
      responseData.errors
        ? responseData.errors[0].message
        : `HTTP Error: ${response.status}`
    );
  }

  return responseData.data.createCustomerV2.customer;
}

async function findCustomerRestId(email, client) {
  const queryParams = {
    'searchCriteria[filterGroups][0][filters][0][field]': 'email',
    'searchCriteria[filterGroups][0][filters][0][value]': email,
    'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
  };

  const customerSearchResponse = await client.get(
    '/V1/customers/search',
    queryParams
  );

  console.log('🔎 User search result:', customerSearchResponse);

  if (
    !customerSearchResponse.items ||
    customerSearchResponse.items.length === 0
  ) {
    throw new Error('User not found after creation');
  }

  return customerSearchResponse.items[0].id;
}

async function assignRole(restCustomerId, roleId, accessToken) {
  const assignRolesBody = {
    userId: restCustomerId,
    roles: [{ id: roleId }],
  };

  console.log('📤 Assigning role, payload:', assignRolesBody);

  const assignRolesResponse = await fetch(ASSIGN_ROLES_URL, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-api-key': IMS_CLIENT_ID,
      'x-gw-ims-org-id': IMS_ORG_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assignRolesBody),
  });

  const assignRolesResult = await assignRolesResponse.json();

  if (!assignRolesResponse.ok) {
    throw new Error(
      assignRolesResult.message ||
        `Role assignment error: ${assignRolesResponse.status}`
    );
  }

  return assignRolesResult;
}

async function createUserAssignCompanyAndRole(userData, roleId) {
  const {
    firstname,
    lastname,
    email,
    password,
    isSubscribed = true,
    companyId = 13,
  } = userData;

  console.group('🚀 User creation and role assignment');
  console.table({
    firstname,
    lastname,
    email,
    password,
    isSubscribed,
    companyId,
    roleId,
  });
  console.log('------------------------------');

  try {
    // Step 1: Create customer
    const customer = await createCustomer({
      firstname,
      lastname,
      email,
      password,
      isSubscribed,
    });
    console.log('✅ User created:', customer);
    console.log('------------------------------');

    // Step 2: Get REST customer ID
    const client = new ACCSApiClient();
    const accessToken = await client.tokenManager.getValidToken();
    const restCustomerId = await findCustomerRestId(email, client);
    console.log(`REST customerId: ${restCustomerId}`);
    console.log('------------------------------');

    // Step 3: Assign to company
    const assignmentResult = await assignCustomerToCompany(
      restCustomerId,
      companyId
    );
    console.log('✅ Customer assigned to company:', assignmentResult);
    console.log('------------------------------');

    // Step 4: Assign role
    const assignRolesResult = await assignRole(
      restCustomerId,
      roleId,
      accessToken
    );
    console.log('✅ Role assigned:', assignRolesResult);
    console.log('------------------------------');
    console.groupEnd();

    return {
      success: true,
      customer,
      restCustomerId,
      roleId,
      assignRolesResult,
    };
  } catch (error) {
    console.log('------------------------------');
    console.error('❌ Error:', error.message);
    console.groupEnd();
    return { success: false, error: error.message };
  }
}

async function manageCompanyRole(roleData, roleId = null) {
  const client = new ACCSApiClient();
  const accessToken = await client.tokenManager.getValidToken();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'x-api-key': IMS_CLIENT_ID,
    'x-gw-ims-org-id': IMS_ORG_ID,
    'Content-Type': 'application/json',
  };

  try {
    // DELETE: If roleId is provided, delete the role
    if (roleId) {
      console.log(`🗑️ Deleting role with ID: ${roleId}`);
      const deleteResponse = await fetch(`${COMPANY_ROLE_URL}/${roleId}`, {
        method: 'DELETE',
        headers,
      });

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        throw new Error(
          errorData.message || `Delete error: ${deleteResponse.status}`
        );
      }

      console.log(`✅ Role ${roleId} deleted successfully`);
      return { success: true, message: `Role ${roleId} deleted`, roleId };
    }

    // CREATE: If no roleId, create new role
    console.log('📝 Creating new role:', roleData);
    const createResponse = await fetch(COMPANY_ROLE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ role: roleData }),
    });

    const createResult = await createResponse.json();

    if (!createResponse.ok) {
      throw new Error(
        createResult.message || `Create error: ${createResponse.status}`
      );
    }

    console.log('✅ Role created:', createResult);
    return { success: true, role: createResult };
  } catch (error) {
    console.error('❌ Error managing role:', error.message);
    return { success: false, error: error.message };
  }
}

async function getCompanyRoles(companyId = 13) {
  const client = new ACCSApiClient();
  const accessToken = await client.tokenManager.getValidToken();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'x-api-key': IMS_CLIENT_ID,
    'x-gw-ims-org-id': IMS_ORG_ID,
    'Content-Type': 'application/json',
  };

  try {
    console.log(`📋 Fetching roles for company ID: ${companyId}`);

    const queryParams = {
      'searchCriteria[filterGroups][0][filters][0][field]': 'company_id',
      'searchCriteria[filterGroups][0][filters][0][value]':
        companyId.toString(),
      'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
    };

    const queryString = new URLSearchParams(queryParams).toString();
    const response = await fetch(`${COMPANY_ROLE_URL}?${queryString}`, {
      method: 'GET',
      headers,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `Get roles error: ${response.status}`);
    }

    console.log(`✅ Found ${result.items?.length || 0} roles`);

    // Display roles in table format
    if (result.items && result.items.length > 0) {
      const rolesTableData = result.items.map((role) => ({
        ID: role.id,
        'Role Name': role.role_name,
        'Company ID': role.company_id,
        Permissions: role.permissions?.length || 0,
      }));
      console.table(rolesTableData);
    }

    return { success: true, roles: result };
  } catch (error) {
    console.error('❌ Error fetching company roles:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = {
  createUserAssignCompanyAndRole,
  manageCompanyRole,
  getCompanyRoles,
};
