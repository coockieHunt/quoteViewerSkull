import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import QuoteContent from './QuoteContent';
import { isLongQuote } from '../../utils/quoteHelpers';

const CompactView = ({ data, index, total, setIndex, onReadMore, onCopy }) => {
  const handleCopy = () => {
    if (data.type === "quote" && !isLongQuote(data)) {
      onCopy(data.quote);
    }
  };

  return (
    <div id='QuoteBlock' className='quote-compact'>
      <button 
        className={`arrowButton ${index <= 0 ? "disabled" : ""}`}
        onClick={() => index > 0 && setIndex(index - 1)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      
      <div id='quoteContainer'>
        <span onClick={handleCopy} style={{ cursor: data.type === "quote" && !isLongQuote(data) ? "pointer" : "default" }}>
          <QuoteContent 
            data={data} 
            onReadMore={onReadMore} 
            onCopy={onCopy} 
          />
        </span>
      </div>

      <button 
        className={`arrowButton ${index >= total - 1 ? "disabled" : ""}`}
        onClick={() => index < total - 1 && setIndex(index + 1)}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default CompactView;