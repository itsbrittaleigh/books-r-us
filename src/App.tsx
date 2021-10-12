import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages';
import booksMock from './data/booksMock';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(booksMock);
  const localStorageKey = 'BRU_Books';
  const params = (new URL(`${document.location}`)).searchParams;

  useEffect(() => {
    if (localStorage.getItem(localStorageKey)) {
      setBooks(JSON.parse(localStorage.getItem(localStorageKey)!));
    } else {
      localStorage.setItem(localStorageKey, JSON.stringify(books));
    }
    // empty dependency array because we do not want this to trigger re-render in an infinite loop
  }, []);

  const urlDisplayAvailable: boolean = !!params.get('displayAvailable');
  const urlFilteredGenres: string[] | undefined = params.get('genre') ? params.get('genre')?.split('__') : [];

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home
            books={books}
            urlDisplayAvailable={urlDisplayAvailable}
            urlFilteredGenres={urlFilteredGenres || []}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
