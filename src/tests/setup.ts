import { beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { createClient } from "@supabase/supabase-js";

// Mock Supabase client
const mockSupabase = createClient("http://localhost:54321", "test-anon-key");

// Mock Xendit responses
const handlers = [
  http.post("*/create-payment", () => {
    return HttpResponse.json({
      success: true,
      payment_id: "test-payment-id",
      payment_link: "https://checkout-test.xendit.co/test",
    });
  }),

  http.get("*/check-payment-status", () => {
    return HttpResponse.json({
      success: true,
      payment: {
        id: "test-payment-id",
        status: "paid",
        amount: 100000,
      },
    });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, mockSupabase };
