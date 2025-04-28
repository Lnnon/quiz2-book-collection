import React from 'react';

function SavedBooks({ books, onDeleteBook }) {
  return (
    <div className="saved-books-container">
      <h2>Saved Books</h2>
      <div className="saved-books-list">
        {books.map((book) => (
          <div key={book.id} className="saved-book-card">
            <h3>{book.title}</h3>
            <p>{book.authors ? book.authors.join(', ') : 'Unknown Author'}</p>
            <button className="delete-btn" onClick={() => onDeleteBook(book.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedBooks;
