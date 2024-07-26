const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'apps/**/!(*.stories|*.spec).{ts,html}'),
    join(__dirname, 'libs/**/!(*.stories|*.spec).{ts,html}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
