import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AppDemo } from './components/AppDemo';

export function App() {
  const [view, setView] = useState<'landing' | 'demo'>('landing');

  return (
    <div className="w-full min-h-screen">
      {view === 'landing' ? (
        <LandingPage onLaunchDemo={() => setView('demo')} />
      ) : (
        <AppDemo onBackToLanding={() => setView('landing')} />
      )}
    </div>
  );
}

export default App;
