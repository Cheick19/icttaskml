import React from 'react';

interface UserAvatarProps {
  name?: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  name = '', 
  avatar, 
  size = 'md' 
}) => {
  const getInitials = (name: string) => {
    if (!name) return '';
    
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6 text-xs';
      case 'lg':
        return 'w-10 h-10 text-base';
      case 'md':
      default:
        return 'w-8 h-8 text-sm';
    }
  };

  return (
    <>
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className={`${getSizeClasses()} rounded-full object-cover border border-blue-500`}
        />
      ) : (
        <div
          className={`${getSizeClasses()} rounded-full bg-blue-900 text-blue-100 flex items-center justify-center font-medium border border-blue-500`}
        >
          {getInitials(name)}
        </div>
      )}
    </>
  );
};

export default UserAvatar;