import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';
import { FaCoffee } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, loginWithGoogle, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e7f3ea]">
        <Spinner />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      enqueueSnackbar('Login successful!', { variant: 'success' });
      navigate('/');
    } else {
      enqueueSnackbar(result.message || 'Login failed', { variant: 'error' });
    }
  };

  const handleGoogleSignIn = () => {
    if (!window.google) {
      enqueueSnackbar('Google Sign-In is not loaded. Please refresh the page.', { variant: 'error' });
      return;
    }

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      enqueueSnackbar('Google Client ID is not configured. Please add VITE_GOOGLE_CLIENT_ID to your .env file.', { variant: 'error' });
      return;
    }

    setGoogleLoading(true);
    
    // Use OAuth2 flow to get access token
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'openid email profile',
      callback: async (tokenResponse) => {
        if (tokenResponse.error) {
          setGoogleLoading(false);
          enqueueSnackbar('Google sign-in was cancelled or failed', { variant: 'error' });
          return;
        }

        if (tokenResponse.access_token) {
          try {
            const result = await loginWithGoogle(tokenResponse.access_token);
            setGoogleLoading(false);
            
            if (result.success) {
              enqueueSnackbar('Google login successful!', { variant: 'success' });
              navigate('/');
            } else {
              enqueueSnackbar(result.message || 'Google login failed', { variant: 'error' });
            }
          } catch (error) {
            setGoogleLoading(false);
            enqueueSnackbar('Google login failed', { variant: 'error' });
          }
        }
      },
    });

    tokenClient.requestAccessToken();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e7f3ea] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <FaCoffee className="text-4xl text-[#265b37]" />
            <h1 className="text-3xl font-bold text-[#265b37]">Cafe Spots</h1>
          </div>
          <p className="text-sm text-gray-600">Your matcha & coffee adventure tracker</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Tab Buttons */}
          <div className="flex gap-2 mb-6">
            <Link
              to="/login"
              className={`flex-1 py-2 px-4 text-center rounded-lg font-medium transition ${
                location.pathname === '/login'
                  ? 'bg-[#265b37] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={`flex-1 py-2 px-4 text-center rounded-lg font-medium transition ${
                location.pathname === '/signup'
                  ? 'bg-[#265b37] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sign up
            </Link>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265b37] focus:border-transparent transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="#"
                  className="text-sm text-[#265b37] hover:text-[#1b4332] font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#265b37] focus:border-transparent transition"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#265b37] text-white rounded-lg font-semibold hover:bg-[#1b4332] focus:outline-none focus:ring-2 focus:ring-[#265b37] focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? <Spinner /> : 'Log in'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <Spinner />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#265b37] hover:text-[#1b4332] font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
