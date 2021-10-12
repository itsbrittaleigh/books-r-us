import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BookList from '../components/bookList';
import Filters from '../components/filters';

interface Props {
  books: Book[];
  urlDisplayAvailable: boolean;
  urlFilteredGenres: string[];
};

const Home: React.FC<Props> = ({
  books,
  urlDisplayAvailable,
  urlFilteredGenres,
}) => {
  const [displayOnlyAvailable, setDisplayOnlyAvailable] = useState<boolean>(
    urlDisplayAvailable ? urlDisplayAvailable : false
  );
  const [filteredGenres, setFilteredGenres] = useState<string[]>(
    urlFilteredGenres.length > 0 ? urlFilteredGenres : []
  );
  const history = useHistory();

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

  const buildGenres = function(): string[] {
    const genres: string[] = [];

    books.forEach((book) => {
      if (!genres.includes(book.category)) {
        genres.push(book.category);
      }
    });

    return genres;
  };

  return (
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
  );
};

export default Home;
