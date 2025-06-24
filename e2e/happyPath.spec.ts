import { test, expect } from '@playwright/test';

test('Happy Path: Registrierung → Login → Buchauswahl → Warenkorb', async ({ page }) => {
  const testEmail = 'alexandersimon' + Date.now() + '@test.com'; // eindeutige E-Mail
  const password = '123456as';

  await page.goto('/');

  // Login-Modal öffnen
  await page.click('text=Login');

  // Registrierung starten
  await page.click('text=Registrieren');
  await page.fill('input[placeholder="Vorname"]', 'Alexander');
  await page.fill('input[placeholder="Nachname"]', 'Simon');
  await page.fill('input[placeholder="E-Mail"]', testEmail);
  await page.fill('input[placeholder="Passwort"]', password);
  await page.click('button:has-text("Konto erstellen")');

  // Warten bis Modal geschlossen ist oder Name sichtbar ist (je nach UI)
  await expect(page.locator('.modal-content')).toBeHidden();

  // Ein Buch anklicken
  await page.click('h2:text("Powerless")'); // oder ein existierender Titel

  // Buch zum Warenkorb hinzufügen
  await page.click('button:has-text("Zum Warenkorb hinzufügen")');

  // 3. Modal schließen
  await page.click('.close-btn'); // oder Button finden, z. B. per aria-label oder Text

  // Warenkorb öffnen
  await page.click('.cart-btn');

  // Prüfen, ob Buch im Warenkorb sichtbar ist
  await expect(page.locator('.cart-overlay >> text=Powerless')).toBeVisible();


});
