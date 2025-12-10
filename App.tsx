import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Res from './pages/Res';
import Auth from './pages/Auth';
import { I18nProvider } from './i18n';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  let content = <Home />;
  if (route.startsWith('#/booking')) content = <Booking />;
  else if (route.startsWith('#/res')) content = <Res />;
  else if (route.startsWith('#/auth')) content = <Auth />;

  return (
    <I18nProvider>
      {content}
    </I18nProvider>
  );
};

export default App;