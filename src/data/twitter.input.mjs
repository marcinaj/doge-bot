import twitter from './twitter.client.mjs';
import ignore  from './config.ignore.mjs';

let CACHE     = [];
let STREAM    = null;
let RX_IGNORE = new RegExp( ignore.join('|'), 'i' );

export default class TwitterInput
{
  get length(){ return CACHE.length; }
  
  static init()
  {
    twitter.init();
    
    if( !twitter.client )
      return false;
    
    twitter.client.get( 'search/tweets', { q: 'doge' }, ( err, tweets ) => 
    {
      if( err ) 
        return console.error( err );
      for( let tweet of tweets.statuses ) 
        if( !RX_IGNORE.test( tweet.text ) )
          CACHE.push( tweet.text );
    } );
    
    STREAM = twitter.client.stream( 'statuses/filter', { track: 'doge' } );
    STREAM.on( 'data', event => { if( !RX_IGNORE.test( event.text ) ) CACHE.push( event.text ); } );
    
    return true;
  }

  static async poll( fn ) 
  {
    if( !twitter.client )
      return false;
      
    if( CACHE.length > 0 && fn )
    {
      fn( CACHE[CACHE.length - 1] );
      CACHE.pop();
      return true;
    }
    return false;
  }
}
