import React, { useState } from 'react';
import Modal from './Modal';
import { LOCAL_STORAGE_KEY } from '../constants';

interface Props {
  book: Book;
}

const BookItem: React.FC<Props> = ({
  book: {
    author,
    category,
    id,
    inventory,
    isbn,
    notes,
    title,
  },
}) => {
  const books: Book[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState<boolean>(false);

  const deleteBook = (): void => {
    const index = books.findIndex((book: Book) => book.id === id);
    if (index > -1) {
      books.splice(index, 1);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));

    // refresh page to show updated list
    window.location.reload();
  };

  return (
    <>
      <div style={{ padding: '20px 0' }}>
        <p>{title} by {author}: {inventory} in stock</p>
        <a href={`/books/${id}`}>View details</a>
        <a
          href={`/books/${id}/edit`}
        >
          Edit
        </a>
        <button
          onClick={() => setDisplayConfirmationModal(true)}
          onKeyDown={() => setDisplayConfirmationModal(true)}
        >
          Delete
        </button>
      </div>
      <Modal isVisible={displayConfirmationModal}>
        <p>Are you sure you want to delete {title}?</p>
        <button
          onClick={() => setDisplayConfirmationModal(false)}
          onKeyDown={() => setDisplayConfirmationModal(false)}
        >
          Cancel
        </button>
        <button
          onClick={deleteBook}
          onKeyDown={deleteBook}
        >
          Delete
        </button>
      </Modal>
    </>
  );
};

export default BookItem;
