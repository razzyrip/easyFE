import { chromium } from '@playwright/test';
import { TestEngine, Step } from './TestEngine';

export class PlaywrightEngine implements TestEngine {
  async run(steps: Step[]) {
    const browser = await chromium.launch({ 
      headless: false,
      args: ['--window-size=1920,1080']
    });
    
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }, // musí odpovídat window-size
  });

  const page = await context.newPage();

    for (const s of steps) {
      console.log(`[STEP]:`, s); // Log každého kroku

      if (s.type === 'navigate') {
        await page.goto(s.url!);
      }

      if (s.type === 'click') {
        await page.click(`text=${s.text}`);
      }

      if (s.type === 'fill') {
        const valueToFill = s.value!;
        const selectors = s.selectors || [];
      
        let filled = false;
      
        for (const selector of selectors) {
          try {
            console.log(`[FILL]: Zkouším selector: ${selector}`);
      
            let input;
      
            if (selector.startsWith('//') || selector.startsWith('xpath=')) {
              // XPath lokátor
              input = page.locator(`xpath=${selector.replace(/^xpath=/, '')}`);
            } else if (selector.startsWith('input') || selector.startsWith('css=')) {
              // Přímý CSS lokátor
              input = page.locator(selector.replace(/^css=/, ''));
            } else {
              // Placeholder fallback
              input = page.getByPlaceholder(selector);
            }
      
            await input.fill(valueToFill);
            console.log(`[FILL SUCCESS]: Vyplněno přes ${selector}`);
            filled = true;
            break;
          } catch (e) {
            console.warn(`[FILL WARNING]: Nepodařilo se vyplnit přes ${selector}`);
            // pokračujeme na další možnost
          }
        }
      
        if (!filled) {
          console.error(`[FILL ERROR]: Nepodařilo se najít input pro žádný z lokátorů: ${selectors.join(', ')}`);
          throw new Error('Fill selhalo.');
        }
      }
      
      if (s.type === 'wait') {
        await page.waitForTimeout(Number(s.value));
      }

      if (s.type === 'launchApp') {
        console.log('LaunchApp ignorováno v Playwrightu');
      }
    }

    await browser.close();
  }
}
