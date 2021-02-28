import { createContext } from 'react';

export const bookSettings = {
  pagingEnabled: true,
};

export const BookContext = createContext(bookSettings);
