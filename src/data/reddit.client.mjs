import ClientApi from 'snoowrap';
import cfg       from './reddit.config.mjs';

let CLIENT_CONFIG = null;
let CLIENT        = null;

export default class RedditClient 
{
  static get client() { return CLIENT;        }
  static get config() { return CLIENT_CONFIG; }

  static init()
  {
    if( !CLIENT )
    {
      CLIENT_CONFIG = {
        userAgent    : cfg.userAgent    ,
        clientId     : cfg.clientId     ,
        clientSecret : cfg.clientSecret ,
        refreshToken : cfg.refreshToken ,
      };
      if(
        cfg.userAgent   .length == 0 || cfg.clientId    .length == 0 || 
        cfg.clientSecret.length == 0 || cfg.refreshToken.length == 0
      ){
        console.error( 'invalid reddit configuration' );
        console.log( { reddit_config : CLIENT_CONFIG } );
      }
      else
      {
        console.log( { reddit_config : CLIENT_CONFIG } );
        CLIENT = new ClientApi( CLIENT_CONFIG );
      }
    }
    return this;
  }
}
