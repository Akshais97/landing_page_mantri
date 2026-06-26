const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getAllowedOrigins() {
  return String(process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);
}

function applyCors(req, res) {
  const origin = req.headers?.origin;
  if (!origin) return true;

  const allowedOrigins = getAllowedOrigins();
  const normalizedOrigin = origin.replace(/\/$/, "");

  if (allowedOrigins.length > 0 && !allowedOrigins.includes(normalizedOrigin)) {
    return false;
  }

  res.setHeader?.("Access-Control-Allow-Origin", origin);
  res.setHeader?.("Vary", "Origin");
  res.setHeader?.("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader?.("Access-Control-Allow-Headers", "Content-Type");
  return true;
}

function parseBody(body) {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

function requireEnvVar(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export default async function handler(req, res) {
  const originAllowed = applyCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(originAllowed ? 204 : 403).end?.();
  }

  if (!originAllowed) {
    return res.status(403).json({ error: "Origin not allowed." });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = parseBody(req.body);
  const fullName = String(body.fullName || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();

  if (!fullName || !phone || !email) {
    return res.status(400).json({ error: "Name, phone, and email are required." });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  let crmEndpoint;
  let crmApiKey;
  let crmApiSecret;
  let crmProjectName;
  let crmLeadSource;

  try {
    crmEndpoint = requireEnvVar("CRM_ENDPOINT");
    crmApiKey = requireEnvVar("CRM_API_KEY");
    crmApiSecret = requireEnvVar("CRM_API_SECRET");
    crmProjectName = requireEnvVar("CRM_PROJECT_NAME");
    crmLeadSource = requireEnvVar("CRM_LEAD_SOURCE");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server configuration error." });
  }

  const crmPayload = {
    name: fullName,
    phone,
    email,
    lead_source: crmLeadSource,
    custom_fields: {
      project: crmProjectName,
      form: "landing-page-enquiry",
    },
  };

  try {
    const crmResponse = await fetch(crmEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": crmApiKey,
        "X-API-Secret": crmApiSecret,
      },
      body: JSON.stringify(crmPayload),
    });

    const crmText = await crmResponse.text();

    if (!crmResponse.ok) {
      console.error("CRM rejected lead:", {
        status: crmResponse.status,
        body: crmText,
      });
      return res.status(502).json({
        error: "Unable to submit enquiry right now. Please try again.",
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("CRM submission failed:", error);
    return res.status(500).json({
      error: "Unable to submit enquiry right now. Please try again.",
    });
  }
}
