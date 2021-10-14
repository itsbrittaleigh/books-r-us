import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { LOCAL_STORAGE_KEY } from '../../constants';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
};

const View: React.FC<Props> = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  const books: Book[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
  const book: Book | undefined = books.find((book: Book) => book.id === id);

  return (
    <>
      <Nav />
      {book ? (
        <>
          <Header heading="Book details">
            <a
              className="button"
              href={`/books/${book.id}/edit`}
            >
              <FiEdit2 className="button__icon" />
              Edit
            </a>
          </Header>
          <div className="book-item">
            <div className="wrapper">
              <h2 className="book-item__title">{book.title}</h2>
              <p className="book-item__author">by {book.author}</p>
              {book.inventory <= 0 ? (
                <p className="book-item__oos">Out of stock</p>
              ) : (
                <p className="book-item__is">{book.inventory} books in stock</p>
              )}
              <h3>More details</h3>
              <ul>
                <li>
                  <strong>Genres: </strong>
                  {book.category}
                </li>
                <li>
                  <strong>ISBN: </strong>
                  {book.isbn}
                </li>
                {book.notes && (
                  <li>
                    <strong>Notes from the store: </strong>
                    {book.notes}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <p className="zero-state">
          No book with ID # {id} found.
          <a href="/">&larr; Back to index</a>
        </p>
      )}
    </>
  );
};

export default View;
