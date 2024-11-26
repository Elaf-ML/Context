import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { users } from '../data/users';

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      login(username);
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-md max-w-md mx-auto mt-8"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="block w-full my-4 p-3 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="block w-full my-4 p-3 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors w-full mt-4"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
