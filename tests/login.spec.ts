import { click, fill, navigate, launchApp, wait } from '../src/DSL';

const platform = process.argv[2];

if (platform === 'web') {
    navigate('https://github.com/search?q=razzyripper&type=repositories');
  } else if (platform === 'native') {
    launchApp('cz.example-your.app'); // Bundle ID tvé android appky
  }
  wait(3000) // čeká 3 sekundy 
platform == 'native' ? click("NOT NOW") : wait(3000)  
wait(2000)
click("razzyripper/razzyripper");
wait(3000)
//npm run test:web
//npm run test:native