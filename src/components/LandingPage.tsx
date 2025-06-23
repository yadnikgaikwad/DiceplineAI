
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from './AuthModal';
import { useAuth } from '@/contexts/AuthContext';

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { login } = useAuth();

  const handleAuthenticated = () => {
    setShowAuthModal(false);
    login();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Welcome to TaskFlow AI
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Intelligent task management with AI-powered breakdown and seamless collaboration
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setShowAuthModal(true)}
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAuthModal(true)}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg"
          >
            Sign In
          </Button>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
}
