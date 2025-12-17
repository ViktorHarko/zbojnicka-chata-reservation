import React, { useState, useEffect } from 'react';
import { Layout } from './components/layout';
import { Home, Booking, Res, Auth } from './pages';
import { I18nProvider } from './i18n';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    if (route.startsWith('#/booking')) return <Booking />;
    if (route.startsWith('#/res')) return <Res />;
    if (route.startsWith('#/auth')) return <Auth />;
    return <Home />;
  };

  return (
    <I18nProvider>
      <Layout>
        {renderContent()}
      </Layout>
    </I18nProvider>
  );
};

export default App;