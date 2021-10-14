import React from 'react';

interface Props {
  description?: string;
  heading: string;
  children?: React.ReactNode;
};

const Header: React.FC<Props> = ({ children, description, heading }) => (
  <header className="header">
    <div className="wrapper">
      <div className="header--left">
        <h1 className="header__title">{heading}</h1>
        {description && (
          <p className="header__description">{description}</p>
        )}
      </div>
      {children}
    </div>
  </header>
);

export default Header;
