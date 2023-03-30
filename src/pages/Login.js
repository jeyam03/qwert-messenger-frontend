import React, { useState } from 'react';

function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // handle login logic here
    } else {
      // handle signup logic here
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-lg font-medium mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            className="border border-gray-400 p-2 rounded-lg w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            className="border border-gray-400 p-2 rounded-lg w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="bg-indigo-500 text-white py-2 px-4 mx-2 rounded-lg hover:bg-indigo-600">
          {isLogin ? 'Login' : 'Signup'}
        </button>
        <button
          className="bg-gray-300 text-indigo-500 py-2 px-4 mx-2 rounded-lg hover:bg-gray-400"
          onClick={() => setIsLogin(!isLogin)}
          type="button"
        >
          {isLogin ? 'Switch to Signup' : 'Switch to Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginSignupPage;