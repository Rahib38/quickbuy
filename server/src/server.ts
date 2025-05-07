/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';

let server: Server;
const port = 3000

async function main() {
  try {
    server = app.listen(port, () => {
      console.log('Sever is running on port ', port);
    });
  } catch (error) {
    console.log('Server Error', error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
