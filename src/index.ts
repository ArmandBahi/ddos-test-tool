import yargs, { config } from 'yargs';
import fs from 'fs';
import { args } from './yargs-config'
import axios, { AxiosInstance } from 'axios';
import https from 'https';

/*****************************************************/
// fonctions associées aux commandes à appeler

/**
 * Lit le fichier de properties
 * 
 */
function readProperties() {
  return new Promise((resolve, reject) => {

    fs.readFile('config.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject();
        return
      }
      console.log(data)
      let config = JSON.parse(data);
      resolve(config);
    })
  });
}

/**
 * Lit le fichier de properties
 * 
 */
function runAttack(properties: any) {
  console.log('runAttack');

  const oAxiosInstanceServer: AxiosInstance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    headers: properties.headers,
  });

  for (let i = 0; i < properties.calls; i++) {
    const index = `${i}`;
    setTimeout(() => {
      console.log('Run request', index);

      let params: any = {
        method: 'get',
        url: properties.url,
      }

      if (properties.method) {
        params.method = properties.method;
      }
      if (properties.params) {
        if (params.method === 'get') {
          params.params = properties.params;
        } else {
          params.data = properties.params;
        }
      }

      oAxiosInstanceServer(params).then((res) => {
        console.log('Request ok', index);
      }).catch((err) => {
        console.log('Request failed', index, err);
      });
    }, i * properties.timeout);
  }
}


// Récupère les properties
if (args._[0]) {
  const command: string = args._[0];

  readProperties().then((properties) => {
    try {
      console.log('Command Start', args, 'DEBUG');
      // si une fonction avec le nom de la commande existe alors elle sera appelée
      return eval(command)(properties);
    } catch (error) {
      console.log(`Command error : function not valid : ${command}`);
      return false;
    }
  })
} else {
  console.log('Veuillez spécifier une commande');
  yargs.showHelp("log");
}