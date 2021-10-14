import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
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
      <div className="book-item">
        <div className="book-item__header">
          <div className="book-item__header--left">
            <h3 className="book-item__title">{title}</h3>
            <p className="book-item__author">by {author}</p>
          </div>
          <div className="book-item__actions">
            <a
              className="button button--alternate"
              href={`/${id}/edit`}
            >
              <FiEdit2 />
            </a>
            <button
              className="button button--alternate button--delete"
              onClick={() => setDisplayConfirmationModal(true)}
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
        {inventory <= 0 && (
          <p className="book-item__oos">Out of stock</p>
        )}
        <a
          className="book-item__view-details"
          href={`/${id}`}
        >
          View details &rarr;
        </a>
      </div>
      <Modal isVisible={displayConfirmationModal}>
        <p>Are you sure you want to delete {title}?</p>
        <button
          onClick={() => setDisplayConfirmationModal(false)}
        >
          Cancel
        </button>
        <button onClick={deleteBook}>
          Delete
        </button>
      </Modal>
    </>
  );
};

export default BookItem;
