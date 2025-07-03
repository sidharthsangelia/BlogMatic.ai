"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Zap, Crown, ArrowRight } from 'lucide-react';

const Pricing  = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Regular",
      icon: <Zap className="w-6 h-6" />,
      price: isAnnual ? 8 : 10,
      originalPrice: isAnnual ? 10 : null,
      period: isAnnual ? "/month (billed annually)" : "/month",
      link: "https://buy.stripe.com/test_00waEQclec2q73q2Orbsc00",
      description: "Perfect for content creators and bloggers",
      features: [
        "5 video conversions per month",
        "Up to 10 minutes per video",
        "Basic blog formatting",
        "Email support",
        "Standard processing speed",
        "Download as markdown",
        "Basic SEO optimization"
      ],
      cta: "Start Creating",
      popular: false,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "Pro",
      icon: <Crown className="w-6 h-6" />,
      price: isAnnual ? 16 : 19.99,
      originalPrice: isAnnual ? 19.99 : null,
      period: isAnnual ? "/month (billed annually)" : "/month",
      link:"https://buy.stripe.com/test_28E14gcleaYm73q3Svbsc01",
      description: "For professionals and growing businesses",
      features: [
        "25 video conversions per month",
        "Up to 60 minutes per video",
        "Advanced blog formatting",
        "Priority support",
        "2x faster processing",
        "Multiple export formats",
        "Advanced SEO optimization",
        "Custom templates",
        "Bulk processing",
        "API access"
      ],
      cta: "Go Pro",
      popular: true,
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Transform Your Videos Into 
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Engaging Blogs</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Choose the perfect plan to turn your video content into compelling blog posts
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-purple-500 shadow-purple-500/25 shadow-xl' 
                  : 'border-gray-700 hover:border-purple-400'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium px-4 py-2 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${plan.gradient} text-white mb-4`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">${plan.originalPrice}</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mt-1">{plan.period}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.link} // Replace with your Stripe checkout link
                className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-gray-600 hover:border-purple-400'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">
            Need a custom solution? We've got you covered.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
            Contact Sales
          </button>
        </div>

        {/* Features Grid */}
        <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Why Choose VideoToBlog?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-medium mb-2">Lightning Fast</h4>
              <p className="text-gray-400 text-sm">
                Convert your videos to blogs in minutes, not hours
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-medium mb-2">Premium Quality</h4>
              <p className="text-gray-400 text-sm">
                AI-powered content that maintains your unique voice
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-medium mb-2">SEO Optimized</h4>
              <p className="text-gray-400 text-sm">
                Built-in SEO features to boost your content's visibility
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing ;