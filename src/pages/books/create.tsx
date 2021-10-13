import React from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
  author: string;
  category: string;
  inventory: number;
  isbn: string;
  notes: string;
  title: string;
};

const Create: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const books: Book[] = JSON.parse(localStorage.getItem('BRU_Books')!);

  const onSubmit = (data: IFormInput) => {
    // get id by finding largest current ID and adding 1
    const id = Math.max.apply(Math, books.map((book: Book) => book.id )) + 1;

    // add data to books array with new id
    books.push({
      ...data,
      // inventory should be an integer, but HTML input treats it as a string
      inventory: parseInt(data.inventory.toString(), 10),
      id,
    });

    // save to localStorage
    localStorage.setItem('BRU_Books', JSON.stringify(books));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input {...register('title', { required: true })} />
        {errors.title && (
          <span>This field is required</span>
        )}
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input {...register('author', { required: true })} />
        {errors.author && (
          <span>This field is required</span>
        )}
      </div>
      <div>
        <label htmlFor="isbn">ISBN</label>
        <input {...register('isbn', { pattern: /^[0-9]{10}$/i })} />
        {errors.isbn && (
          <span>The ISBN must be exactly ten digits.</span>
        )}
      </div>
      <div>
        <label htmlFor="inventory">Inventory</label>
        <input
          type="number"
          {...register('inventory', { min: 0 })}
        />
        {errors.inventory && (
          <span>You cannot have negative inventory.</span>
        )}
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input {...register('category', { required: true })} />
        {errors.category && (
          <span>This field is required.</span>
        )}
      </div>
      <div>
        <label htmlFor="notes">Notes</label>
        <textarea {...register('notes')} />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default Create;
