import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import DeleteModal from './DeleteModal';
import { removeBookById } from '../services/Book';

interface Props {
  book: Book;
}

const BookItem: React.FC<Props> = ({
  book: {
    author,
    id,
    inventory,
    title,
  },
}) => {
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState<boolean>(false);

  const deleteBook = (): void => {
    removeBookById(id)
      .then(() => {
        window.scrollTo(0, 0);
        window.location.reload();
      });
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
      <DeleteModal
        display={displayConfirmationModal}
        setDisplay={setDisplayConfirmationModal}
        title={title}
        deleteBook={deleteBook}
      />
    </>
  );
};

export default BookItem;
