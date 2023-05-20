import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.get('https://assessment-ochre-nine.vercel.app/api/posts', () => {
      return data;
    });
  },
});

