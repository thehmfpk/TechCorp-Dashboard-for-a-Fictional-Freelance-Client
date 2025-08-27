import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Edit, Save, X, Camera, Facebook, Twitter, Linkedin, Github, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { validateName, validatePhone, validateRequired } from '../utils/validation';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  
  const [editing, setEditing] = useState(isEditMode);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    contactNumber: user?.contactNumber || '',
    address: user?.address || '',
    bio: user?.bio || '',
    socialLinks: {
      facebook: user?.socialLinks?.facebook || '',
      twitter: user?.socialLinks?.twitter || '',
      linkedin: user?.socialLinks?.linkedin || '',
      github: user?.socialLinks?.github || '',
      website: user?.socialLinks?.website || '',
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        contactNumber: user.contactNumber,
        address: user.address,
        bio: user.bio || '',
        socialLinks: {
          facebook: user.socialLinks?.facebook || '',
          twitter: user.socialLinks?.twitter || '',
          linkedin: user.socialLinks?.linkedin || '',
          github: user.socialLinks?.github || '',
          website: user.socialLinks?.website || '',
        }
      });
      setProfilePicture(user.profilePicture || '');
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setProfileData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear errors on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePicture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const nameError = validateName(profileData.name);
    if (nameError) newErrors.name = nameError;
    
    const phoneError = validatePhone(profileData.contactNumber);
    if (phoneError) newErrors.contactNumber = phoneError;
    
    const addressError = validateRequired(profileData.address, 'Address');
    if (addressError) newErrors.address = addressError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    updateProfile({
      ...profileData,
      profilePicture: profilePicture
    });
    setEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setProfileData({
        name: user.name,
        contactNumber: user.contactNumber,
        address: user.address,
        bio: user.bio || '',
        socialLinks: {
          facebook: user.socialLinks?.facebook || '',
          twitter: user.socialLinks?.twitter || '',
          linkedin: user.socialLinks?.linkedin || '',
          github: user.socialLinks?.github || '',
          website: user.socialLinks?.website || '',
        }
      });
      setProfilePicture(user.profilePicture || '');
    }
    setEditing(false);
    setErrors({});
  };

  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    website: Globe,
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Profile
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your personal information and social links
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          {editing ? (
            <>
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditing(true)} className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <div className="lg:col-span-1">
          <Card>
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto overflow-hidden">
                  {profilePicture ? (
                    <img 
                      src={profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-16 w-16 text-white" />
                  )}
                </div>
                {editing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
                {profileData.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              
              {profileData.bio && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {profileData.bio}
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Personal Information
              </h3>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                error={errors.name}
                icon={<User className="h-4 w-4 text-gray-400" />}
                disabled={!editing}
                required
              />
              
              <Input
                label="Email Address"
                value={user.email}
                icon={<Mail className="h-4 w-4 text-gray-400" />}
                disabled
                helper="Email cannot be changed"
              />
              
              <Input
                label="Contact Number"
                name="contactNumber"
                value={profileData.contactNumber}
                onChange={handleChange}
                error={errors.contactNumber}
                icon={<Phone className="h-4 w-4 text-gray-400" />}
                disabled={!editing}
                required
              />
              
              <Input
                label="Address"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                error={errors.address}
                icon={<MapPin className="h-4 w-4 text-gray-400" />}
                disabled={!editing}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  disabled={!editing}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-all duration-200"
                />
              </div>
            </div>
          </Card>

          {/* Social Links */}
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Social Media Links
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Connect your social media profiles
              </p>
            </div>
            
            <div className="space-y-4">
              {Object.entries(socialIcons).map(([key, Icon]) => (
                <Input
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  name={`social_${key}`}
                  type="url"
                  value={profileData.socialLinks[key as keyof typeof profileData.socialLinks]}
                  onChange={handleChange}
                  icon={<Icon className="h-4 w-4 text-gray-400" />}
                  placeholder={`Your ${key} URL`}
                  disabled={!editing}
                />
              ))}
            </div>
            
            {!editing && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(profileData.socialLinks)
                    .filter(([_, url]) => url)
                    .map(([key, url]) => {
                      const Icon = socialIcons[key as keyof typeof socialIcons];
                      return (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm capitalize">{key}</span>
                        </a>
                      );
                    })}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;