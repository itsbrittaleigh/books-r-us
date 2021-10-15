import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages';
import CreateBook from './pages/create';
import EditBook from './pages/edit';
import ViewBook from './pages/view';
import booksMock from './data/booksMock';
import { LOCAL_STORAGE_KEY } from './constants';
import "./styles/app.scss";

const App: React.FC = () => {
  const params = (new URL(`${document.location}`)).searchParams;

  // if localStorage has not been populated with books yet, populate it with the mock data
  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(booksMock));
    }
    // empty dependency array because we do not want this to trigger re-render in an infinite loop
  }, []);

  // URL parameters are used to persist data on refresh or direct link access
  const urlDisplayAvailable: boolean = !!params.get('displayAvailable');
  const urlFilteredGenres: string[] | undefined = params.get('genre') ? params.get('genre')?.split('__') : [];

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home
            urlDisplayAvailable={urlDisplayAvailable}
            urlFilteredGenres={urlFilteredGenres || []}
          />
        </Route>
        <Route exact path="/create" component={CreateBook} />
        <Route exact path="/:id" component={ViewBook} />
        <Route exact path="/:id/edit" component={EditBook} />
      </Switch>
    </Router>
  );
};

export default App;
