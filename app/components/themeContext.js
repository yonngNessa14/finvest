import React from 'react';

export const themes = {
  light: {
    mode: false,
    icon: 'black',
    primary: 'black',
    background: 'white',
    surface: 'white',
    text: 'black',
  },

  dark: {
    mode: true,
    icon: 'white',
    primary: 'white',
    background: '#222222',
    surface: '#3c3d3d',
    text: 'white',
  },
};

// export const ThemeContext = React.createContext