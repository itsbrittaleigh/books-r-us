import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

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

const Create: React.FC = () => {
  const books = JSON.parse(localStorage.getItem('BRU_Books')!);
  const nextId = Math.max.apply(Math, books.map((book: Book) => book.id )) + 1;

  const { control, formState: { errors }, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      books: [{
        author: '',
        category: '',
        inventory: 0,
        isbn: '',
        notes: '',
        title: '',
      }],
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

    localStorage.setItem('BRU_Books', JSON.stringify(books));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <section key={field.id}>
              <div className={errors?.books?.[index]?.title ? 'form__field form__field--error' : 'form__field'}>
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
              <div className={errors?.books?.[index]?.author ? 'form__field form__field--error' : 'form__field'}>
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
              <div className={errors?.books?.[index]?.isbn ? 'form__field form__field--error' : 'form__field'}>
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
              <div className={errors?.books?.[index]?.inventory ? 'form__field form__field--error' : 'form__field'}>
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
              <div className={errors?.books?.[index]?.category ? 'form__field form__field--error' : 'form__field'}>
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
              <div className="form__field">
                <label htmlFor={`books.${index}.notes`}>Notes</label>
                <textarea {...register(`books.${index}.notes` as const)} />
              </div>
              <button type="button" onClick={() => remove(index)}>
                Delete book
              </button>
            </section>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              author: '',
              category: '',
              inventory: 0,
              isbn: '',
              notes: '',
              title: '',
            })
          }
        >
          Add another book
        </button>
        <button type="submit">Create book{fields.length > 1 ? 's' : ''}</button>
      </form>
    </div>
  );
};

export default Create;
