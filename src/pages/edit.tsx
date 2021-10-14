import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { getBookById, removeBookById, updateBookById } from '../services/Book';

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
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const id = parseInt(match.params.id, 10);
  const book = getBookById(id);

  const deleteBook = (): void => {
    removeBookById(id).then(() => {
      window.scrollTo(0, 0);
      history.push('/');
    });
  };

  const onSubmit = (data: IFormInput) => {
    const newData = { ...data, id };

    updateBookById(id, newData)
      .then(() => {
        window.scrollTo(0, 0);
        history.push('/');
      });
  };

  return (
    <>
      <Nav />
      {book ? (
        <>
          <Header heading="Edit book information" />
          <div className="wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={errors.title ? 'form-field form-field--error' : 'form-field'}>
                <label htmlFor="title">Title</label>
                <input
                  defaultValue={book.title}
                  {...register('title', { required: true })}
                  type="text"
                />
                {errors.title && (
                  <span className="message--error">This field is required.</span>
                )}
              </div>
              <div className={errors.author ? 'form-field form-field--error' : 'form-field'}>
                <label htmlFor="author">Author</label>
                <input
                  defaultValue={book.author}
                  {...register('author', { required: true })}
                  type="text"
                />
                {errors.author && (
                  <span className="message--error">This field is required.</span>
                )}
              </div>
              <div className={errors.isbn ? 'form-field form-field--error' : 'form-field'}>
                <label htmlFor="isbn">ISBN</label>
                <input
                  defaultValue={book.isbn}
                  {...register('isbn', { required: true })}
                  type="text"
                />
                {errors.isbn && (
                  <span className="message--error">This field is required.</span>
                )}
              </div>
              <div className={errors.inventory ? 'form-field form-field--error' : 'form-field'}>
                <label htmlFor="inventory">Inventory</label>
                <input
                  defaultValue={book.inventory}
                  {...register('inventory', { min: 0 })}
                  type="number"
                />
                {errors.inventory && (
                  <span className="message--error">You cannot have negative inventory.</span>
                )}
              </div>
              <div className={errors.category ? 'form-field form-field--error' : 'form-field'}>
                <label htmlFor="category">Category</label>
                <input
                  defaultValue={book.category}
                  {...register('category', { required: true })}
                  type="text"
                />
                {errors.category && (
                  <span className="message--error">This field is required.</span>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="notes">Notes</label>
                <textarea
                  defaultValue={book.notes?.toString()}
                  {...register('notes')}
                />
              </div>
              <div className="button__container button__container--right">
                <button
                  className="button--link button--delete"
                  type="button"
                  onClick={deleteBook}
                >
                  Delete
                </button>
                <button className="button" type="submit">Update</button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <p>No book with ID # {id} found.</p>
      )}
    </>
  );
};

export default Edit;
