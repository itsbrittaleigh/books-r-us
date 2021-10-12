import React, { useState } from 'react';

interface Props {
  book: Book;
}

const BookItem: React.FC<Props> = ({
  book: {
    author,
    category,
    inventory,
    isbn,
    notes,
    title,
  },
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div style={{ padding: '20px 0' }}>
      {!isEditing ? (
        <>
          <p>{title} by {author}: {inventory} in stock</p>
          <p>{category}</p>
          <p>{isbn}</p>
          <p>{notes}</p>
          <button
            onClick={() => setIsEditing(true)}
            onKeyDown={() => setIsEditing(true)}
          >
            Edit
          </button>
        </>
      ) : (
        <p>editing</p>
      )}
    </div>
  );
};

export default BookItem;
