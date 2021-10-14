import React from 'react';
import BookItem from './BookItem';

interface Props {
  books: Book[];
  displayOnlyAvailable: boolean;
  filteredGenres: [] | string[];
};

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

const BookList: React.FC<Props> = ({
  books,
  displayOnlyAvailable,
  filteredGenres,
}) => (
  <div className="wrapper">
    {books
      .sort(alphabetize)
      .filter((book: Book) => displayOnlyAvailable ? book.inventory > 0 : true)
      .filter((book: Book) => filteredGenres.length > 0 ? (filteredGenres as string[]).includes(book.category) : true)
      .map((book: Book) => (
        <BookItem
          book={book}
          key={book.id}
        />
      ))
    }
  </div>
);

export default BookList;
