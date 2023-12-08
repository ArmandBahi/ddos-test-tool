import yargs from 'yargs';

/**
 * utilisation de yargs pour gérer l'aide sur engine
 */
export const args = yargs
  .usage('$0 <cmd> [OPTIONS]')
  .command('runAttack', 'Lance une attaque', {})
  .options({})
  .wrap(null)
  .help('help')
  .alias('h', 'help')
  .version(false)
  .locale('fr')
  .strict() // bloque les commandes non connues
  .argv;