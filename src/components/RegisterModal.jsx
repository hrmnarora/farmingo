import { useState } from 'react';

function RegisterModal({ closeModal }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('farmer');

  const handleRegister = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { username, password, userType };

    const userExists = existingUsers.some((user) => user.username === username);

    if (userExists) {
      alert('User already exists!');
    } else {
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      alert('Registration successful! You can now sign in.');
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white flex w-[300px] items-center justify-center flex-col p-6 rounded-md">
        <h2 className="text-2xl mb-4 text-zinc-800">Register</h2>
        <input
          className="mb-2 w-full text-zinc-700 outline-none rounded-md p-2 border"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="mb-4 w-full text-zinc-700 outline-none rounded-md p-2 border"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="mb-4 w-full text-zinc-700 outline-none rounded-md p-2 border"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
        </select>
        <div className='flex justify-between w-full'>
          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            className="ml-4 bg-gray-500 text-white p-2 rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
