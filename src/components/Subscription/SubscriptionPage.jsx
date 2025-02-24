import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiClock, FiCheck, FiX } from 'react-icons/fi';
import PlanComparison from './PlanComparison';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [showComparison, setShowComparison] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for trying out Adbot.ai',
      features: [
        '5 AI-generated ads per month',
        'Basic templates only',
        'Standard quality exports',
        'Community support',
        'Basic analytics',
        'Single user'
      ],
      limitations: [
        'No priority support',
        'Limited templates',
        'No custom branding'
      ]
    },
    {
      name: 'Basic',
      price: billingCycle === 'monthly' ? 29 : 290,
      description: 'Best for growing businesses',
      popular: true,
      features: [
        '50 AI-generated ads per month',
        'All templates',
        'HD exports',
        'Priority email support',
        'Advanced analytics',
        'Brand kit',
        '3 team members'
      ]
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 79 : 790,
      description: 'For power users and teams',
      features: [
        'Unlimited AI-generated ads',
        'Custom templates',
        '4K exports',
        '24/7 priority support',
        'Advanced analytics',
        'API access',
        'Unlimited team members'
      ]
    }
  ];

  const handleSubscribe = (plan) => {
    navigate('/payment', { 
      state: { 
        plan: {
          ...plan,
          billingCycle,
          yearlyDiscount: billingCycle === 'annual' ? '20%' : null,
          total: billingCycle === 'annual' ? plan.price : plan.price * 12
        }
      } 
    });
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ x: -5 }}
                className="flex items-center text-gray-600 hover:text-indigo-600"
              >
                <FiArrowLeft className="mr-2" />
                Back to Dashboard
              </motion.button>
            </Link>
            <h1 className="text-3xl font-bold ml-8">Choose Your Plan</h1>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  billingCycle === 'annual'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                plan.popular ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-indigo-600 text-white text-center text-sm py-1">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price > 0 && (
                    <span className="text-gray-500">
                      /{billingCycle === 'monthly' ? 'mo' : 'year'}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-2 rounded-lg mb-6 ${
                    plan.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
                </motion.button>
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <FiCheck className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.limitations && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="font-medium text-gray-500 mb-2">Limitations:</p>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center text-gray-500">
                          <FiX className="text-red-400 mr-2" />
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lifetime Deal */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg text-white p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <FiClock className="mr-2" />
                <span className="text-sm font-medium">Limited Time Offer</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Lifetime Deal</h3>
              <p className="mb-4">Get unlimited access forever with one payment</p>
              <div className="flex items-center space-x-2">
                <span className="text-4xl font-bold">$129</span>
                <span className="text-lg line-through opacity-75">$790</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubscribe({ 
                name: 'Lifetime', 
                price: 129,
                features: [
                  'Unlimited lifetime access',
                  'All premium features',
                  'Priority support',
                  'Future updates'
                ]
              })}
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100"
            >
              Get Lifetime Access
              <FiArrowRight className="inline ml-2" />
            </motion.button>
          </div>
        </motion.div>

        {/* Compare Plans Button */}
        <div className="text-center">
          <button
            onClick={() => setShowComparison(true)}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Compare all features
          </button>
        </div>

        {/* Comparison Modal */}
        {showComparison && (
          <PlanComparison onClose={() => setShowComparison(false)} />
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;