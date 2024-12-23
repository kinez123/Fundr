import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient/supabase';
import {Link} from 'react-router-dom';

export const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Handle authentication state changes
  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData.session);
    };

    fetchSession();

    // Subscribe to auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe(); 
    };
  }, []);

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
  
      if (error) throw error;
  
      const user = data.user;
  
      const { data: userRole, error: roleError } = await supabase
        .from('Users')
        .select('role')
        .eq('user_id', user.id)
        .single();
  
      if (roleError) throw roleError;
  
      localStorage.setItem('user', JSON.stringify({ ...user, role: userRole.role }));
  
      alert('Login successful!');
      navigate('/Home'); 
    } catch (err) {
      setError(err.message); 
      console.error("Login error:", err);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      setResetError('Please enter your email address.');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
      if (error) throw error;
      alert('Password reset email sent! Please check your inbox.');
      setIsResettingPassword(false); // Close reset password modal
    } catch (err) {
      setResetError(err.message);
    }
  };

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle reset email input change
  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
    setResetError('');
  };

  // Handle button click for switching between Login and Sign Up
  const handleButtonClick = (newAction) => {
    setAction(newAction);
  };

  if (session) {
    return <div className="text-center text-lg font-semibold">Logged in as {session.user.email}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">{action === 'Login' ? 'Login' : 'Sign Up'}</h1>
        </div>

        <p className="text-center text-sm text-gray-500 mb-4">or</p>

        {/* Login form fields */}
        {action === 'Login' && (
          <div className="space-y-4">
            <h1 className='text-2xl font-semibold text-gray-700 text-center'>Login using Email</h1>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )}

        {/* Sign Up form fields */}
        {action === 'Sign Up' && (
          <div className="space-y-4">
            {/* Add your Sign Up form fields here */}
          </div>
        )}

        {action === 'Login' && (
          <div
            className="text-center text-sm text-blue-500 mt-2 cursor-pointer"
            onClick={() => setIsResettingPassword(true)} // Trigger password reset modal
          >
            Forgot Password? <span className="font-semibold">Click Here!</span>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            className={`w-full py-4 px-4 m-2 rounded-lg text-white ${
              action === 'Login' ? 'bg-gray-400' : 'bg-purple-500 hover:bg-blue-600'
            }`}
            onClick={() => navigate('/signup')} // Navigate to /signup
          >
            Sign Up
          </button>
          <button
            className={`w-full py-4 px-4 m-2 rounded-lg text-white ${
              action === 'Sign Up' ? 'bg-gray-300' : 'bg-purple-500 hover:bg-purple-600'
            }`}
            onClick={() => handleButtonClick('Login')}
          >
            Login
          </button>
        </div>

        {/* Trigger login if Login action is selected */}
        {action === 'Login' && (
          <div className="mt-6">
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Modal for resetting password */}
      {isResettingPassword && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Reset Password</h2>
            <input
              type="email"
              value={resetEmail}
              onChange={handleResetEmailChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            {resetError && <p className="text-red-500 text-sm mb-4">{resetError}</p>}
            <div className="flex justify-between">
              <button
                onClick={handlePasswordReset}
                className="w-full py-2 mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Send Reset Link
              </button>
              <button
                onClick={() => setIsResettingPassword(false)}
                className="w-full py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
