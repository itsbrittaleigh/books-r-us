import booksMock from '../data/booksMock';
import { LOCAL_STORAGE_KEY } from '../constants';

export const getAllBooks = () => {
  // get all books from localStorage or load them in from the mock data if they aren't already there
  if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
  } else {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(booksMock));
    return booksMock;
  }
};

export const removeBookById = (id: number) => {
  const books = getAllBooks();
  const index = books.findIndex((book: Book) => book.id === id);
  if (index > -1) {
    books.splice(index, 1);
  }

  return Promise.resolve(localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books)));
};

export const getBookById = (id: number) => {
  const books = getAllBooks();
  return books.find((book: Book) => book.id === id);
};

export const createBooks = (booksToAdd: Book[]) => {
  const books = getAllBooks();
  // IDs should be unique, so find largest existing ID and add 1
  const nextId = Math.max.apply(Math, books.map((book: Book) => book.id )) + 1;

  booksToAdd.forEach((book: Book, idx: number) => {
    // inventory should be an integer, but HTML number input treats it as a string
    book.inventory = parseInt(book.inventory.toString(), 10);
    book.id = nextId + idx;
  });

  books.push(...booksToAdd);

  return Promise.resolve(localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books)));
};

export const updateBookById = (id: number, newData: Book) => {
  const books = getAllBooks();
  // remove book from books array
  const index = books.findIndex((book: Book) => book.id === id);
  if (index > -1) {
    books.splice(index, 1);
  }

  // add data to books array
  books.push({
    ...newData,
    // inventory should be an integer, but HTML number input treats it as a string
    inventory: parseInt(newData.inventory.toString(), 10),
  });

  // save to localStorage
  return Promise.resolve(localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books)));
};

// used to ensure uniqueness of ISBNs on create/edit
export const getAllIsbns = () => {
  const books = getAllBooks();
  const isbns: string[] = [];

  books.forEach((book: Book) => isbns.push(book.isbn));

  return isbns;
};
