import server from './config/server';
import './config/database';

const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m',`[salvae] We're live on port ${PORT}`);
});