import { click, fill, navigate, launchApp, wait } from '../src/DSL';

const platform = process.argv[2];

if (platform === 'web') {
    navigate('https://www.test1-tipsport.cz/');
  } else if (platform === 'native') {
    launchApp('cz.tipsport.bet'); // Bundle ID tvé android appky
  }
  wait(3000) // čeká 3 sekundy 
platform == 'native' ? click("NOT NOW") : wait(3000)  
wait(2000)
click("Přihlásit");
wait(3000) // čeká 3 sekundy 
fill(
    'E-mail',
    '//input[@name="username"]',
    'input[data-atid="txt-username"]',
    'ripp2@automat.tipsport.it'
  );
wait(3000)
fill('Heslo', 
    '//input[@name="password"]',
    'input[data-atid="txt-password"]',
    'test1234');
wait(3000)
click('PŘIHLÁSIT SE');
wait(3000)

//npm run test:web
//npm run test:native
