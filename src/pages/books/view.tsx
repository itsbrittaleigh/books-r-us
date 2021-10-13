import React from 'react';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
};

const View: React.FC<Props> = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  const books: Book[] = JSON.parse(localStorage.getItem('BRU_Books')!);
  const book: Book | undefined = books.find((book: Book) => book.id === id);

  return (
    <>
      {book ? (
        <>
          <p>{book.title}</p>
          <p>{book.author}</p>
          <p>{book.isbn}</p>
          <p>{book.inventory}</p>
          <p>{book.category}</p>
          <p>{book.notes}</p>
          <a href={`/books/${book.id}/edit`}>Edit</a>
        </>
      ) : (
        <p>No book with ID # {id} found.</p>
      )}
    </>
  );
};

export default View;
