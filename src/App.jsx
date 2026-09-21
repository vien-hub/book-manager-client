import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/books" element={isAuthenticated ? <BookList setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" replace />} />
                <Route path="/add-book" element={isAuthenticated ? <AddBook /> : <Navigate to="/" replace />} />
                <Route path="/books/:id" element={isAuthenticated ? <BookDetails /> : <Navigate to="/" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}