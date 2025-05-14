import React from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-start gap-3 ${
      type === 'success' ? 'bg-green-900/80' : 'bg-red-900/80'
    }`}>
      {type === 'success' ? (
        <CheckCircle2 className="text-green-300 mt-0.5" />
      ) : (
        <XCircle className="text-red-300 mt-0.5" />
      )}
      <div className="flex-1 text-white text-sm">
        {message}
      </div>
      <button 
        onClick={onClose}
        className="text-gray-300 hover:text-white"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Notification;