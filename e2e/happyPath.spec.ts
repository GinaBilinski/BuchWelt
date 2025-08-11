import { test, expect } from "@playwright/test";

// Testfall: Vollständiger Ablauf von der Registrierung bis zum Warenkorb (Happy Path)
test("Happy Path: Registrierung → Login → Buchauswahl → Warenkorb", async ({
  page,
}) => {
  // Dynamische Test-E-Mail erstellen, um Dopplungen bei wiederholten Tests zu vermeiden
  const testEmail = "alexandersimon" + Date.now() + "@test.com";
  const password = "123456as";
  // Startseite der Anwendung aufrufen
  await page.goto("/");
  // Login-Modal öffnen
  await page.click("text=Login");
  // Registrierung starten und Pflichtfelder ausfüllen
  await page.click("text=Registrieren");
  await page.fill('input[placeholder="Vorname"]', "Alexander");
  await page.fill('input[placeholder="Nachname"]', "Simon");
  await page.fill('input[placeholder="E-Mail"]', testEmail);
  await page.fill('input[placeholder="Passwort"]', password);
  // Registrierungsformular absenden
  await page.click('button:has-text("Konto erstellen")');
  // Modal schließen
  await expect(page.locator(".modal-content")).toBeHidden();
  // Buchdetailseite öffnen
  await page.click('h2:text("Powerless")');
  // Buch zum Warenkorb hinzufügen
  await page.click('button:has-text("Zum Warenkorb hinzufügen")');
  // Detailansicht schließen
  await page.click(".close-btn");
  // Warenkorb öffnen
  await page.click(".cart-btn");
  // Prüfen, ob das gewählte Buch im Warenkorb angezeigt wird
  await expect(page.locator(".cart-overlay >> text=Powerless")).toBeVisible();
});
