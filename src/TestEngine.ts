export interface Step {
    type: 'click' | 'fill' | 'navigate' | 'launchApp' | 'wait';
    selectors?: string[]
    text?: string;
    value?: string;
    url?: string;
    bundleId?: string;
  }
  
  export interface TestEngine {
    run(steps: Step[]): Promise<void>;
  }