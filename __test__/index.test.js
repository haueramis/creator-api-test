import "dotenv/config";
import pass from "../src/pass-admin.mjs";
import passSec from "../src/pass-admin-sec.mjs";
import creatorAdmin from "../src/creator-admin.mjs";
import creatorAdminSec from "../src/creator-admin-sec.mjs";
import storefront from "../src/storefront.mjs";
import storefrontSec from "../src/storefront-sec.mjs";
import sign from "../src/sign-example.mjs";
import signSec from "../src/sign-sec-example.mjs";

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

test("sign", () => {
  expect(
    sign({
      now: 1689907490132,
      method: "POST",
      resource: "/admin/graphql",
      secret: "secret",
    })
  ).toStrictEqual({
    msg: "1689907490132POST/admin/graphql",
    sign: "d1tZksk8khiWQ+UTUY7m6u1Msb5Oyhfej+c384e5GM8=",
  });
});

test("sign secure", () => {
  expect(
    signSec({
      now: 1566549227549,
      body: "the_body",
      method: "PUT",
      resource: "/test/path?currency=USD",
      secret: "secret",
    })
  ).toStrictEqual({
    msg: "1566549227549PUT/test/path?currency=USDthe_body",
    sign: "xN/7FHzMvIVbJYESYPJlMwNHL9r3DBZ21lsjSn5W3Bo=",
  });
});
