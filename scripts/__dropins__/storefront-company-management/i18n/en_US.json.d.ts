declare const _default: {
  "Company": {
    "shared": {
      "fields": {
        "companyName": "Company Name",
        "companyEmail": "Company Email",
        "email": "Email",
        "legalName": "Legal Name",
        "vatTaxId": "VAT/Tax ID",
        "resellerId": "Reseller ID",
        "legalAddress": "Legal Address",
        "streetAddress": "Street Address",
        "city": "City",
        "country": "Country",
        "stateProvince": "State/Province",
        "zipPostalCode": "ZIP/Postal Code",
        "phoneNumber": "Phone Number",
        "status": "Status",
        "region": "Region",
        "postalCode": "Postal Code",
        "jobTitle": "Job Title",
        "workPhoneNumber": "Work Phone Number",
        "userRole": "User Role",
        "title": "New Company",
        "companyInformation": "Company Information",
        "street": "Street Address",
        "streetLine2": "Street Address Line 2",
        "postcode": "ZIP/Postal Code",
        "telephone": "Phone Number",
        "companyAdmin": "Company Administrator",
        "adminJobTitle": "Job Title",
        "adminWorkTelephone": "Work Phone Number",
        "adminEmail": "Email",
        "adminFirstname": "First Name",
        "adminLastname": "Last Name",
        "adminGender": "Gender",
        "address": "Address",
        "submit": "Register Company",
        "submitting": "Registering...",
        "required": "Required",
        "createCompanyError": "Failed to create company. Please try again.",
        "unexpectedError": "An unexpected error occurred. Please try again."
      },
      "buttons": {
        "edit": "Edit",
        "cancel": "Cancel",
        "save": "Save Changes",
        "saving": "Saving...",
        "close": "Close",
        "confirm": "Confirm"
      },
      "validation": {
        "required": "This field is required",
        "invalidEmail": "Please enter a valid email address",
        "companyNameRequired": "Company name is required",
        "emailRequired": "Email is required",
        "emailNotAvailable": "This email is already used by another company",
        "phoneInvalid": "Please enter a valid phone number",
        "postalCodeInvalid": "Please enter a valid postal code",
        "companyNameLengthError": "Company name must not exceed 40 characters",
        "legalNameLengthError": "Legal name must not exceed 80 characters",
        "vatTaxIdLengthError": "VAT/Tax ID must not exceed 40 characters",
        "resellerIdLengthError": "Reseller ID must not exceed 40 characters",
        "roleNameRequired": "This is a required field.",
        "roleNameExists": "User role with this name already exists. Enter a different name to save this role."
      },
      "messages": {
        "loading": "Loading...",
        "noData": "No data available",
        "error": "An error occurred",
        "success": "Operation completed successfully"
      },
      "loading": "Loading...",
      "ariaLabels": {
        "editButton": "Edit company profile",
        "cancelButton": "Cancel editing",
        "saveButton": "Save company profile changes",
        "closeButton": "Close dialog"
      }
    },
    "CompanyProfile": {
      "containerTitle": "Company Profile",
      "editCompanyProfile": {
        "containerTitle": "Edit Company Profile",
        "companySuccess": "Company profile updated successfully",
        "companyError": "Failed to update company profile",
        "buttonSecondary": "Cancel",
        "buttonPrimary": "Save Changes"
      },
      "companyProfileCard": {
        "noDataMessage": "Company profile not available. Please contact your administrator.",
        "contacts": "Contacts",
        "companyAdministrator": "Company Administrator",
        "salesRepresentative": "Sales Representative",
        "paymentInformation": "Payment Information",
        "availablePaymentMethods": "Available Payment Methods",
        "shippingInformation": "Shipping Information",
        "availableShippingMethods": "Available Shipping Methods",
        "noPaymentMethods": "This company has no payment methods. Please contact store administrator.",
        "noShippingMethods": "This company has no shipping methods. Please contact store administrator.",
        "companyDetails": "Company Details",
        "addressInformation": "Address Information"
      },
      "messages": {
        "loadError": "Failed to load company profile",
        "updateError": "Failed to update company profile",
        "loadingProfile": "Loading company profile...",
        "savingProfile": "Saving company profile..."
      }
    },
    "CompanyRegistration": {
      "success": {
        "pendingApproval": "Thank you! We're reviewing your request and will contact you soon.",
        "companyDetails": "Company Information"
      }
    },
    "CompanyStructure": {
      "individualUserMessage": "You don't have a company account yet.",
      "createAccountCta": "Create a Company Account"
    },
    "EditRoleAndPermission": {
      "createTitle": "Add New Role",
      "editTitle": "Edit Role",
      "roleInformation": "Role Information",
      "roleName": "Role Name",
      "rolePermissions": "Role Permissions",
      "permissionsDescription": "Granting permissions does not affect which features are available for your company account. The merchant must enable features to make them available for your account.",
      "expandAll": "Expand All",
      "collapseAll": "Collapse All",
      "saveRole": "Save Role"
    },
    "FormText": {
      "requiredFieldError": "This is a required field.",
      "numericError": "Only numeric values are allowed.",
      "alphaNumWithSpacesError": "Only alphanumeric characters and spaces are allowed.",
      "alphaNumericError": "Only alphanumeric characters are allowed.",
      "alphaError": "Only alphabetic characters are allowed.",
      "emailError": "Please enter a valid email address.",
      "phoneError": "Please enter a valid phone number.",
      "postalCodeError": "Please enter a valid postal code.",
      "lengthTextError": "Text length must be between {min} and {max} characters.",
      "urlError": "Please enter a valid URL",
      "nameError": "Please enter a valid name",
      "selectCountry": "Please select a country",
      "selectRegion": "Please select a region, state or province",
      "selectCountryFirst": "Please select a country first",
      "companyNameLengthError": "Company name must be between {min} and {max} characters."
    },
    "RolesAndPermissions": {
      "containerTitle": "Company Roles & Permissions",
      "noAccess": {
        "title": "Access Restricted",
        "message": "You do not have permission to view roles and permissions. Please contact your company administrator."
      },
      "error": {
        "title": "Error Loading Roles",
        "message": "An error occurred while loading roles and permissions. Please try again."
      },
      "deleteModal": {
        "title": "Delete This Role?",
        "message": "This action cannot be undone. Are you sure you want to delete this role?",
        "confirm": "Delete",
        "cancel": "Cancel"
      },
      "cannotDeleteModal": {
        "title": "Cannot Delete Role",
        "message": "This role cannot be deleted because users are assigned to it. Reassign the users to another role to continue.",
        "ok": "OK"
      },
      "alerts": {
        "createSuccess": "Role \"{roleName}\" created successfully!",
        "createError": "Failed to create role. Please try again.",
        "createErrorPermissions": "Failed to create role. Please check your permissions and try again.",
        "updateSuccess": "Role \"{roleName}\" updated successfully!",
        "updateError": "Failed to update role. Please try again.",
        "updateErrorPermissions": "Failed to update role. Please check your permissions and try again.",
        "deleteError": "Failed to delete role. Please try again."
      }
    },
    "RoleAndPermissionTable": {
      "addNewRole": "Add New Role",
      "columnId": "ID",
      "columnRole": "Role",
      "columnUsers": "Users",
      "columnActions": "Actions",
      "editButton": "Edit",
      "duplicateButton": "Duplicate",
      "deleteButton": "Delete",
      "viewOnlyLabel": "View Only",
      "systemRoleLabel": "System Role",
      "itemCount": "Item(s)",
      "show": "Show",
      "perPage": "per page",
      "deleteRole": {
        "success": "You have deleted role \"{roleName}\"."
      }
    },
    "Table": {
      "sortedAscending": "Sorted ascending by {label}",
      "sortedDescending": "Sorted descending by {label}",
      "sortBy": "Sort by {label}"
    }
  }
}
;

export default _default;
