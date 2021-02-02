import hapi   from '@hapi/hapi';
import config from './config.mjs';
import log    from './logging.mjs';
import events from './events.mjs';
import api    from './api/api.mjs';

let SERVER = null;

export default class http 
{
  static get server() { return SERVER; }
  
  static async init()
  {
    if( SERVER == null )
    {
      SERVER = hapi.server({
        host : config.host,
        port : config.port,
      });
      
      await SERVER.start();
      
      log.info( `Server running on ${ SERVER.info.uri }` );
      
      SERVER.route({
        method : 'GET',
        path   : '/',
        handler: () => 'Hello. Yes, this is doge-bot.'
      });
      
      SERVER.route({
        method : ['GET', 'POST'],
        path   : '/command',
        handler: async( request, h )=>{ 
          try 
          {
            return JSON.stringify( await api.execute( JSON.parse( request.query.data ) ) ); 
          }
          catch( error )
          {
            return JSON.stringify( { status: 'failed', message: `${error}` } );
          }
        }
      });
      
      //events.emit( 'HTTP_READY' );
    }
    return http;
  }
}
