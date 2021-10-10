import React from 'react';

interface Props {
  book: Book;
}

const BookItem: React.FC<Props> = ({
  book: {
    title,
    author,
    isbn,
    category,
    inventory,
    notes,
  },
}) => (
  <div style={{ padding: '20px 0' }}>
    <p>{title} by {author}: {inventory} in stock</p>
    <p>{category}</p>
    <p>{isbn}</p>
    <p>{notes}</p>
  </div>
);

export default BookItem;
