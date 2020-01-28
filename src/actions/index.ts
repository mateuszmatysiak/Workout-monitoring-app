export const authenticate = (username: any, password: any) => (dispatch: any) => {
  dispatch({ type: 'AUTH_REQUEST' });
  return fetch('http://localhost:3100/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res: any) => res.json())
    .then((payload: any) => dispatch({ type: 'AUTH_SUCCESS', payload }));
};

export const logout = (token: any) => (dispatch: any) => {
  dispatch({ type: 'LOGOUT' });
  return token;
};
