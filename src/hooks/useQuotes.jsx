import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export const useQuotes = () => {
	const [quotes, setQuotes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchQuotes();
	}, []);

	const fetchQuotes = async () => {
		try {
			setLoading(true);
			setError(null);

			const { data, error } = await supabase
				.from('quotes')
				.select('*')
				.order('id', { ascending: true });

			if (error) {
				throw error;
			}

			const transformedData = data?.map(item => ({
				type: 'quote',
				quote: item.content,
				author: item.author
			})) || [];

			setQuotes(transformedData);
		} catch (err) {
			console.error('Error fetching quotes:', err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { quotes, loading, error, refetch: fetchQuotes };
};
