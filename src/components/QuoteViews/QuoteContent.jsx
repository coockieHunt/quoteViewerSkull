import config from '../../config.js';
import { isLongQuote } from '../../utils/quoteHelpers';

const QuoteContent = ({ data, onReadMore, onCopy }) => {
  if (data.type === "quote") {
    if (isLongQuote(data)) {
      return (
        <div>
          <p className='long'>{data.quote.substring(0, config.max_quote_length)}...</p>
          <button className="read-more-btn" onClick={onReadMore}>voir plus</button>
          {data.author && (
            <p style={{ fontStyle: 'italic', marginTop: '1rem', fontSize: '0.9em' }}>
            </p>
          )}
        </div>
      );
    }
    
    return (
      <div>
        <p className='short'>" {data.quote} "</p>
        
        <button 
            className="copy-text-btn" 
            onClick={(e) => {
                e.stopPropagation();
                onCopy(data.quote);
            }} 
        >Copier
        </button>

        {data.author && (
          <p style={{ fontStyle: 'italic', marginTop: '1rem', fontSize: '0.9em' }}>
          </p>
        )}
      </div>
    );
  }
  
  if (data.type === "text") {
    return (
      <div>
        <h2>{data.title}</h2>
        <p className='long'>{data.text.substring(0, config.max_quote_length)}...</p>
        <button className="read-more-btn" onClick={onReadMore}>voir plus</button>
      </div>
    );
  }

  return <span style={{ color: 'red' }}>[Unsupported quote type]</span>;
};

export default QuoteContent;