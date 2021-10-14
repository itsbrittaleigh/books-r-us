import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { FiTrash2 } from 'react-icons/fi';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { LOCAL_STORAGE_KEY } from '../../constants';

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

interface FormFields {
  label: string;
  name: string;
  type: string;
  validators?: {};
  validationMessage?: string;
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
  });
  const { fields, append, remove } = useFieldArray({
    name: 'books',
    control,
  });

  const formFields = [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      validators: {
        required: true,
      },
      validationMessage: 'This field is required.',
    },
    {
      label: 'Author',
      name: 'author',
      type: 'text',
      validators: {
        required: true,
      },
      validationMessage: 'This field is required.'
    },
    {
      label: 'ISBN',
      name: 'isbn',
      type: 'text',
      validators: {
        required: true,
      },
      validationMessage: 'This field is required',
    },
    {
      label: 'Inventory',
      name: 'inventory',
      type: 'number',
      validators: {
        required: true,
        min: 0,
      },
      validationMessage: 'You cannot have negative inventory',
    },
    {
      label: 'Category',
      name: 'category',
      type: 'text',
      validators: {
        required: true,
      },
      validationMessage: 'This field is required',
    },
    {
      label: 'Additional notes',
      name: 'notes',
      type: 'textarea',
    },
  ];

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
              <h2>Book #{index + 1}</h2>
              {formFields.map((fField) => (
                <div className={errors?.books?.[index]?.[fField.name] ? 'form-field form-field--error' : 'form-field'}>
                  <label htmlFor={`books.${index}.title`}>{fField.label}</label>
                  {fField.type === 'textarea' ? (
                    <textarea {...register(`books.${index}.${[fField.name]}` as const)} />
                  ) : (
                    <input
                      {...register(`books.${index}.${fField.name}` as const, { ...fField.validators })}
                      type={fField.type}
                    />
                  )}
                  {errors?.books?.[index]?.title && (
                    <span>{fField.validationMessage}</span>
                  )}
                </div>
              ))}
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
