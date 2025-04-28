import { TestEngine, Step } from './TestEngine';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { execSync } from 'child_process';

export class MaestroEngine implements TestEngine {
  async run(steps: Step[]): Promise<void> {
    const launchStep = steps.find(s => s.type === 'launchApp');
    if (!launchStep || !launchStep.bundleId) {
      throw new Error('Chybí krok launchApp s bundleId.');
    }

    const yamlSteps: any[] = [];

    for (const s of steps) {
      if (s.type === 'launchApp') {
        yamlSteps.push({ launchApp: {} });
      }
      if (s.type === 'navigate') {
        yamlSteps.push({ navigate: { url: s.url } });
      }
      if (s.type === 'click') {
        yamlSteps.push({ tapOn: s.text });
      }
      if (s.type === 'fill') {
        yamlSteps.push({ tapOn: s.selectors?.[0] }); // Maestro použije JEN první selektor
        yamlSteps.push({ inputText: s.value! });
      }
      if (s.type === 'wait') {
        yamlSteps.push({ waitForAnimationToEnd: { timeout: parseInt(s.value!) } });
      }
    }

    const configYaml = yaml.dump({ appId: launchStep.bundleId }, { lineWidth: -1 });
    const stepsYaml = yaml.dump(yamlSteps, { lineWidth: -1 });

    const finalYaml = `${configYaml}---\n${stepsYaml}`;

    fs.writeFileSync('test.yaml', finalYaml);

    execSync('maestro test test.yaml', { stdio: 'inherit' });
  }
}
