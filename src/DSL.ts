import { Step } from './TestEngine';
export const steps: Step[] = [];

export const click = (text: string) =>
  steps.push({ type: 'click', text });

export const fill = (...args: string[]) => {
    const value = args.pop()!;         // poslední argument je hodnota (co chci vyplnit)
    const selectors = args;            // zbytek jsou selektory/texty
    steps.push({ type: 'fill', selectors, value });
  };
  
export const navigate = (url: string) =>
  steps.push({ type: 'navigate', url });

export const launchApp = (bundleId: string) => 
    steps.push({ type: 'launchApp', bundleId });

export const wait = (ms: number) => 
    steps.push({ type: 'wait', value: String(ms) });