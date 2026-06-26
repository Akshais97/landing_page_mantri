import assert from "node:assert/strict";
import test from "node:test";

const ORIGINAL_ENV = { ...process.env };

function createResponse() {
  return {
    statusCode: 200,
    payload: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };
}

async function loadHandler() {
  const module = await import(`../api/lead.js?cacheBust=${Date.now()}`);
  return module.default;
}

test("lead route rejects incomplete form data before calling CRM", async () => {
  process.env = {
    ...ORIGINAL_ENV,
    CRM_ENDPOINT: "https://crm.example.test/capture",
    CRM_API_KEY: "test-key",
    CRM_API_SECRET: "test-secret",
    CRM_LEAD_SOURCE: "legends-landing-page",
  };

  let fetchCalled = false;
  global.fetch = async () => {
    fetchCalled = true;
    return new Response("{}", { status: 200 });
  };

  const handler = await loadHandler();
  const res = createResponse();

  await handler(
    { method: "POST", body: { name: "Ravi Kumar", phone: "", email: "ravi@example.com" } },
    res,
  );

  assert.equal(res.statusCode, 400);
  assert.match(res.payload.error, /required/i);
  assert.equal(fetchCalled, false);
});

test("lead route does not accept fullName as the CRM name field", async () => {
  process.env = {
    ...ORIGINAL_ENV,
    CRM_ENDPOINT: "https://crm.example.test/capture",
    CRM_API_KEY: "test-key",
    CRM_API_SECRET: "test-secret",
    CRM_LEAD_SOURCE: "legends-landing-page",
  };

  let fetchCalled = false;
  global.fetch = async () => {
    fetchCalled = true;
    return new Response("{}", { status: 200 });
  };

  const handler = await loadHandler();
  const res = createResponse();

  await handler(
    {
      method: "POST",
      body: {
        fullName: "Ravi Kumar",
        phone: "+919876543210",
        email: "ravi@example.com",
      },
    },
    res,
  );

  assert.equal(res.statusCode, 400);
  assert.equal(fetchCalled, false);
});

test("lead route maps browser fields to CRM name payload and server-only headers", async () => {
  process.env = {
    ...ORIGINAL_ENV,
    CRM_ENDPOINT: "https://crm.example.test/capture",
    CRM_API_KEY: "test-key",
    CRM_API_SECRET: "test-secret",
    CRM_LEAD_SOURCE: "legends-landing-page",
  };

  let request;
  global.fetch = async (url, init) => {
    request = { url, init };
    return new Response(JSON.stringify({ id: "crm-1" }), { status: 201 });
  };

  const handler = await loadHandler();
  const res = createResponse();

  await handler(
    {
      method: "POST",
      body: {
        name: "  Ravi Kumar  ",
        phone: " +919876543210 ",
        email: " Ravi@example.com ",
      },
    },
    res,
  );

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.payload, { success: true });
  assert.equal(request.url, "https://crm.example.test/capture");
  assert.equal(request.init.headers["X-API-Key"], "test-key");
  assert.equal(request.init.headers["X-API-Secret"], "test-secret");

  const payload = JSON.parse(request.init.body);
  assert.deepEqual(payload, {
    name: "Ravi Kumar",
    email: "Ravi@example.com",
    phone: "+919876543210",
    lead_source: "legends-landing-page",
  });
  assert.equal(Object.hasOwn(payload, "fullName"), false);
  assert.equal(Object.hasOwn(payload, "full_name"), false);
  assert.equal(Object.hasOwn(payload, "first_name"), false);
  assert.equal(Object.hasOwn(payload, "last_name"), false);
  assert.equal(Object.hasOwn(payload, "custom_fields"), false);
});

test("lead route uses safe defaults for non-secret CRM configuration", async () => {
  process.env = {
    ...ORIGINAL_ENV,
    CRM_ENDPOINT: "",
    CRM_API_KEY: "test-key",
    CRM_API_SECRET: "test-secret",
    CRM_LEAD_SOURCE: "",
  };

  let request;
  global.fetch = async (url, init) => {
    request = { url, init };
    return new Response("{}", { status: 200 });
  };

  const handler = await loadHandler();
  const res = createResponse();

  await handler(
    {
      method: "POST",
      body: {
        name: "Ravi Kumar",
        phone: "+919876543210",
        email: "ravi@example.com",
      },
    },
    res,
  );

  assert.equal(res.statusCode, 200);
  assert.equal(request.url, "https://sakhaa-dev.sakhaa.ai/api/v1/capture/person");

  const payload = JSON.parse(request.init.body);
  assert.equal(payload.name, "Ravi Kumar");
  assert.equal(payload.lead_source, "legends-landing-page");
  assert.equal(Object.hasOwn(payload, "custom_fields"), false);
});

test("lead route fails before CRM when server credentials are missing", async () => {
  process.env = {
    ...ORIGINAL_ENV,
    CRM_ENDPOINT: "",
    CRM_API_KEY: "",
    CRM_API_SECRET: "",
    CRM_LEAD_SOURCE: "",
  };

  let fetchCalled = false;
  global.fetch = async () => {
    fetchCalled = true;
    return new Response("{}", { status: 200 });
  };

  const handler = await loadHandler();
  const res = createResponse();

  await handler(
    {
      method: "POST",
      body: {
        name: "Ravi Kumar",
        phone: "+919876543210",
        email: "ravi@example.com",
      },
    },
    res,
  );

  assert.equal(res.statusCode, 500);
  assert.equal(fetchCalled, false);
});
