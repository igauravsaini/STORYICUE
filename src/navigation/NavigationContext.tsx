import React, { createContext, useContext, useState, useEffect } from 'react';
import { BackHandler } from 'react-native';

export type ScreenName = 'Home' | 'Show' | 'Player' | 'Recap' | 'Ask';

export interface NavigationRoute {
  screen: ScreenName;
  params?: Record<string, any>;
}

export interface NavigationContextType {
  currentScreen: ScreenName;
  params: Record<string, any>;
  navigate: (screen: ScreenName, params?: Record<string, any>) => void;
  goBack: () => boolean;
  canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<NavigationRoute[]>([{ screen: 'Home', params: {} }]);

  const currentRoute = history[history.length - 1];
  const canGoBack = history.length > 1;

  const navigate = (screen: ScreenName, params: Record<string, any> = {}) => {
    setHistory((prev) => [...prev, { screen, params }]);
  };

  const goBack = (): boolean => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, prev.length - 1));
      return true;
    }
    return false;
  };

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack) {
        goBack();
        return true; // Handled
      }
      return false; // Let TV OS handle exit if on Home
    };

    if (!BackHandler || typeof BackHandler.addEventListener !== 'function') {
      return;
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      } else if (BackHandler && typeof BackHandler.removeEventListener === 'function') {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }
    };
  }, [canGoBack, history]);

  return (
    <NavigationContext.Provider
      value={{
        currentScreen: currentRoute.screen,
        params: currentRoute.params || {},
        navigate,
        goBack,
        canGoBack,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
