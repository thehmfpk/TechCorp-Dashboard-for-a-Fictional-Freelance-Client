import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, MapPin, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/ui/Logo';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { validateEmail, validatePassword, validateName, validatePhone, validateRequired } from '../../utils/validation';

const SignUp: React.FC = () => {
  const { signup, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    address: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/app/overview" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (signupError) {
      setSignupError('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    const phoneError = validatePhone(formData.contactNumber);
    if (phoneError) newErrors.contactNumber = phoneError;
    
    const addressError = validateRequired(formData.address, 'Address');
    if (addressError) newErrors.address = addressError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setSignupError('');
    
    try {
      const success = await signup(formData);
      if (!success) {
        setSignupError('Email already exists. Please use a different email.');
      }
    } catch (error) {
      setSignupError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo size="lg" className="justify-center mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join TechCorp and start managing your projects
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {signupError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-700 dark:text-red-400">{signupError}</span>
              </div>
            )}
            
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={<User className="h-4 w-4 text-gray-400" />}
              placeholder="Enter your full name"
              required
            />
            
            <Input
              label="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={<Mail className="h-4 w-4 text-gray-400" />}
              placeholder="Enter your email (must be @gmail.com)"
              helper="Email must be a valid @gmail.com address"
              required
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<Lock className="h-4 w-4 text-gray-400" />}
              placeholder="Create a password"
              helper="Password must be at least 6 characters"
              required
            />
            
            <Input
              label="Contact Number"
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              error={errors.contactNumber}
              icon={<Phone className="h-4 w-4 text-gray-400" />}
              placeholder="Enter your contact number"
              required
            />
            
            <Input
              label="Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              icon={<MapPin className="h-4 w-4 text-gray-400" />}
              placeholder="Enter your address"
              required
            />
            
            <Button
              type="submit"
              loading={isLoading}
              className="w-full"
              size="lg"
            >
              Create account
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;