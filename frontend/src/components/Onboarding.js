import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to SurviveRoute AI! 🚀",
      description: "Your intelligent navigation and survival companion",
      content: "Never get stranded again! We predict fuel risks, work offline, and ensure your safety on every journey.",
      icon: "🌟"
    },
    {
      title: "Intelligent Fuel Prediction 🎯",
      description: "95% accurate fuel risk assessment",
      content: "We analyze traffic, terrain, driving style, and vehicle type to predict exactly how far you can go safely.",
      icon: "⛽"
    },
    {
      title: "Works Offline 📡",
      description: "Navigate even without internet",
      content: "Download maps and station data. Our system works in remote areas where other apps fail.",
      icon: "🗺️"
    },
    {
      title: "Emergency Assistance 🚨",
      description: "Help is always one tap away",
      content: "SOS button connects you to nearby mechanics, tow services, and emergency responders instantly.",
      icon: "🆘"
    },
    {
      title: "AI Assistant 🤖",
      description: "Your smart travel companion",
      content: "Ask questions in natural language: 'Can I reach Delhi?' or 'Where should I refuel?' - AI answers instantly.",
      icon: "💬"
    },
    {
      title: "Green & Sustainable 🌱",
      description: "Track your environmental impact",
      content: "Monitor carbon footprint, optimize EV charging, integrate solar panels, and earn eco-rewards.",
      icon: "♻️"
    },
    {
      title: "Let's Get Started! 🎉",
      description: "Set up your vehicle profile",
      content: "Tell us about your vehicle so we can provide accurate predictions tailored just for you.",
      icon: "🚗"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('onboardingComplete', 'true');
      onComplete();
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingComplete', 'true');
    onComplete();
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '3rem',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        {/* Progress Indicator */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          justifyContent: 'center'
        }}>
          {steps.map((_, index) => (
            <div
              key={index}
              style={{
                width: '40px',
                height: '4px',
                borderRadius: '2px',
                background: index <= currentStep ? '#667eea' : '#e2e8f0',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Icon */}
        <div style={{
          fontSize: '4rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
          animation: 'bounce 1s ease-in-out infinite'
        }}>
          {step.icon}
        </div>

        {/* Content */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#333',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          {step.title}
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: '#667eea',
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontWeight: '600'
        }}>
          {step.description}
        </p>

        <p style={{
          fontSize: '1rem',
          color: '#666',
          textAlign: 'center',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          {step.content}
        </p>

        {/* Step Counter */}
        <p style={{
          textAlign: 'center',
          color: '#999',
          fontSize: '0.9rem',
          marginBottom: '2rem'
        }}>
          Step {currentStep + 1} of {steps.length}
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={handleSkip}
            style={{
              padding: '0.75rem 1.5rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              background: 'white',
              color: '#666',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.borderColor = '#667eea'}
            onMouseOut={(e) => e.target.style.borderColor = '#e2e8f0'}
          >
            Skip
          </button>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#e2e8f0',
                  color: '#333',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#cbd5e0'}
                onMouseOut={(e) => e.target.style.background = '#e2e8f0'}
              >
                Previous
              </button>
            )}

            <button
              onClick={handleNext}
              style={{
                padding: '0.75rem 2rem',
                border: 'none',
                borderRadius: '8px',
                background: '#667eea',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#5568d3';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#667eea';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }}
            >
              {currentStep === steps.length - 1 ? "Get Started! 🚀" : "Next"}
            </button>
          </div>
        </div>

        {/* Features List (Last Step) */}
        {currentStep === steps.length - 1 && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: '#f7fafc',
            borderRadius: '12px'
          }}>
            <p style={{
              fontSize: '0.9rem',
              color: '#666',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              What you'll be able to do:
            </p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              fontSize: '0.85rem',
              color: '#666'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>✅ Configure your vehicle details</li>
              <li style={{ marginBottom: '0.5rem' }}>✅ Get accurate fuel predictions</li>
              <li style={{ marginBottom: '0.5rem' }}>✅ Find nearby stations</li>
              <li style={{ marginBottom: '0.5rem' }}>✅ Access emergency services</li>
              <li style={{ marginBottom: '0.5rem' }}>✅ Chat with AI assistant</li>
              <li>✅ Track your carbon footprint</li>
            </ul>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Onboarding;

// Made with Bob
