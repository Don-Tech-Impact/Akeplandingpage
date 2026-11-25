import { test } from "node:test";
import assert from "node:assert/strict";
import { frenchConfirmation, frenchNotification } from "./email-fr.js";

test("French confirmation escapes names and identifies its language", () => {
  const email = frenchConfirmation({ name: "<Test & Co>", kind: "demo" });
  assert.match(email.subject, /démonstration/);
  assert.match(email.html, /lang="fr"/);
  assert.match(email.html, /&lt;Test &amp; Co&gt;/);
  assert.doesNotMatch(email.html, /<Test & Co>/);
});

test("French notifications preserve submitted details and format dates", () => {
  const notification = frenchNotification({
    kind: "pilot",
    name: "Awa",
    email: "example@example.test",
    challenge: "Suivi des mémoires",
    submittedAt: new Date("2026-11-25T07:14:00Z"),
  });
  assert.match(notification.body, /Besoin : Suivi des mémoires/);
  assert.match(notification.body, /25 novembre 2026/);
  assert.match(notification.body, /07:14 UTC/);
});
