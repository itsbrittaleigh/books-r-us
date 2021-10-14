import React from 'react';
import Checkbox from './Checkbox';
import Toggle from './Toggle';

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
  const toggleGenreIsChecked = function(genre: string): void {
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
  };

  return (
    <section className="filters__container">
      <div className="wrapper">
        <h2>Filter books</h2>
        <ul className="filters__list">
          <li className="filters__list-item">
            <Toggle
              id="display-available"
              isChecked={displayOnlyAvailable}
              onToggle={toggleDisplayOnlyAvailable}
              label="Display available books only?"
            />
          </li>
          <li className="filters__list-item">
            <fieldset>
              <legend>What genres are you looking for?</legend>
              {genres.map((genre: string) => (
                <div className="form-field">
                  <Checkbox
                    id={genre}
                    isChecked={filteredGenres.includes(genre)}
                    onToggle={toggleGenreIsChecked}
                    key={genre}
                    label={genre}
                    value={genre}
                  />
                </div>
              ))}
            </fieldset>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Filters;
