import './App.css';
import './styles/layout.css';
import './styles/quote-normal.css';
import './styles/quote-fullpage.css';

import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

import FollowObjectDown from './components/Effect/followObjectDown.jsx';
import TopNotifier from './components/QuoteViews/topNotifier.jsx';
import DustFlow from './components/Effect/dustFlow.jsx';

import FullPageView from './components/QuoteViews/FullPageView.jsx';
import CompactView from './components/QuoteViews/CompactView.jsx';
import AdminAddQuote from './components/AdminAddQuote.jsx';
import copyQuote from './utils/copyQuote.jsx';
import { PlayClickSound } from './utils/interactSond.jsx';
import { useQuotes } from './hooks/useQuotes.jsx';
import config from './config.js';
import { UmamiTracker } from './components/umami/umami.components.jsx';


function App() {
  const [alertText, setAlertText] = useState("");
  const [notifierTrigger, setNotifierTrigger] = useState(0);
  const [muted, setMuted] = useState(false);
  const [curQuoteIndex, setCurQuoteIndex] = useState(0);
  const [fullPageOpen, setFullPageOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  
  const { quotes, loading, error } = useQuotes();

  const handleCopyQuote = (textCopy) => {
    copyQuote({ quote: textCopy, muted });
    setAlertText(config.copy_success_message);
    setNotifierTrigger(prev => prev + 1);
  };

  const toggleMute = () => {
    setMuted(!muted);
    PlayClickSound();
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div id='QuoteBlock' className='min'>
          <div id='quoteContainer'><span>Chargement des citations...</span></div>
        </div>
      );
    }
    if (error) {
      return (
        <div id='QuoteBlock' className='min'>
          <div id='quoteContainer'><span>Erreur: {error}</span></div>
        </div>
      );
    }
    if (!quotes || quotes.length === 0) {
      return (
        <div id='QuoteBlock' className='min'>
          <div id='quoteContainer'><span>Aucune citation disponible</span></div>
        </div>
      );
    }

    if (fullPageOpen) {
      return (
        <FullPageView 
          data={quotes[curQuoteIndex]} 
          onClose={() => setFullPageOpen(false)} 
          onCopy={handleCopyQuote} 
        />
      );
    }

    return (
      <CompactView 
        data={quotes[curQuoteIndex]} 
        index={curQuoteIndex} 
        total={quotes.length} 
        setIndex={setCurQuoteIndex} 
        onReadMore={() => setFullPageOpen(true)} 
        onCopy={handleCopyQuote} 
      />
    );
  };

  return (
    <>
      <UmamiTracker />
      <DustFlow />
      <FollowObjectDown muted={muted} shifted={fullPageOpen} />
      
      <div className="header">
        <h1>{config.title_page}</h1>
        <span id='AlertText'>
          <TopNotifier message={alertText} trigger={notifierTrigger} />
        </span>
        <button onClick={toggleMute} className={`mute-button ${muted ? "sound_off" : ""}`}>
          <FontAwesomeIcon icon={muted ? faVolumeMute : faVolumeUp} className="fa-2x" />
        </button>
      </div>

      {showAdmin && <AdminAddQuote onClose={() => setShowAdmin(false)} />}

      {renderContent()}

      <div className="footer">
        App <a href='https://github.com/coockieHunt/quoteViewerSkull'>quoteViewerSkull</a> Created by <a href="https://jonathangleyze.fr">jonathangleyze.fr</a>
        
        <span 
            onClick={() => setShowAdmin(true)} 
            style={{ 
                cursor: 'pointer', 
                marginLeft: '10px', 
                fontSize: '20px',
                userSelect: 'none' 
            }}
            title="Admin Access"
        >
            π
        </span>
      </div>
    </>
  );
}

export default App;