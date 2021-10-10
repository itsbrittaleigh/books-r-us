import React from 'react';

interface Props {
  displayOnlyAvailable: boolean;
  toggleDisplayOnlyAvailable: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters: React.FC<Props> = ({ displayOnlyAvailable, toggleDisplayOnlyAvailable }) => (
  <ul>
    <li>
      <span id="display-available">Display only available</span>
      <button
        aria-checked={displayOnlyAvailable}
        aria-labelledby="display-available"
        role="switch"
        onClick={() => toggleDisplayOnlyAvailable(!displayOnlyAvailable)}
      >
        hello
      </button>
    </li>
  </ul>
);

export default Filters;
