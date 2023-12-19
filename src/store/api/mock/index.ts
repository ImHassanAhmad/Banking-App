import { setupWorker } from 'msw/browser';
import handlers from './handlers';

export const worker = setupWorker(...handlers);

worker.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

worker.events.on('unhandledException', (request) => {
  console.log('MSW mocked:', request);
});
