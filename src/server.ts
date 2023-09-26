import { init, server, io } from './app';

const port = process.env.PORT || 5000;

init().then(() => {
  server.listen(port, () => {
    console.log(`Server up in ${port} port!`);
  });
});
