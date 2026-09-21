import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';

export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/books/${id}`)
            .then(res => {
                setBook(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Could not retrieve book details.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Segoe UI' }}>Loading details...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '50px', color: '#991b1b', fontFamily: 'Segoe UI' }}>{error}</div>;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', fontFamily: 'Segoe UI, sans-serif' }}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', width: '100%', maxWidth: '450px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ color: '#0f172a', marginBottom: '20px', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>📖 Book Details</h2>
                
                <div style={{ marginBottom: '16px' }}>
                    <strong style={{ display: 'block', fontSize: '0.80rem', color: '#64748b', textTransform: 'uppercase' }}>Title</strong>
                    <span style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: '600' }}>{book.title}</span>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <strong style={{ display: 'block', fontSize: '0.80rem', color: '#64748b', textTransform: 'uppercase' }}>Author</strong>
                    <span style={{ fontSize: '1rem', color: '#334155' }}>{book.author}</span>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <strong style={{ display: 'block', fontSize: '0.80rem', color: '#64748b', textTransform: 'uppercase' }}>Genre</strong>
                    <span style={{ fontSize: '1rem', color: '#2563eb', fontWeight: '500' }}>{book.genre}</span>
                </div>

                <button onClick={() => navigate('/books')} style={{ width: '100%', background: '#64748b', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                    &larr; Back to Book List
                </button>
            </div>
        </div>
    );
}