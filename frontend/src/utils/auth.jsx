import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  // console.log(tokenDuration);

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function LoggedInUserOnly() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/');
  }

  return null;
}


export function LoggedOutUserOnly() {
  const token = getAuthToken();

  if (token) {
    return redirect('/dashboard');
  }

  return null;
}

