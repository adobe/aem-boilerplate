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
  if (!data) return;
  const shippingAddresses = data.shippingAddresses || [];
  if (shippingAddresses.length === 0) return;
  // eslint-disable-next-line consistent-return
  return shippingAddresses[0]?.selectedShippingMethod;
}

export function setAddressOnCart(values, setCartAddress) {
  const { data, isDataValid } = values;
  const isNewAddress = !data?.id;

  if (!isDataValid) return;

  const customAttributes = data.customAttributes?.map(({ code, value }) => ({
    code,
    value: String(value),
  }));

  // TODO: implement new address creation
  const address = !isNewAddress
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

  setCartAddress(address);
}
