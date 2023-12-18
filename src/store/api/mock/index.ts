import { setupWorker } from 'msw/browser';
import { onBoardMockApiHandler } from './handlers';

export const worker = setupWorker(...onBoardMockApiHandler);

worker.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

worker.events.on('unhandledException', (request) => {
  console.log('MSW mocked:', request);
});
