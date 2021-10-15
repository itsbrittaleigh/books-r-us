import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import BookList from '../components/BookList';
import Filters from '../components/Filters';
import Header from '../components/Header';
import { getAllBooks } from '../services/Book';

interface Props {
  urlDisplayAvailable: boolean;
  urlFilteredGenres: string[];
};

const Home: React.FC<Props> = ({
  urlDisplayAvailable,
  urlFilteredGenres,
}) => {
  const books: Book[] = getAllBooks();
  // default filters based on URL params, if available
  const [displayOnlyAvailable, setDisplayOnlyAvailable] = useState<boolean>(
    urlDisplayAvailable ? urlDisplayAvailable : false
  );
  const [filteredGenres, setFilteredGenres] = useState<string[]>(
    urlFilteredGenres.length > 0 ? urlFilteredGenres : []
  );
  const history = useHistory();

  // update URL parameters when engaging with filters
  useEffect(() => {
    const params = new URLSearchParams();

    if (displayOnlyAvailable) {
      params.append('displayAvailable', 'true');
    } else {
      params.delete('displayAvailable');
    }

    if (filteredGenres.length > 0) {
      params.append('genre', filteredGenres.join('__'));
    } else {
      params.delete('genre');
    }

    history.push({
      search: params.toString(),
    });
  }, [displayOnlyAvailable, filteredGenres, history]);

  // build list of genres from genres on books
  const buildGenres = function(): string[] {
    const genres: string[] = [];

    books && books.forEach((book) => {
      if (!genres.includes(book.category)) {
        genres.push(book.category);
      }
    });

    return genres;
  };

  return (
    <>
      <Header heading="Inventory">
        <a href="/create" className="button">
          <FiPlus className="button__icon" />
          Add book
        </a>
      </Header>
      {books.length > 0 ? (
        <>
          <Filters
            displayOnlyAvailable={displayOnlyAvailable}
            filteredGenres={filteredGenres}
            genres={buildGenres()}
            setFilteredGenres={setFilteredGenres}
            toggleDisplayOnlyAvailable={setDisplayOnlyAvailable}
          />
          <BookList
            books={books}
            displayOnlyAvailable={displayOnlyAvailable}
            filteredGenres={filteredGenres}
          />
        </>
      ) : (
        <p className="zero-state">There are no books in inventory.</p>
      )}
    </>
  );
};

export default Home;
