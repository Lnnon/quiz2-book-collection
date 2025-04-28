import React from "react";

function BookList({ books, onSaveBook, onDeleteBook }) {
  return (
    <div className="book-list">
      {books.map((book, index) => {
        const isUploaded = !book.volumeInfo; // Check if it's an uploaded book
        const title = isUploaded ? book.title : book.volumeInfo.title;
        const authors = isUploaded 
          ? (book.author_name ? book.author_name.join(", ") : "Unknown") 
          : (book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown");
        const publishedDate = isUploaded ? book.first_publish_year : book.volumeInfo.publishedDate || "N/A";
        const thumbnail = isUploaded 
          ? null 
          : (book.volumeInfo.imageLinks?.thumbnail || null);

        return (
          <div className="book-card" key={index}>
            {thumbnail && (
              <img 
                src={thumbnail} 
                alt={title} 
                className="book-thumbnail" 
              />
            )}
            <h3>{title}</h3>
            <p><strong>Author:</strong> {authors}</p>
            <p><strong>Published:</strong> {publishedDate}</p>
            {isUploaded && <span className="success-tag">Uploaded</span>}

            {/* Save Button */}
            {!isUploaded && (
              <button 
                onClick={() => onSaveBook(book)} 
                className="save-btn"
              >
                Save to My Books
              </button>
            )}

            {/* Delete Button (only for saved books) */}
            {isUploaded && (
              <button 
                onClick={() => onDeleteBook(book)} 
                className="delete-btn"
              >
                Delete
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BookList;
