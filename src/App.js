import React, { useState, useEffect } from "react";
import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import PictureUploader from './components/PictureUploader';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("harry potter");
  const [page, setPage] = useState(1);
  const [uploadedBooks, setUploadedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const booksPerPage = 10;

  // Load uploaded books from localStorage
  useEffect(() => {
    const savedBooks = localStorage.getItem("uploadedBooks");
    if (savedBooks) {
      setUploadedBooks(JSON.parse(savedBooks));
    }
  }, []);

  // Save uploaded books to localStorage
  useEffect(() => {
    localStorage.setItem("uploadedBooks", JSON.stringify(uploadedBooks));
  }, [uploadedBooks]);

  // Fetch books from Google Books API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const startIndex = (page - 1) * booksPerPage;
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${booksPerPage}`);
        const data = await res.json();
        setBooks(data.items || []); // Fallback if no results
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
      setLoading(false);
    };
    fetchBooks();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handleSaveBook = (book) => {
    const newUploadedBooks = [...uploadedBooks, book];
    setUploadedBooks(newUploadedBooks);
  };

  const handleDeleteBook = (bookToDelete) => {
    const updatedBooks = uploadedBooks.filter(book => book.id !== bookToDelete.id);
    setUploadedBooks(updatedBooks);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Book Burner Library 📚</h1>
        <h3>Are you still there?</h3>
        <h3>Great let's find your favorite book!</h3>
        <SearchBar onSearch={handleSearch} />
        <PictureUploader />
      </div>
      
      <h2>Search Results:</h2>
      {loading ? <p>Loading books...</p> : <BookList books={[...uploadedBooks, ...books]} onSaveBook={handleSaveBook} />}
      <Pagination page={page} setPage={setPage} />
    
      <div className="saved-books-container">
        <h2>Saved Books:</h2>
        <div className="saved-books-list">
          {uploadedBooks.map((book, index) => {
            const title = book.volumeInfo ? book.volumeInfo.title : book.title;
            const authors = book.volumeInfo && book.volumeInfo.authors 
              ? book.volumeInfo.authors.join(", ") 
              : "Unknown";
            return (
              <div key={index} className="saved-book-card">
                <h3>{title}</h3>
                <p>by {authors}</p>
                <button onClick={() => handleDeleteBook(book)} className="delete-btn">
                  Delete
                </button>
              </div>
            );
          })}
        </div>

        
      </div>
    </div>
  );
}

export default App;
