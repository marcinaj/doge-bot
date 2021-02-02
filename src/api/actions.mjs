import { action_exit                  } from 'action.exit.mjs';
import { action_filter_set            } from 'action.filter.set.mjs';
import { action_io_client_add_discord } from 'action.io.client.add.discord.mjs';
import { action_io_client_add_reddit  } from 'action.io.client.add.reddit.mjs';
import { action_io_client_add_twitter } from 'action.io.client.add.twitter.mjs';
import { action_io_client_remove      } from 'action.io.client.remove.mjs';
import { action_io_input_add          } from 'action.io.input.add.mjs';
import { action_io_input_configure    } from 'action.io.input.configure.mjs';
import { action_io_input_remove       } from 'action.io.input.remove.mjs';
import { action_io_output_add         } from 'action.io.output.add.mjs';
import { action_io_output_configure   } from 'action.io.output.configure.mjs';
import { action_io_output_remove      } from 'action.io.output.remove.mjs';
import { action_model_load            } from 'action.model.load.mjs';
import { action_model_store           } from 'action.model.store.mjs';
import { action_start                 } from 'action.start.mjs';
import { action_stop                  } from 'action.stop.mjs';

export default {
  exit                  : action_exit                  ,
  filter_set            : action_filter_set            ,
  io_client_add_discord : action_io_client_add_discord ,
  io_client_add_reddit  : action_io_client_add_reddit  ,
  io_client_add_twitter : action_io_client_add_twitter ,
  io_client_remove      : action_io_client_remove      ,
  io_input_add          : action_io_input_add          ,
  io_input_configure    : action_io_input_configure    ,
  io_input_remove       : action_io_input_remove       ,
  io_output_add         : action_io_output_add         ,
  io_output_configure   : action_io_output_configure   ,
  io_output_remove      : action_io_output_remove      ,
  model_load            : action_model_load            ,
  model_store           : action_model_store           ,
  start                 : action_start                 ,
  stop                  : action_stop                  ,
}
