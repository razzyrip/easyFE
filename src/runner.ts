import { PlaywrightEngine } from './PlaywrightEngine';
import { MaestroEngine } from './MaestroEngine';
import { steps } from './DSL';


// načti testovací kroky (např. login)
import '../tests/login.spec'; // ← aby se naplnilo `steps`

const platform = process.argv[2];

(async () => {
  if (platform === 'web') {
    await new PlaywrightEngine().run(steps);
  } else if (platform === 'native') {
    await new MaestroEngine().run(steps);
  } else {
    console.error('Použij “npm run test:web” nebo “npm run test:native”');
    process.exit(1);
  }
})();
