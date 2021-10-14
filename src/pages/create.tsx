import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { FiTrash2 } from 'react-icons/fi';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { LOCAL_STORAGE_KEY } from '../constants';

type FormValues = {
  books: {
    author: string;
    category: string;
    inventory: number;
    isbn: string;
    notes: string;
    title: string;
    id: number;
  }[];
};

const defaultValues = {
  author: '',
  category: '',
  inventory: 0,
  isbn: '',
  notes: '',
  title: '',
};

const Create: React.FC = () => {
  const books = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
  const nextId = Math.max.apply(Math, books.map((book: Book) => book.id )) + 1;

  const { control, formState: { errors }, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      books: [{ ...defaultValues }],
    },
    mode: 'onBlur',
  });
  const { fields, append, remove } = useFieldArray({
    name: 'books',
    control,
  });

  const onSubmit = (data: FormValues) => {
    const booksToAdd = data.books;

    booksToAdd.forEach((book, idx) => {
      // convert inventories to numbers
      book.inventory = parseInt(book.inventory.toString(), 10);
      // add IDs
      book.id = nextId + idx;
    });

    books.push(...booksToAdd);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  };

  return (
    <>
      <Nav />
      <Header
        description="Add a book or several to the Books-R-Us inventory."
        heading="Add books"
      />
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <section key={field.id}>
              <div className={errors?.books?.[index]?.title ? 'form-field form-field--error' : 'form-field'}>
                <label htmlFor={`books.${index}.title`}>Title</label>
                <input
                  {...register(
                    `books.${index}.title` as const,
                    {
                      required: true,
                    },
                  )}
                  type="text"
                />
                {errors?.books?.[index]?.title && (
                  <span>This field is required.</span>
                )}
              </div>
              <div className={errors?.books?.[index]?.author ? 'form-field form-field--error' : 'form-field'}>
                <label htmlFor={`books.${index}.author`}>Author</label>
                <input
                  {...register(
                    `books.${index}.author` as const,
                    {
                      required: true,
                    }
                  )}
                  type="text"
                />
                {errors?.books?.[index]?.author && (
                  <span>This field is required.</span>
                )}
              </div>
              <div className={errors?.books?.[index]?.isbn ? 'form-field form-field--error' : 'form-field'}>
                <label htmlFor={`books.${index}.isbn`}>ISBN</label>
                <input
                  {...register(
                    `books.${index}.isbn` as const,
                    {
                      required: true,
                      pattern: /^[0-9]{10}$/i,
                    })}
                  type="text"
                />
                {errors?.books?.[index]?.isbn && (
                  <span>Your ISBN must be 10 digits.</span>
                )}
              </div>
              <div className={errors?.books?.[index]?.inventory ? 'form-field form-field--error' : 'form-field'}>
                <label htmlFor={`books.${index}.inventory`}>Inventory</label>
                <input
                  {...register(
                    `books.${index}.inventory` as const,
                    {
                      required: true,
                      min: 0,
                    })}
                  type="number"
                />
                {errors?.books?.[index]?.inventory && (
                  <span>You cannot have negative inventory.</span>
                )}
              </div>
              <div className={errors?.books?.[index]?.category ? 'form-field form-field--error' : 'form-field'}>
                <label htmlFor={`books.${index}.category`}>Category</label>
                <input
                  {...register(
                    `books.${index}.category` as const,
                    {
                      required: true,
                    })}
                  type="text"
                />
                {errors?.books?.[index]?.category && (
                  <span>This field is required.</span>
                )}
              </div>
              <div className="form-field">
                <label htmlFor={`books.${index}.notes`}>Notes</label>
                <textarea {...register(`books.${index}.notes` as const)} />
              </div>
              <div className="button__container--right">
                <button
                  className="button button--alternate button--delete"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </section>
          ))}
          <div className="button__container button__container--right">
            <button
              className="button--link"
              type="button"
              onClick={() =>
                append([{ ...defaultValues }])
              }
            >
              Add another book
            </button>
            <button className="button" type="submit">
              Create book{fields.length > 1 ? 's' : ''}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
