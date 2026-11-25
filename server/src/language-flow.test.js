import { test } from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";

test("request endpoints select French emails, preserve English defaults, and reject invalid languages", async () => {
  process.env.PORT = "0";
  process.env.RESEND_API_KEY = "test-key";
  const originalFetch = globalThis.fetch;
  const messages = [];
  globalThis.fetch = async (url, options) => {
    if (url === "https://api.resend.com/emails") {
      messages.push(JSON.parse(options.body));
      return new Response("{}", { status: 200 });
    }
    return originalFetch(url, options);
  };
  const { server } = await import("./index.js");
  try {
    if (!server.listening) await once(server, "listening");
    const port = server.address().port;
    let requestNumber = 0;
    const post = (path, body) => originalFetch(`http://127.0.0.1:${port}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": `192.0.2.${++requestNumber}` },
      body: JSON.stringify(body),
    });

    for (const [path, data] of [
      ["/api/waitlist", { email: "pilot@example.test", language: "fr" }],
      ["/api/contact", { name: "Awa", email: "demo@example.test", language: "fr" }],
    ]) {
      messages.length = 0;
      assert.equal((await post(path, data)).status, 200);
      assert.equal(messages.length, 2);
      assert.ok(messages.some((message) => message.html?.includes('lang="fr"')));
      assert.ok(messages.some((message) => message.text?.includes("Nouvelle demande")));
    }

    for (const [path, data, expected] of [
      ["/api/waitlist", { email: "english@example.test" }, "New waitlist submission"],
      ["/api/contact", { name: "Awa", email: "english@example.test" }, "New contact/demo submission"],
    ]) {
      messages.length = 0;
      assert.equal((await post(path, data)).status, 200);
      assert.ok(messages.some((message) => message.html?.includes('lang="en"')));
      assert.ok(messages.some((message) => message.text?.includes(expected)));
    }

    for (const path of ["/api/waitlist", "/api/contact"]) {
      messages.length = 0;
      assert.equal((await post(path, {
        name: "Awa", email: "invalid@example.test", language: "es",
      })).status, 400);
      assert.equal(messages.length, 0);
    }

    for (const [path, language] of [
      ["/api/waitlist", "fr"], ["/api/waitlist", "en"],
      ["/api/contact", "fr"], ["/api/contact", "en"],
    ]) {
      const request = {
        formType: "institutional", name: "Awa", email: "person@example.test",
        institution: "Example University", role: "Student", country: "Guinée",
        goal: "Supervision", language,
      };
      for (const field of ["name", "institution", "role"]) {
        messages.length = 0;
        assert.equal((await post(path, { ...request, [field]: "  " })).status, 400, `${path}: ${field}`);
        assert.equal(messages.length, 0);
      }
      messages.length = 0;
      assert.equal((await post(path, { ...request, institution: "<b></b>" })).status, 400);
      assert.equal((await post(path, { ...request, formType: "unknown" })).status, 400);
      assert.equal(messages.length, 0);
      messages.length = 0;
      assert.equal((await post(path, request)).status, 200);
      const notice = messages.find((message) => message.text);
      assert.match(notice.text, /Guinée/);
      assert.match(notice.text, /Student/);
      assert.match(notice.text, /Supervision/);
      messages.length = 0;
      assert.equal((await post(path, { ...request, country: "", goal: "" })).status, 200);
    }

    messages.length = 0;
    delete process.env.RESEND_API_KEY;
    assert.equal((await post("/api/waitlist", { email: "example@example.test" })).status, 500);
    assert.equal(messages.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
