function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

export function frenchConfirmation({ name, kind }) {
  const greeting = name?.trim() ? `Bonjour ${name.trim()},` : "Bonjour,";
  const subject = kind === "demo"
    ? "Votre demande de démonstration ScholarFlow a bien été reçue"
    : "Votre demande concernant ScholarFlow a bien été reçue";
  const body = kind === "demo"
    ? "Nous avons bien reçu votre demande de démonstration. Notre équipe vous répondra dans un délai d’un jour ouvrable."
    : "Nous avons bien reçu votre demande concernant ScholarFlow. Notre équipe vous répondra pour discuter de vos besoins et des prochaines étapes.";

  return {
    subject,
    html: `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head><body style="font-family:Arial,sans-serif;color:#1A3C5E;line-height:1.6"><p>${escapeHtml(greeting)}</p><p>${escapeHtml(body)}</p><p>Cordialement,<br>L’équipe AKEP Technologies</p></body></html>`,
  };
}

export function frenchNotification({ kind, name, email, institution, role, country, source, challenge, goal, subject, message, submittedAt }) {
  const value = (text) => text || "—";
  const lines = kind === "demo"
    ? [
      "Nouvelle demande de démonstration",
      "",
      `Nom : ${value(name)}`,
      `Courriel : ${email}`,
      `Établissement : ${value(institution)}`,
      ...(role ? [`Fonction : ${role}`] : []),
      ...(country ? [`Pays : ${country}`] : []),
      ...(goal ? [`Objectif : ${goal}`] : []),
      `Objet : ${value(subject)}`,
      `Message : ${value(message)}`,
    ]
    : [
      "Nouvelle demande concernant ScholarFlow",
      "",
      `Nom : ${value(name)}`,
      `Courriel : ${email}`,
      `Établissement : ${value(institution)}`,
      `Fonction : ${value(role)}`,
      `Pays : ${value(country)}`,
      `Source : ${value(source)}`,
      `Besoin : ${value(challenge)}`,
      ...(goal ? [`Objectif : ${goal}`] : []),
    ];

  lines.push("", `Reçue le : ${new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(submittedAt)} UTC`);
  return {
    subject: kind === "demo"
      ? `[AKEP — Démonstration] ${subject || name}`
      : `[AKEP — Demande] ${institution || email}`,
    body: lines.join("\n"),
  };
}
