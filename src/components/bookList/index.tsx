import React from 'react';
import BookItem from '../bookItem';

interface Props {
  books: Book[];
  displayOnlyAvailable: boolean;
}

const BookList: React.FC<Props> = ({ books, displayOnlyAvailable }) => {
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
      {books
        .sort(alphabetize)
        .filter((book: Book) => displayOnlyAvailable ? book.inventory > 0 : true)
        .map((book: Book) => (
          <BookItem
            book={book}
            key={book.id}
          />
        ))
      }
    </>
  );
};

export default BookList;
