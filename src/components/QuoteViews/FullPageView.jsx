import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCopy } from "@fortawesome/free-solid-svg-icons";

const FullPageView = ({ data, onClose, onCopy }) => {
  return (
    <div id='QuoteBlock' className='quote-fullpage'>
      <div className="quote-fullpage-content">
        <div className="quote-fullpage-top">
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {data.title && <h2>{data.title}</h2>}
          <button onClick={() => onCopy(data.text || data.quote)}>
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </div>
        <div className='quote-fullpage-text'>
          <p>{data.text || data.quote}</p>
          {data.author && (
            <p style={{ fontStyle: 'italic', marginTop: '1.5rem' }}>— {data.author}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullPageView;