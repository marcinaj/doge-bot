import winston from 'winston';
import config  from '../config.mjs';

let LOG_LEVEL = 'error';

switch( config.log.level )
{
  case 'error'   : LOG_LEVEL = 'error'  ; break;
  case 'warn'    : LOG_LEVEL = 'warn'   ; break;
  case 'info'    : LOG_LEVEL = 'info'   ; break;
  case 'http'    : LOG_LEVEL = 'http'   ; break;
  case 'verbose' : LOG_LEVEL = 'verbose'; break;
  case 'debug'   : LOG_LEVEL = 'debug'  ; break;
  case 'silly'   : LOG_LEVEL = 'silly'  ; break;
  default        : 
    console.error( `invalid log level '${ config.log.level }'` ); 
    console.error( `using defualt log level 'error'` ); 
    LOG_LEVEL = 'error';
    break;
}

const LOGGER = winston.createLogger( {
  level : LOG_LEVEL,
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: `error${Date.now()}.log`, level: 'error' }),
    new winston.transports.File({ filename: `log${Date.now()}.log` }),
  ],
} );

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if( config.mode !== 'production' ) 
{
  LOGGER.add( new winston.transports.Console( { format: winston.format.simple() } ) );
}

export default LOGGER;
