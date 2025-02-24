import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AdCreator from './components/AdCreator';
import TemplateSelection from './components/TemplateSelection';
import AdEditor from './components/AdEditor/AdEditor';
import SubscriptionPage from './components/Subscription/SubscriptionPage';
import PaymentPage from './components/Payment/PaymentPage';
import SubscriptionConfirmation from './components/Subscription/SubscriptionConfirmation';
import BillingPage from './components/Billing/BillingPage';
import ContactPage from './components/Contact/ContactPage';
import HelpPage from './components/Help/HelpPage';
import LandingPage from './components/LandingPage';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import OnboardingPage from './components/Auth/Onboarding';
import GetStartedPage from './components/GetStarted/GetStartedPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(!!authStatus);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  // Check if current path is public
  const isPublicRoute = (pathname) => {
    return ['/', '/signin', '/signup'].includes(pathname);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && !isPublicRoute(window.location.hash.slice(1)) && <Sidebar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignIn />
          } />
          <Route path="/signup" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />
          } />

          {/* Protected Routes */}
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/get-started" element={<GetStartedPage />} />
              <Route path="/create" element={<AdCreator />} />
              <Route path="/templates" element={<TemplateSelection />} />
              <Route path="/editor/:templateId" element={<AdEditor />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/subscription/confirmation" element={<SubscriptionConfirmation />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/help" element={<HelpPage />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;