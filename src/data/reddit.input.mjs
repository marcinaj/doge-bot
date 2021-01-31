import reddit from './reddit.client.mjs';
import ignore from './config.ignore.mjs';

let LAST_SEEN_ID   = 0;
let LAST_POLL_TIME = 0;
let POLL_INTERVAL  = 3600;
let POLL_COUNT     = 10;
let CACHE          = [];

let _rx_has_space = new RegExp( '^.* .*$' );
let _rx_ignore    = new RegExp( ignore.join( '|' ), 'i' );

async function fetch()
{
  if( !reddit.client )
    return false;
    
  let id      = LAST_SEEN_ID;  
  let cnt_all = 0;
  let cnt_ok  = 0;
  let cnt_unq = 0;
  let posts   = new Map();
  
  const test = ( post )=> ((id = parseInt( post.id, 36 )) > LAST_SEEN_ID
    && !!post.title.length 
    && _rx_has_space.test( post.title )
    && !_rx_ignore.test( post.title )
  );
  const put  = post => { ++cnt_all; if( test( post ) ) ++cnt_ok, posts.set( post.id, post.title ); };
  const opts = { time: 'all', limit: POLL_COUNT };
  
  let subreddit    = await reddit.client.getSubreddit( 'SatoshiStreetBets' );
    
  (await subreddit.getHot( opts )).forEach( post => put( post ) );
  (await subreddit.getTop( opts )).forEach( post => put( post ) );
  (await subreddit.getNew( opts )).forEach( post => put( post ) );
  
  posts.forEach( text => (++cnt_unq, CACHE.push( text )) );
  LAST_SEEN_ID = id;
  
  console.log( `reddit fetch total: ${cnt_all} ok: ${cnt_ok} unique: ${cnt_unq}\n` );
  return true;
}

export default class RedditInput
{
  get length(){ return CACHE.length; }
  
  static init()
  {
    reddit.init();
    return !!reddit.client;
  }
  
  static async poll( fn ) 
  {
    if( !reddit.client )
      return false;
      
    const t_now   = Date.now();
    const t_prev  = LAST_POLL_TIME;

    if( (t_now - t_prev) > POLL_INTERVAL ) 
    {
      await fetch();
      LAST_POLL_TIME = t_now;
    }
    
    if( CACHE.length > 0 && fn )
    {
      fn( CACHE[CACHE.length - 1] );
      CACHE.pop();
      return true;
    }
    return false;
  }

}
