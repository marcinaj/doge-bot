import path    from 'path';
import process from 'process';
import dotenv  from 'dotenv';

dotenv.config( { path: path.join( process.cwd(), '.env' ) } );

const config = Object.freeze( Object.seal( {
  mode: process.env.MODE || 'debug',
  log: {
    level  : process.env.LOG_LEVEL              || 'debug',
    console: !!process.env.LOG_TO_CONSOLE.lenth || true   , 
    file   : !!process.env.LOG_TO_FILE.lenth    || true
  },
  http: {
    host: process.env.HTTP_HOST || '127.0.0.1',
    port: process.env.HTTP_PORT || '8080',
  }
} ) );

export default config;
