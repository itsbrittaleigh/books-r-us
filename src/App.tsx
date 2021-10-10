import React from 'react';
import BookList from './components/bookList';
import booksMock from './data/booksMock';

const App: React.FC = () => (
  <>
    <BookList books={booksMock} />
  </>
);

export default App;
