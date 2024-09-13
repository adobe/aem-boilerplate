const validateOrdersStatus = (status) => {
  switch (status) {
    case 'Complete':
      return 'is-info';
    case 'Pending':
      return 'is-Light';
    case 'Processing':
      return 'is-warning';
    case 'Canceled':
      return 'is-danger';
    default:
      return 'is-link';
  }
};
export default validateOrdersStatus;
