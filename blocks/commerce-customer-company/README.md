<!-- ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** -->
# Commerce Customer Company Block

## Overview

The Commerce Customer Company block displays company-related information for B2B customers on the Account Information page. It shows the customer's company name, job title, work phone number, and user role in a clean, card-based layout.

## Integration

### Block Configuration
The block automatically handles authentication and company feature checks. No additional configuration is required.

### Prerequisites
- User must be authenticated
- B2B Company feature must be enabled
- Customer must be associated with a company

### Displayed Information
- **Company Name**: The name of the customer's company
- **Job Title**: The customer's job title within the company (if available)
- **Work Phone Number**: The customer's work phone number (if available)
- **User Role**: The customer's role within the company (e.g., "Company Administrator", "Regular User")

### Behavior
- Block is hidden if user is not authenticated
- Block is hidden if no company information is available
- Only displays fields that have values (job title, work phone, and user role are optional)

## Usage

Place this block on the Account Information page below the existing customer information block for optimal layout and user experience.

## Dependencies

- `@dropins/storefront-company-management` - Provides the API and components
- Authentication system - For user verification
- B2B Company functionality - Must be enabled in store configuration
