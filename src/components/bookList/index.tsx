import React from 'react';
import BookItem from '../bookItem';

interface Props {
  books: Book[];
}

const BookList: React.FC<Props> = ({ books }) => {
  const alphabetize = function(a: Book, b: Book): number {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA > titleB) {
      return 1;
    }
    
    if (titleA < titleB) {
      return -1;
    }

    return 0;
  };

  return (
    <>
      {books.sort(alphabetize).map((book: Book) => (
        <BookItem
          book={book}
          key={book.id}
        />
      ))}
    </>
  );
};

export default BookList;
