import React from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header';
import { LOCAL_STORAGE_KEY } from '../../constants';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
};

interface IFormInput {
  author: string;
  category: string;
  inventory: number;
  isbn: string;
  notes: string;
  title: string;
};

const Edit: React.FC<Props> = ({ match }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const id = parseInt(match.params.id, 10);
  const books: Book[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
  const book: Book | undefined = books.find((book: Book) => book.id === id);

  const onSubmit = (data: IFormInput) => {
    // remove book from books array
    const index = books.findIndex((book) => book.id === id);
    if (index > -1) {
      books.splice(index, 1);
    }

    // add data to books array with current id
    books.push({
      ...data,
      // inventory should be an integer, but HTML input treats it as a string
      inventory: parseInt(data.inventory.toString(), 10),
      id,
    });

    // save to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  };

  return (
    <>
      {book ? (
        <>
          <Header heading="Edit book information" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                defaultValue={book.title}
                {...register('title', { required: true })}
              />
              {errors.title && (
                <span>This field is required</span>
              )}
            </div>
            <div>
              <label htmlFor="author">Author</label>
              <input
                defaultValue={book.author}
                {...register('author', { required: true })}
              />
              {errors.author && (
                <span>This field is required</span>
              )}
            </div>
            <div>
              <label htmlFor="isbn">ISBN</label>
              <input
                defaultValue={book.isbn}
                {...register('isbn', { pattern: /^[0-9]{10}$/i })}
              />
              {errors.isbn && (
                <span>The ISBN must be exactly ten digits.</span>
              )}
            </div>
            <div>
              <label htmlFor="inventory">Inventory</label>
              <input
                defaultValue={book.inventory}
                type="number"
                {...register('inventory', { min: 0 })}
              />
              {errors.inventory && (
                <span>You cannot have negative inventory.</span>
              )}
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                defaultValue={book.category}
                {...register('category', { required: true })}
              />
              {errors.category && (
                <span>This field is required.</span>
              )}
            </div>
            <div>
              <label htmlFor="notes">Notes</label>
              <textarea
                defaultValue={book.notes?.toString()}
                {...register('notes')}
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </>
      ) : (
        <p>No book with ID # {id} found.</p>
      )}
    </>
  );
};

export default Edit;