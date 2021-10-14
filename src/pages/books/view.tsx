import React from 'react';
import Header from '../../components/Header';
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
      {book ? (
        <>
          <Header heading="Book details">
            <a href={`/books/${book.id}/edit`} className="button">Edit</a>
          </Header>
          <p>{book.title}</p>
          <p>{book.author}</p>
          <p>{book.isbn}</p>
          <p>{book.inventory}</p>
          <p>{book.category}</p>
          <p>{book.notes}</p>
        </>
      ) : (
        <p>No book with ID # {id} found.</p>
      )}
    </>
  );
};

export default View;
