import {createContext} from 'react';

export const theme = {
  dark: {
    backgroundColor: '#000',
    color: '#e0e0e0',
    sidebarBackgroundColor: '#333',
    dividerColor: '#555',
  },
  light: {
    backgroundColor: '#fdf5e6',
    color: '#000',
    sidebarBackgroundColor: '#fae7c2',
    dividerColor: '#ddd',
  },
};

export const userPreferencesTheme = {
  fontSize: 20,
  fontFamily: 'TaameyFrankCLM',
  theme: theme.light,
};

export const UserPreferencesContext = createContext(userPreferencesTheme);
