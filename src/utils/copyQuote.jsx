import WriteSong from '../assets/write.ogg';
import {PlayOggSound} from './interactSond.jsx';
import config from '../data/config.json';

function copyQuote({quote, muted = false}) {
  navigator.clipboard.writeText(quote).then(() => {
    !muted && PlayOggSound(WriteSong, 1.0, true);
  }).catch(err => {console.error(config.copy_failure_message, err);});
}

export default copyQuote;