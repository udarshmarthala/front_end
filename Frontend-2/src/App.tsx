import React, { useState } from 'react';
import { AuthLayout } from './components/AuthLayout';
import { AuthForm } from './components/AuthForm';
import type { User } from './types/auth';

// This will be replaced with actual ZK functions when pkg is provided
const mockZKFunctions = {
  getPassHash: async (password: string) => {
    return btoa(password); // Temporary mock hash
  },
  generateProof: async (username: string, password: string) => {
    return btoa(`${username}:${password}`); // Temporary mock proof
  },
  verifyProof: async (proof: string, hash: string) => {
    return true; // Temporary mock verification
  }
};

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        // Login flow
        const storedUser = localStorage.getItem(username);
        if (!storedUser) {
          throw new Error('User not found');
        }

        const proof = await mockZKFunctions.generateProof(username, password);
        const user: User = JSON.parse(storedUser);
        
        const isValid = await mockZKFunctions.verifyProof(proof, user.passwordHash);
        if (isValid) {
          alert('Login successful!');
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        // Registration flow
        const passwordHash = await mockZKFunctions.getPassHash(password);
        const user: User = { username, passwordHash };
        localStorage.setItem(username, JSON.stringify(user));
        alert('Registration successful! You can now login.');
        setIsLogin(true);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={isLogin ? 'Welcome Back' : 'Create Account'}
      subtitle={
        isLogin
          ? 'Sign in to your account using ZK authentication'
          : 'Register a new account with zero-knowledge proofs'
      }
    >
      <AuthForm
        mode={isLogin ? 'login' : 'register'}
        onSubmit={handleAuth}
        isLoading={isLoading}
      />
      
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Sign in'}
        </button>
      </div>
    </AuthLayout>
  );
}

export default App;