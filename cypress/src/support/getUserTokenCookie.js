const getUserTokenCookie = () => {
  const cookieName = 'auth_dropin_user_token';
  return document.cookie.includes(cookieName)
    ? document.cookie.split(`${cookieName}=`)[1].split(';')[0]
    : '';
};

Cypress.Commands.add('getUserTokenCookie', getUserTokenCookie);
