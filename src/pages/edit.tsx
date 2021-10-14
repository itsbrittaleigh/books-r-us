import React from 'react';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { LOCAL_STORAGE_KEY } from '../constants';

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

interface FormFields {
  defaultValue: string | number;
  label: string;
  name: string;
  type: string;
  validators?: {};
  validationMessage?: string;
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

  const formFields: FormFields[] = [
    {
      defaultValue: book?.title || '',
      label: 'Title',
      name: 'title',
      type: 'text',
      validators: {
        required: true,
      },
      validationMessage: 'This field is required.',
    },
    {
      defaultValue: book?.author || '',
      label: 'Author',
      name: 'author',
      type: 'text',
      validators: {
        required: true,
      },
      validationMessage: 'This field is required.'
    },
    {
      defaultValue: book?.isbn || '',
      label: 'ISBN',
      name: 'isbn',
      type: 'text',
      validators: {
        required: true,
      },
      validationMessage: 'This field is required',
    },
    {
      defaultValue: book?.inventory || 0,
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
      defaultValue: book?.category || '',
      label: 'Category',
      name: 'category',
      type: 'text',
      validators: {
        required: true,
      },
      validationMessage: 'This field is required',
    },
    {
      defaultValue: book?.notes || '',
      label: 'Additional notes',
      name: 'notes',
      type: 'textarea',
    },
  ];

  return (
    <>
      <Nav />
      {book ? (
        <>
          <Header heading="Edit book information" />
          <div className="wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
              {formFields.map((field) => (
                <div className={errors[field.name] ? 'form-field form-field--error' : 'form-field'}>
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      defaultValue={field.defaultValue}
                      {...register((`${field.name}` as const), { ...field.validators })}
                    />
                  ) : (
                    <input
                      defaultValue={field.defaultValue}
                      type={field.type}
                      {...register((`${field.name}` as const), { ...field.validators })}
                    />
                  )}
                  {errors[field.name] && (
                    <span className="message--error">{field.validationMessage}</span>
                  )}
                </div>
              ))}
              <div className="button__container button__container--right">
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
