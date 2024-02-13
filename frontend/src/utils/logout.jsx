import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is on the logout route
    if (window.location.pathname === '/logout') {
      console.log('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      navigate('/logout_success', { replace: true });
    }
  }, [navigate]);


  return (
    <></>
  );
}
