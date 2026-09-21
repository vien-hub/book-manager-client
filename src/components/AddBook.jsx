import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

export default function AddBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!title.trim() || !author.trim() || !genre.trim()) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        try {
            await axios.post('/books', { title, author, genre });
            navigate('/books');
        } catch (err) {
            console.error('Error saving book:', err.response || err);
            setError('Failed to save the book to the database.');
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', fontFamily: 'sans-serif' }}>
            <form onSubmit={handleSubmit} style={{ background: '#ffffff', padding: '35px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '450px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ color: '#0f172a', marginBottom: '24px' }}>➕ Add New Book</h2>
                {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>{error}</div>}
                
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>BOOK TITLE</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>AUTHOR</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>GENRE</label>
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" disabled={loading} style={{ flex: 1, background: '#3b82f6', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                        {loading ? 'Saving...' : 'Save Book'}
                    </button>
                    <button type="button" onClick={() => navigate('/books')} style={{ background: '#64748b', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                </div>
            </form>
        </div>
    );
}