import config from '../data/config.json';

export const isLongQuote = (q) => {
    return q?.type === 'quote' && (q.quote?.length || 0) > config.max_quote_length;
};