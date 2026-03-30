import React, { useState, useRef, useEffect } from 'react';

function AIAssistant({ vehicle, fuelLevel, prediction }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI travel assistant. I can help you with fuel predictions, route planning, and safety advice. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    'Can I reach my destination?',
    'Where should I refuel?',
    'What\'s my safe range?',
    'Is this route safe?',
    'Find nearest fuel station',
    'Emergency tips'
  ];

  const generateResponse = (question) => {
    const q = question.toLowerCase();

    // Fuel-related questions
    if (q.includes('reach') || q.includes('destination')) {
      if (!prediction) {
        return 'Please set your destination distance in the Dashboard first, then I can tell you if you can reach safely.';
      }
      if (prediction.risk === 'SAFE') {
        return `Yes! You can reach your destination safely. You have ${prediction.safeRange} km of safe range, which gives you a good buffer. Your confidence score is ${(prediction.confidence * 100).toFixed(0)}%.`;
      } else if (prediction.risk === 'CAUTION') {
        return `You might reach, but it's close. Your safe range is ${prediction.safeRange} km. I recommend refueling at the next available station for peace of mind.`;
      } else {
        return `⚠️ Warning! You may not reach your destination safely. Your safe range is only ${prediction.safeRange} km. Please refuel immediately at the nearest station.`;
      }
    }

    // Refuel questions
    if (q.includes('refuel') || q.includes('fuel station') || q.includes('petrol')) {
      return `Based on your current fuel level (${fuelLevel}%), I recommend:\n\n1. Check the Map View for nearby stations\n2. Look for stations within your safe range (${prediction?.safeRange || 'N/A'} km)\n3. Consider refueling before your fuel drops below 25%\n\nWould you like me to show you the nearest stations?`;
    }

    // Range questions
    if (q.includes('range') || q.includes('how far') || q.includes('distance')) {
      if (!prediction) {
        return 'Please go to the Dashboard and enter your trip details to calculate your range.';
      }
      return `Your current fuel range:\n\n🔹 Safe Range: ${prediction.safeRange} km (recommended)\n🔹 Adjusted Range: ${prediction.adjustedRange} km (realistic)\n🔹 Base Range: ${prediction.baseRange} km (ideal conditions)\n\nThe safe range includes a 30% buffer for unexpected situations.`;
    }

    // Safety questions
    if (q.includes('safe') || q.includes('safety') || q.includes('tips')) {
      return `🛡️ Safety Tips:\n\n1. Always maintain at least 25% fuel\n2. Plan refuel stops before entering remote areas\n3. Keep emergency contacts saved\n4. Share your location with family on long trips\n5. Check weather and traffic before departure\n6. Keep a first aid kit and basic tools\n\nNeed emergency help? Go to the Emergency section.`;
    }

    // Emergency questions
    if (q.includes('emergency') || q.includes('help') || q.includes('stuck')) {
      return `🚨 For emergencies:\n\n1. Use the Emergency section to request help\n2. Press SOS to alert emergency contacts\n3. Call 112 for immediate assistance\n4. Stay in your vehicle if it's safe\n5. Turn on hazard lights\n\nDo you need emergency assistance right now?`;
    }

    // Vehicle questions
    if (q.includes('vehicle') || q.includes('car') || q.includes('mileage')) {
      if (!vehicle) {
        return 'You haven\'t set up your vehicle yet. Please go to Vehicle Setup to add your vehicle details for accurate predictions.';
      }
      return `Your current vehicle:\n\n🚗 Type: ${vehicle.type}\n⛽ Fuel Type: ${vehicle.fuelType}\n📊 Mileage: ${vehicle.mileage} km/l\n🛢️ Tank Capacity: ${vehicle.tankCapacity} L\n🎯 Driving Style: ${vehicle.drivingStyle}\n\nWant to update these details? Go to Vehicle Setup.`;
    }

    // Marketplace questions
    if (q.includes('mechanic') || q.includes('tow') || q.includes('professional')) {
      return `You can find help in the Marketplace section:\n\n🔧 Mechanics - For vehicle repairs\n🚛 Tow Services - For vehicle transport\n⛽ Fuel Delivery - Emergency fuel\n🏥 Medical Help - Health emergencies\n\nAll professionals are verified and rated by users.`;
    }

    // Default response
    return `I can help you with:\n\n✓ Fuel range predictions\n✓ Route safety advice\n✓ Finding fuel stations\n✓ Emergency assistance\n✓ Vehicle information\n✓ Safety tips\n\nTry asking: "Can I reach my destination?" or "Where should I refuel?"`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage = {
        role: 'assistant',
        content: response
      };

      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">💬 AI Travel Assistant</div>

        {/* Quick Questions */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>
            Quick Questions:
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {quickQuestions.map((q, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(q)}
                className="btn btn-secondary"
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Container */}
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.role}`}
              >
                <div style={{ whiteSpace: 'pre-line' }}>
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message assistant">
                <div className="loading">
                  <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="chat-input"
            />
            <button
              onClick={handleSend}
              className="btn btn-primary"
              disabled={!input.trim() || loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Context Info */}
      <div className="card">
        <div className="card-header">📊 Current Context</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Fuel Level</strong>
            <div style={{ fontSize: '1.5rem', color: '#667eea', marginTop: '0.5rem' }}>
              {fuelLevel}%
            </div>
          </div>
          {prediction && (
            <>
              <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
                <strong>Safe Range</strong>
                <div style={{ fontSize: '1.5rem', color: '#667eea', marginTop: '0.5rem' }}>
                  {prediction.safeRange} km
                </div>
              </div>
              <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
                <strong>Risk Level</strong>
                <div style={{ fontSize: '1.5rem', color: '#667eea', marginTop: '0.5rem' }}>
                  {prediction.risk}
                </div>
              </div>
            </>
          )}
          {vehicle && (
            <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <strong>Vehicle</strong>
              <div style={{ fontSize: '1.5rem', color: '#667eea', marginTop: '0.5rem' }}>
                {vehicle.type}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="card">
        <div className="card-header">✨ What I Can Do</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <h4>🎯 Smart Predictions</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Accurate fuel range calculations based on your vehicle and conditions
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <h4>🗺️ Route Planning</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Help you plan safe routes with fuel stops
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <h4>🚨 Emergency Guidance</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Quick access to emergency services and safety tips
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <h4>💡 Smart Advice</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Personalized recommendations based on your situation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;

// Made with Bob
