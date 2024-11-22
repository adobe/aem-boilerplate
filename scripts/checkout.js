/* eslint-disable import/no-unresolved */
import { events } from '@dropins/tools/event-bus.js';
import { debounce } from '@dropins/tools/lib.js';

export function scrollToElement(element) {
  element.scrollIntoView({ behavior: 'smooth' });
  element.focus();
}

export function getCartAddress(checkoutData, type) {
  if (!checkoutData) return null;

  const address = type === 'shipping'
    ? checkoutData.shippingAddresses?.[0]
    : checkoutData.billingAddress;

  if (!address) return null;

  return {
    id: address?.id,
    city: address.city,
    company: address?.company,
    countryCode: address.country?.value,
    customAttributes: address.customAttributes,
    firstName: address.firstName,
    lastName: address.lastName,
    postcode: address.postCode,
    region: {
      regionCode: address.region?.code,
      regionId: address.region?.id,
    },
    street: address.street,
    telephone: address.telephone,
    vatId: address.vatId,
  };
}

export function getCartDeliveryMethod(data) {
  if (!data) return null;
  const shippingAddresses = data.shippingAddresses || [];
  if (shippingAddresses.length === 0) return null;
  return shippingAddresses[0]?.selectedShippingMethod;
}

const transformAddressFormValues = (data) => {
  const isNewAddress = !data?.id;

  const customAttributes = data.customAttributes?.map(({ code, value }) => ({
    code,
    value: String(value),
  }));

  // TODO: implement new address creation
  return !isNewAddress
    ? { customerAddressId: data.id }
    : {
      address: {
        city: data.city,
        company: data?.company,
        countryCode: data.countryCode,
        customAttributes,
        // TODO fax
        firstName: data.firstName,
        lastName: data.lastName,
        // TODO middleName
        postcode: data.postcode,
        // TODO prefix
        region: data?.region?.regionCode,
        regionId: data?.region?.regionId,
        street: data.street,
        // TODO suffix
        telephone: data.telephone,
        vatId: data.vatId,
        saveInAddressBook: data.saveAddressBook,
      },
    };
};

export function setAddressOnCart({ api, debounceMs = 0, placeOrderBtn = null }) {
  const debouncedApi = debounce((address) => {
    api(address)
      .catch(console.error)
      .finally(() => {
        placeOrderBtn?.setProps((prev) => ({ ...prev, disabled: false }));
      });
  }, debounceMs);

  return ({ data, isDataValid }) => {
    if (!isDataValid) return;
    placeOrderBtn?.setProps((prev) => ({ ...prev, disabled: true }));
    const address = transformAddressFormValues(data);
    debouncedApi(address);
  };
}

export function estimateShippingCost({ api, debounceMs = 0 }) {
  let prevEstimateShippingData = {};

  const debouncedApi = debounce((data) => {
    const criteria = {
      country_code: data.countryCode,
      region_name: String(data.region.regionCode || ''),
      region_id: String(data.region.regionId || ''),
    };

    api({ criteria });

    events.emit('checkout/estimate-shipping-address', {
      address: {
        country_id: data.countryCode,
        region: String(data.region.regionCode || ''),
        region_id: String(data.region.regionId || ''),
        postcode: data.postcode,
      },
    });

    prevEstimateShippingData = {
      countryCode: data.countryCode,
      regionCode: data.region.regionCode,
      regionId: data.region.regionId,
      postcode: data.postcode,
    };
  }, debounceMs);

  return ({ data, isDataValid }) => {
    if (isDataValid) return;

    if (
      prevEstimateShippingData.countryCode === data.countryCode
      && prevEstimateShippingData.regionCode === data.region.regionCode
      && prevEstimateShippingData.regionId === data.region.regionId
      && prevEstimateShippingData.postcode === data.postcode
    ) return;

    debouncedApi(data);
  };
}
