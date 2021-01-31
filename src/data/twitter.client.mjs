import ClientApi from 'twitter';
import cfg       from './twitter.config.mjs';

let CLIENT_CONFIG = null;
let CLIENT        = null;

export default class TwitterClient 
{
  static get client() { return CLIENT;        }
  static get config() { return CLIENT_CONFIG; }
  
  static init()
  {
    if( !CLIENT )
    {
      CLIENT_CONFIG = {
        consumer_key        : cfg.consumer_key        ,
        consumer_secret     : cfg.consumer_secret     ,
        access_token_key    : cfg.access_token_key    ,
        access_token_secret : cfg.access_token_secret ,
      };
      if( 
        cfg.consumer_key    .length == 0 || cfg.consumer_secret    .length == 0 ||
        cfg.access_token_key.length == 0 || cfg.access_token_secret.length == 0
      ){
        console.error( 'invalid twitter configuration' );
        console.log( { twitter_config : CLIENT_CONFIG } );
      }
      else 
      {
        console.log( { twitter_config : CLIENT_CONFIG } );
        CLIENT = new ClientApi( CLIENT_CONFIG );
      }
    }
    return this;
  }
}
