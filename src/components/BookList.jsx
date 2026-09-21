import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

export default function BookList({ setIsAuthenticated }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/books')
            .then(res => { 
                setBooks(res.data); 
                setLoading(false); 
            })
            .catch(err => { 
                console.error("Failed to load books:", err); 
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await axios.delete(`/books/${id}`);
                setBooks(books.filter(b => b.id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f172a', color: '#38bdf8', fontSize: '1.25rem', fontWeight: '500' }}>
            Loading your library...
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#0f172a', padding: '40px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                
                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
                    <div>
                        <h2 style={{ color: '#f8fafc', margin: '0 0 4px 0', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            📖 Book Dashboard
                        </h2>
                        <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>Manage your personal reading collection</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button 
                            onClick={() => navigate('/add-book')} 
                            style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'background 0.2s', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}
                            onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'}
                            onMouseOut={e => e.currentTarget.style.background = '#2563eb'}
                        >
                            + Add Book
                        </button>
                        <button 
                            onClick={() => { setIsAuthenticated(false); navigate('/'); }} 
                            style={{ background: 'transparent', color: '#f87171', border: '1px solid #f87171', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}
                            onMouseOver={e => { e.currentTarget.style.background = '#f87171'; e.currentTarget.style.color = '#fff'; }}
                            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f87171'; }}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                {books.length === 0 ? (
                    <div style={{ background: '#1e293b', padding: '60px 20px', borderRadius: '12px', textAlign: 'center', border: '1px dashed #334155' }}>
                        <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '0 0 16px 0' }}>Your library is currently empty.</p>
                        <button 
                            onClick={() => navigate('/add-book')} 
                            style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                        >
                            Add Your First Book
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {books.map(book => (
                            <div key={book.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                <div>
                                    <h4 style={{ margin: '0 0 6px 0', color: '#f8fafc', fontSize: '1.2rem' }}>{book.title}</h4>
                                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>
                                        By <strong style={{ color: '#cbd5e1' }}>{book.author}</strong> &bull; <span style={{ background: '#334155', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>{book.genre}</span>
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button 
                                        onClick={() => navigate(`/books/${book.id}`)} 
                                        style={{ background: '#334155', color: '#f8fafc', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', transition: 'background 0.2s' }}
                                        onMouseOver={e => e.currentTarget.style.background = '#475569'}
                                        onMouseOut={e => e.currentTarget.style.background = '#334155'}
                                    >
                                        View
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(book.id)} 
                                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
                                        onMouseOver={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
                                        onMouseOut={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#f87171'; }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}