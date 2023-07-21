import HmacSHA256 from "crypto-js/hmac-sha256.js";
import Base64 from "crypto-js/enc-base64.js";

export default function sign(option) {
  const { now, method, resource, secret } = option;

  const msg = `${now}${method}${resource}`;
  const sign = HmacSHA256(msg, secret).toString(Base64);

  return { msg, sign };
}
