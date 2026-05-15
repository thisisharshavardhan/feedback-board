import { config } from './src/config/env';
import { runMigrations } from './src/db/migrate';
import { createApp } from './app';

runMigrations();

const app = createApp();

app.listen(config.port, () => {
  console.log(`[server] Listening on http://localhost:${config.port}`);
});
