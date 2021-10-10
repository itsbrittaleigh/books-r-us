import React, { useState } from 'react';
import BookList from './components/bookList';
import Filters from './components/filters';
import booksMock from './data/booksMock';

const App: React.FC = () => {
  const [displayOnlyAvailable, setDisplayOnlyAvailable] = useState(false);

  return (
    <>
      <Filters
        displayOnlyAvailable={displayOnlyAvailable}
        toggleDisplayOnlyAvailable={setDisplayOnlyAvailable}
      />
      <BookList
        books={booksMock}
        displayOnlyAvailable={displayOnlyAvailable}
      />
    </>
  )
};

export default App;
