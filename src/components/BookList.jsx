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
                setLoading(false); // Fixes the infinite loading screen if backend is unreachable
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

    if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem', color: '#fff' }}>Loading books...</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: '#fff' }}>📚 Book List</h2>
                <div>
                    <button onClick={() => navigate('/add-book')} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', marginRight: '10px', cursor: 'pointer', fontWeight: '600' }}>+ Add Book</button>
                    <button onClick={() => { setIsAuthenticated(false); navigate('/'); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Logout</button>
                </div>
            </div>
            {books.length === 0 ? <p style={{ color: '#fff' }}>No books available.</p> : books.map(book => (
                <div key={book.id} style={{ background: '#fff', padding: '16px', borderRadius: '8px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                    <div>
                        <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>{book.title}</h4>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>By {book.author} | <em>{book.genre}</em></p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => navigate(`/books/${book.id}`)} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>View</button>
                        <button onClick={() => handleDelete(book.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}