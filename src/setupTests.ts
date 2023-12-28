/* eslint-disable @typescript-eslint/ban-types */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { createMocks } from 'react-idle-timer';
import { setupServer } from 'msw/node';
import handlers from './store/api/mock/handlers';

const server = setupServer(...handlers);

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

server.events.on('unhandledException', (request) => {
  console.log('MSW mocked:', request);
});

beforeAll(() => {
  createMocks();
  server.listen({ onUnhandledRequest: 'bypass' });
});
afterEach(() => {
  jest.useRealTimers();
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

// eslint-disable-next-line @typescript-eslint/no-namespace
declare module globalThis {
  let IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

export { server };
