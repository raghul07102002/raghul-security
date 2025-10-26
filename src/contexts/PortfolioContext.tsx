import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProfileData {
  name: string;
  role: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  photoUrl: string;
}

interface PortfolioContextType {
  currentView: string;
  setCurrentView: (view: string) => void;
  profileData: ProfileData;
  updateProfileData: (data: Partial<ProfileData>) => void;
  isAuthenticated: boolean;
  authenticate: (password: string) => boolean;
  logout: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const DEFAULT_PROFILE: ProfileData = {
  name: 'Raghul R',
  role: 'Security Engineer',
  bio: 'Passionate Security Engineer specializing in Identity and Access Management, Security Operations Centre, and Vulnerability Management. Dedicated to protecting digital assets and ensuring robust cybersecurity frameworks.',
  email: 'raghul@example.com',
  linkedin: 'https://www.linkedin.com/in/raghul',
  github: 'https://github.com/raghul07102002',
  photoUrl: '/src/assets/raghul-profile.jpg',
};

const ADMIN_PASSWORD = 'Trytocrack@9015';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('portfolioProfile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('portfolioProfile', JSON.stringify(profileData));
  }, [profileData]);

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const authenticate = (password: string): boolean => {
    const isValid = password === ADMIN_PASSWORD;
    setIsAuthenticated(isValid);
    return isValid;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <PortfolioContext.Provider
      value={{
        currentView,
        setCurrentView,
        profileData,
        updateProfileData,
        isAuthenticated,
        authenticate,
        logout,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};
