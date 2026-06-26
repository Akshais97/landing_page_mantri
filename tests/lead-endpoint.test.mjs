import assert from "node:assert/strict";
import test from "node:test";

import { resolveLeadEndpoint } from "../src/lib/leadEndpoint.js";

test("lead endpoint follows Vite base path in local static serving", () => {
  assert.equal(resolveLeadEndpoint("/landing_page_mantri/"), "/landing_page_mantri/api/lead");
});

test("lead endpoint remains root-relative on Vercel", () => {
  assert.equal(resolveLeadEndpoint("/"), "/api/lead");
});

