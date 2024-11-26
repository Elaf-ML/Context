import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { users } from '../data/users';

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Handle login submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      login(username);
    } else {
      alert('Invalid credentials!');
    }
  };

  // Handle "Create Account" button click
  const handleCreateAccount = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  // Handle account creation submission
  const handleAccountCreation = (e) => {
    e.preventDefault();
    if (newUsername && newPassword) {
      // Add new user to the users array
      users.push({ username: newUsername, password: newPassword });
      alert('Account created successfully!');
      setIsModalOpen(false); // Close the modal
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div>
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
        <button
          type="button"
          onClick={handleCreateAccount}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors w-full mt-4"
        >
          Create an Account
        </button>
      </form>

      {/* Modal for Account Creation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
            <form onSubmit={handleAccountCreation}>
              <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                className="block w-full my-4 p-3 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="block w-full my-4 p-3 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors w-full mt-4"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors w-full mt-4"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
