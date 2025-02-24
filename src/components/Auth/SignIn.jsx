import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiGithub, FiTwitter } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      // Demo: Store auth state and user info
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    // ... rest of the component remains the same ...
  );
};

export default SignIn;