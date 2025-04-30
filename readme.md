# NEWFRAMEQA – Unified Test Runner (BETA)

**NEWFRAMEQA** je open-source framework v beta verzi, který sjednocuje automatizované testy pro **webové aplikace** (pomocí [Playwright](https://playwright.dev)) a **nativní mobilní aplikace** (pomocí [Maestro](https://maestro.mobile.dev)) do jednoho běhového prostředí. Cílem je zjednodušit psaní a spouštění testů napříč platformami.

> ⚠️ Projekt je ve fázi BETA – základní funkce, žádná záruka stability.

---

## ✨ Vlastnosti

- Sdílený DSL pro web i mobilní testy
- Spuštění testů přes jeden engine interface (`TestEngine`)
- Oddělená implementace pro `PlaywrightEngine` a `MaestroEngine`
- Rychlé přepínání mezi platformami
- Možnost rozšíření o další platformy do budoucna

---

## 🔧 Požadavky

### Webová část (Playwright)
- Node.js v16+
- Nainstalovaný Playwright (`npm install --save-dev playwright`)
- Pro maximální kompatibilitu používej Chromium (`chromium.launch`)

### Nativní část (Maestro)
- Nainstalovaný [Maestro CLI](https://maestro.mobile.dev) (`brew install maestro`)
- Android Emulator nebo fyzické zařízení s přístupem přes ADB
- iOS zařízení nebo simulátor (pouze macOS s Xcode)
- Testovací YAML soubory v adresáři `/tests`

---

## 🧪 Spuštění testů

```bash
# Spuštění webového testu
npm run test:web

# Spuštění mobilního testu
npm run test:native
