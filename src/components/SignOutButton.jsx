import { useNavigate } from 'react-router-dom';

function SignOutButton() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
}

export default SignOutButton;
