import React, { useState, useCallback, useEffect } from 'react';
import { Bell, Lock, User, Palette, Globe, Mail, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import UserAvatar from './ui/UserAvatar';
import Notification from './ui/Notification';

const Settings: React.FC = () => {
  const { currentUser } = useAppContext();
  const { signOut } = useAuth();
  
  // États pour la gestion du formulaire
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);
  
  // États pour les données et notifications
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatar_url: ''
  });
  
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    push: true,
    sound: false
  });
  
  const [errors, setErrors] = useState({
    name: '',
    avatar_url: ''
  });
  
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: ''
  });

  // Initialiser les données utilisateur
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        avatar_url: currentUser.avatar || ''
      });
    }
  }, [currentUser]);

  // Validation des champs
  const validate = useCallback(() => {
    const newErrors = { name: '', avatar_url: '' };
    if (!profileData.name.trim()) newErrors.name = 'Name is required';
    if (!profileData.avatar_url.trim()) newErrors.avatar_url = 'Avatar URL is required';
    setErrors(newErrors);
    return Object.values(newErrors).every(x => !x);
  }, [profileData]);

  // Mise à jour du profil
  const handleProfileUpdate = useCallback(async () => {
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      // Simulation de requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotification({
        show: true,
        message: 'Profile updated successfully!',
        type: 'success'
      });
      setIsEditing(false);
    } catch (error) {
      setNotification({
        show: true,
        message: 'Failed to update profile',
        type: 'error'
      });
      console.error('Update failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [profileData, validate]);

  // Gestion des changements d'input
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Téléchargement d'avatar
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileData(prev => ({
            ...prev,
            avatar_url: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Déconnexion
  const handleSignOut = useCallback(async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      try {
        await signOut();
      } catch (error) {
        setNotification({
          show: true,
          message: 'Sign out failed',
          type: 'error'
        });
        console.error('Error signing out:', error);
      }
    }
  }, [signOut]);

  // Gestion des préférences de notification
  const handleNotificationPrefChange = useCallback((key: keyof typeof notificationPrefs) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {notification.show && (
        <Notification 
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(prev => ({ ...prev, show: false }))}
        />
      )}

      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
        >
          <User size={18} className="inline mr-2" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 font-medium ${activeTab === 'notifications' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
        >
          <Bell size={18} className="inline mr-2" />
          Notifications
        </button>
        <button
          onClick={() => setActiveTab('appearance')}
          className={`px-4 py-2 font-medium ${activeTab === 'appearance' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
        >
          <Palette size={18} className="inline mr-2" />
          Appearance
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="bg-gray-900/50 border border-blue-900/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <UserAvatar 
                name={profileData.name} 
                avatar={profileData.avatar_url} 
                size="lg" 
              />
              <div>
                <h2 className="text-xl font-semibold text-white">{profileData.name}</h2>
                <p className="text-gray-400">{currentUser?.role || 'User'}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg transition-colors"
              aria-label="Sign out"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-blue-900/30 rounded-md text-white"
                    aria-label="Name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-3 py-2 bg-gray-800/20 border border-blue-900/30 rounded-md text-gray-400 cursor-not-allowed"
                    aria-label="Email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Avatar</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      name="avatar_url"
                      value={profileData.avatar_url}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 bg-gray-800/50 border border-blue-900/30 rounded-md text-white"
                      aria-label="Avatar URL"
                    />
                    <label className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md cursor-pointer transition-colors">
                      Upload
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {errors.avatar_url && <p className="text-red-400 text-sm mt-1">{errors.avatar_url}</p>}
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Cancel editing"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileUpdate}
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                  aria-label="Save changes"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              aria-label="Edit profile"
            >
              Edit Profile
            </button>
          )}
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-gray-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <span className="text-gray-300">Email Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationPrefs.email}
                  onChange={() => handleNotificationPrefChange('email')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-blue-400" />
                <span className="text-gray-300">Push Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationPrefs.push}
                  onChange={() => handleNotificationPrefChange('push')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-blue-400" />
                <span className="text-gray-300">Sound Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationPrefs.sound}
                  onChange={() => handleNotificationPrefChange('sound')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'appearance' && (
        <div className="bg-gray-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
          
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Palette size={18} className="text-blue-400" />
              <span className="text-gray-300">Dark Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="pt-4">
            <h4 className="text-md font-medium text-gray-300 mb-2">Theme Color</h4>
            <div className="flex gap-3">
              {['blue', 'green', 'purple', 'red'].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full bg-${color}-500 hover:opacity-80 transition-opacity`}
                  aria-label={`Select ${color} theme`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;