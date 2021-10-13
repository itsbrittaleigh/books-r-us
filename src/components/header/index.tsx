import React from 'react';

interface Props {
  description?: string;
  heading: string;
  children?: React.ReactNode;
};

const Header: React.FC<Props> = ({ children, description, heading }) => (
  <header className="header">
    <div className="wrapper">
      <h1 className="header__title">{heading}</h1>
      {description && (
        <p className="header__description">{description}</p>
      )}
      {children}
    </div>
  </header>
);

export default Header;
