declare const _default: {
  "Company": {
    "shared": {
      "fields": {
        "companyName": "Company Name",
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
        "postalCode": "Postal Code"
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
        "resellerIdLengthError": "Reseller ID must not exceed 40 characters"
      },
      "messages": {
        "loading": "Loading...",
        "noData": "No data available",
        "error": "An error occurred",
        "success": "Operation completed successfully"
      },
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
        "savingProfile": "Saving company profile...",
        "noDataToUpdate": "No data to update"
      }
    },
    "CompanyStructure": {
      "containerTitle": "Company Structure",
      "shared": {
        "buttons": {
          "addUser": "Add User",
          "addTeam": "Add Team",
          "editSelected": "Edit",
          "remove": "Remove",
          "ok": "OK",
          "cancel": "Cancel",
          "close": "Close",
          "deleting": "Deleting…",
          "removing": "Removing…",
          "expandAll": "Expand All",
          "collapseAll": "Collapse All"
        },
        "titles": {
          "addUser": "Add User",
          "editUser": "Edit User",
          "addTeam": "Add Team",
          "editTeam": "Edit Team"
        },
        "fields": {
          "jobTitle": "Job Title",
          "userRole": "User Role",
          "firstName": "First Name",
          "lastName": "Last Name",
          "email": "Email",
          "workPhoneNumber": "Work Phone Number",
          "status": "Status",
          "teamTitle": "Team Title",
          "description": "Description"
        },
        "options": {
          "selectRole": "Select role…",
          "active": "Active",
          "inactive": "Inactive",
          "companyAdministrator": "Company Administrator",
          "delete": "Delete",
          "expand": "Expand",
          "collapse": "Collapse"
        },
        "ariaLabels": {
          "addUser": "Add user",
          "addTeam": "Add team",
          "editSelected": "Edit selected",
          "removeSelected": "Remove selected",
          "showDescription": "Show description",
          "companyStructureActions": "Company structure actions",
          "expandAllNodes": "Expand all nodes",
          "collapseAllNodes": "Collapse all nodes"
        },
        "messages": {
          "processing": "Processing…",
          "teamDescription": "Team description"
        },
        "validation": {
          "firstNameRequired": "First name is required",
          "lastNameRequired": "Last name is required",
          "emailRequired": "Email is required",
          "emailInvalid": "Enter a valid email",
          "jobTitleRequired": "Job title is required",
          "workPhoneRequired": "Work phone number is required",
          "selectRole": "Select a role",
          "teamTitleRequired": "Team title is required"
        }
      },
      "messages": {
        "structureSuccess": "Company structure updated successfully",
        "structureError": "Failed to update company structure",
        "loadError": "Failed to load company structure",
        "updateError": "Failed to update company structure",
        "noStructureData": "No structure data.",
        "cannotDeleteUser": "Cannot Delete User",
        "cannotDeleteTeam": "Cannot Delete This Team",
        "removeUserConfirm": "Remove this user from Company structure?",
        "deleteTeamConfirm": "Delete this team?",
        "removeItemsConfirm": "Remove {count} item(s)?",
        "removeUserMessage": "Removing a user changes the account status to Inactive. The user's content is still available to the Company administrator, but the user cannot log in.",
        "cannotDeleteUserMessage": "This user has active users or teams assigned to it and cannot be deleted. Please unassign the users or teams first.",
        "cannotDeleteTeamMessage": "This team has active users or teams assigned to it and cannot be deleted. Please unassign the users or teams first.",
        "removeItemsMessage": "This action will remove the selected items from the company structure.",
        "deleteTeamMessage": "This action cannot be undone. Are you sure you want to delete this team?",
        "failedToMoveItem": "Failed to move item",
        "createUserError": "Failed to create user. You may not have permission to perform this action.",
        "createTeamError": "Failed to create team. You may not have permission to perform this action.",
        "saveUserError": "An error occurred while saving the user.",
        "saveTeamError": "An error occurred while saving the team.",
        "loadRolesError": "Failed to load roles",
        "fetchPermissionsError": "Failed to fetch permissions"
      }
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
      "companyNameLengthError": "Company name must be between {min} and {max} characters."
    }
  }
};

export default _default;
