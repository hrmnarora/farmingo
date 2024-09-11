import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignInModal({ closeModal }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      closeModal();
      if (user.userType === 'farmer') {
        navigate('/farmer');
      } else if (user.userType === 'buyer') {
        navigate('/buyer');
      }
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white flex w-[300px] items-center justify-center flex-col  p-6 rounded-md">
        <h2 className="text-2xl mb-4 text-zinc-800">Sign In</h2>
        <input
          className="mb-2 w-full text-zinc-700  outline-none rounded-md p-2 border"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="mb-4 w-full text-zinc-700  outline-none rounded-md p-2 border"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='flex justify-between w-full'><button
          className="bg-green-500 text-white p-2 rounded"
          onClick={handleLogin}
        >
          Sign In
        </button>
        <button
          className="ml-4 bg-gray-500 text-white p-2 rounded"
          onClick={closeModal}
        >
          Close
        </button></div>
        
      </div>
    </div>
  );
}

export default SignInModal;
