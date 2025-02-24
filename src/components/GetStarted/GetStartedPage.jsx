import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiPlay, FiEdit, FiLayout, FiImage } from 'react-icons/fi';

const GetStartedPage = () => {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      id: 1,
      title: 'Create Your First Ad',
      description: 'Create your first AI-powered advertisement',
      icon: FiEdit,
      link: '/create',
      time: '5 mins'
    },
    {
      id: 2,
      title: 'Choose a Template',
      description: 'Browse our collection of pre-made templates',
      icon: FiLayout,
      link: '/templates',
      time: '3 mins'
    },
    {
      id: 3,
      title: 'Upload Assets',
      description: 'Upload your brand images and assets',
      icon: FiImage,
      link: '/create',
      time: '4 mins'
    }
  ];

  const handleStepClick = (step) => {
    if (!completedSteps.includes(step.id)) {
      setCompletedSteps([...completedSteps, step.id]);
    }
    navigate(step.link);
  };

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Adbot.ai!</h1>
          <p className="text-gray-600">
            Follow these steps to start creating amazing ads with AI.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              whileHover={{ y: -2 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    completedSteps.includes(step.id) ? 'bg-green-100' : 'bg-indigo-100'
                  }`}>
                    {completedSteps.includes(step.id) ? (
                      <FiCheck className="w-6 h-6 text-green-600" />
                    ) : (
                      <step.icon className="w-6 h-6 text-indigo-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    <div className="flex items-center mt-2">
                      <FiPlay className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{step.time}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStepClick(step)}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    completedSteps.includes(step.id)
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {completedSteps.includes(step.id) ? (
                    'Completed'
                  ) : (
                    <>
                      Start Now
                      <FiArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {completedSteps.length === steps.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center p-6 bg-green-50 rounded-lg"
          >
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              🎉 You're All Set!
            </h3>
            <p className="text-green-700 mb-4">
              You've completed all the getting started steps. Ready to create your ads?
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/create')}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Create Your First Ad
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GetStartedPage;