const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'apps/**/!(*.stories|*.spec).{ts,html}'),
    join(__dirname, 'libs/**/!(*.stories|*.spec).{ts,html}'),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          lighter: '#fcd34d',
          light: '#fbbf24',
          main: '#f59e0b',
          dark: '#d97706',
          darker: '#b45309',
        },
        secondary: {
          lighter: '#c4b5fd',
          light: '#a78bfa',
          main: '#8b5cf6',
          dark: '#7c3aed',
          darker: '#6d28d9',
        },
      },
    },
  },
  plugins: [],
};
