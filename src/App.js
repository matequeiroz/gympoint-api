import server from './Server';

// init server in port
const app = server.listen(process.env.PORT || 3001);

app.on('listening', () => {
  console.log(`Server running in port: ${process.env.PORT || 3001}`);
});

app.on('error', err => {
  console.log(`Server not running, is have error: ${err}`);
});
