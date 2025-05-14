import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Auth from './components/Auth';
import { useAuth } from './context/AuthContext';
import TasksContainer from './components/TasksContainer';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-blue-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <AppProvider>
      <Layout>
        <div className="max-w-screen-xl mx-auto p-4 md:p-6">
          <TasksContainer />
        </div>
      </Layout>
    </AppProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;