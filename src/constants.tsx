export const LOCAL_STORAGE_KEY: string = 'BRU_Books';

export const FORM_FIELDS = [
  {
    label: 'Title',
    name: 'title',
    type: 'text',
    validators: {
      max: 255,
      required: true,
    },
  },
  {
    label: 'Author',
    name: 'author',
    type: 'text',
    validators: {
      max: 255,
      required: true,
    },
  },
  {
    label: 'ISBN',
    name: 'isbn',
    type: 'text',
    validators: {
      max: 255,
      required: true,
      unique: true,
    },
  },
  {
    label: 'Category',
    name: 'category',
    type: 'text',
    validators: {
      max: 255,
      required: true,
    },
  },
  {
    label: 'Inventory',
    name: 'inventory',
    type: 'number',
    validators: {
      max: 255,
      min: 0,
      required: true,
    },
  },
  {
    label: 'Additional notes',
    name: 'notes',
    type: 'textarea',
    validators: {
      max: 255,
    },
  },
];
