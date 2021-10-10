import React from 'react';

interface Props {
  displayOnlyAvailable: boolean;
  filteredGenres: string[];
  genres: string[];
  setFilteredGenres: React.Dispatch<React.SetStateAction<string[]>>;
  toggleDisplayOnlyAvailable: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters: React.FC<Props> = ({
  displayOnlyAvailable,
  filteredGenres,
  genres,
  setFilteredGenres,
  toggleDisplayOnlyAvailable,
}) => {
  const updateGenres = function(genre: string): void {
    const updatedGenreList = [...filteredGenres];

    if (!filteredGenres.includes(genre)) {
      updatedGenreList.push(genre);
    } else {
      const index = updatedGenreList.indexOf(genre);
      if (index > -1) {
        updatedGenreList.splice(index, 1);
      }
    }

    setFilteredGenres(updatedGenreList);
  }

  return (
    <ul>
      <li>
        <span id="display-available">Display only available</span>
        <button
          aria-checked={displayOnlyAvailable}
          aria-labelledby="display-available"
          role="switch"
          onClick={() => toggleDisplayOnlyAvailable(!displayOnlyAvailable)}
        >
          toggle
        </button>
      </li>
      <li>
        <fieldset>
          <legend>What genres are you looking for?</legend>
          {genres.map((genre: string) => (
            <div key={genre}>
              <input id={genre} type="checkbox" onChange={() => updateGenres(genre)} />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </fieldset>
      </li>
    </ul>
  )
};

export default Filters;
