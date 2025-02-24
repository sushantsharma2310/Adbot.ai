import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    size: '',
    goals: []
  });

  const handleComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    navigate('/dashboard');
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 relative">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-6"
          >
            Let's Get Started
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90"
          >
            Help us customize your experience
          </motion.p>
        </div>
      </div>

      {/* Right Panel - Onboarding Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Step {step} of 3</h2>
          </div>

          {step === 3 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleComplete}
              className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Complete Setup <FiArrowRight className="ml-2" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Next Step <FiArrowRight className="ml-2" />
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;