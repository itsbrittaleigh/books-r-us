import React, { useState } from 'react';

interface Props {
  book: Book;
}

const BookItem: React.FC<Props> = ({
  book: {
    author,
    category,
    id,
    inventory,
    isbn,
    notes,
    title,
  },
}) => (
  <div style={{ padding: '20px 0' }}>
    <p>{title} by {author}: {inventory} in stock</p>
    <p>{category}</p>
    <p>{isbn}</p>
    <p>{notes}</p>
    <a
      href={`/books/${id}/edit`}
    >
      Edit
    </a>
  </div>
);

export default BookItem;
