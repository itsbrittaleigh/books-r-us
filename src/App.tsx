import React, { useState } from 'react';
import BookList from './components/bookList';
import Filters from './components/filters';
import booksMock from './data/booksMock';

const App: React.FC = () => {
  const [displayOnlyAvailable, setDisplayOnlyAvailable] = useState<boolean>(false);
  const [filteredGenres, setFilteredGenres] = useState<string[]>([]);

  const genres: string[] = [];
  booksMock.forEach((book) => {
    if (!genres.includes(book.category)) {
      genres.push(book.category);
    }
  })

  return (
    <>
      <Filters
        displayOnlyAvailable={displayOnlyAvailable}
        filteredGenres={filteredGenres}
        genres={genres}
        setFilteredGenres={setFilteredGenres}
        toggleDisplayOnlyAvailable={setDisplayOnlyAvailable}
      />
      <BookList
        books={booksMock}
        displayOnlyAvailable={displayOnlyAvailable}
        filteredGenres={filteredGenres}
      />
    </>
  )
};

export default App;
