import actions from './actions.mjs';

export default class Api
{
  static async execute( action )
  {
    log.debug( `rest api request: ${action.type}` );
    
    let result = [];
    
    if( actions.hasOwnProperty( action.type ) )
    {
      result.push( actions[ action.type ]( action.data ) );
    }
    else if( action.type === 'list' ) // action === { type: 'list', data [ {...}, ... ] } }
    {
      action.data.forEach( subAction => result.push( await execute( subAction ) ) );
    }
    else 
    {
      log.error( `rest api request error : unknown action type` );
      result.push( { status: 'failed', message: `unknown action '${ action.type }'` } );
    }
    
    return result;
  }
}
