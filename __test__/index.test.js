import "dotenv/config";
import pass from "../src/pass-admin.mjs";
import passSec from "../src/pass-admin-sec.mjs";
import creatorAdmin from "../src/creator-admin.mjs";
import creatorAdminSec from "../src/creator-admin-sec.mjs";
import storefront from "../src/storefront.mjs";
import storefrontSec from "../src/storefront-sec.mjs";

test("pass admin api", async () => {
  expect(await pass()).toBe(true);
});

test("pass admin api with body secure check", async () => {
  expect(await passSec()).toBe(true);
});

test("creator admin api", async () => {
  expect(await creatorAdmin()).toBe(true);
});

test("creator admin api with body secure check", async () => {
  expect(await creatorAdminSec()).toBe(true);
});

test("storefront api", async () => {
  expect(await storefront()).toBe(true);
});

test("storefront api with body secure check", async () => {
  expect(await storefrontSec()).toBe(true);
});
