import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import '../styles/quoteBlock.css';

const AdminAddQuote = ({ onClose }) => {
    const [password, setPassword] = useState('');
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('');
    const [mode, setMode] = useState('add');
    const [quotes, setQuotes] = useState([]);
    const [loadingQuotes, setLoadingQuotes] = useState(false);

    const loadQuotes = async () => {
        setLoadingQuotes(true);
        try {
            const { data, error } = await supabase
                .from('quotes')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setQuotes(data || []);
        } catch (error) {
            console.error('Erreur chargement:', error);
        }
        setLoadingQuotes(false);
    };

    useEffect(() => {
        if (mode === 'delete') {
            loadQuotes();
        }
    }, [mode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const { error } = await supabase.rpc('add_new_quote', {
                p_password: password,
                p_quote: quote,
                p_author: author,
            });

            if (error) throw error;

            setStatus('success');
            setQuote('');
            setAuthor('');
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error('Erreur:', error);
            setStatus('error');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    const handleDelete = async (quoteId) => {
        if (!password) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        try {
            const { error } = await supabase.rpc('delete_quote', {
                p_password: password,
                p_quote_id: quoteId
            });

            if (error) throw error;

            setStatus('success');
            loadQuotes(); // Recharger la liste
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error('Erreur:', error);
            setStatus('error');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignContent: "center", 
            backgroundColor: '#fff', 
            padding: '20px', 
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            zIndex: 100000,
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
        }}>
            <button onClick={onClose} style={{alignSelf: 'flex-end', marginBottom: '10px'}}>Fermer</button>
            
            <h2>Administration des citations</h2>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button 
                    onClick={() => setMode('add')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        background: mode === 'add' ? '#333' : '#ccc',
                        color: mode === 'add' ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Ajouter
                </button>
                <button 
                    onClick={() => setMode('delete')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        background: mode === 'delete' ? '#d32f2f' : '#ccc',
                        color: mode === 'delete' ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Supprimer
                </button>
            </div>

            {status === 'success' && <p style={{color: 'green', textAlign: 'center'}}>Opération réussie !</p>}
            {status === 'error' && <p style={{color: 'red', textAlign: 'center'}}>Erreur : Mot de passe incorrect.</p>}

            {mode === 'add' && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        type="password" 
                        placeholder="Mot de passe Admin" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />

                    <textarea 
                        placeholder="La citation..." 
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        style={{...inputStyle, height: '100px', resize: 'vertical'}}
                        required
                    />

                    <input 
                        type="text" 
                        placeholder="Auteur (optionnel)" 
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        style={inputStyle}
                    />

                    <button 
                        type="submit" 
                        style={{ background: '#333', color: '#fff', borderRadius: '4px', padding: '10px', border: 'none', cursor: 'pointer' }}
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Envoi...' : 'Ajouter'}
                    </button>
                </form>
            )}

            {mode === 'delete' && (
                <div>
                    <input 
                        type="password" 
                        placeholder="Mot de passe Admin" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{...inputStyle, marginBottom: '15px'}}
                        required
                    />

                    {loadingQuotes ? (
                        <p>Chargement...</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {quotes.map((q) => (
                                <div key={q.id} style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                   <div style={{ 
                                        flex: 1,
                                        overflow: 'hidden'
                                    }}>
                                        <p style={{ 
                                            margin: '0 0 5px 0', 
                                            fontSize: '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',  
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,        
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {q.content}
                                        </p>
                                        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                                            — {q.author}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(q.id)}
                                        style={{
                                            background: '#d32f2f',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '8px 12px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                        disabled={status === 'loading'}
                                    >Supprimer
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box'
};

export default AdminAddQuote;