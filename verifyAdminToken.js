import crypto from "crypto";

const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || "scintel-admin-secret";

const verifyToken = (token) => {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac("sha256", ADMIN_TOKEN_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    );

    if (!payload?.exp || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Admin token is required"
    });
  }

  const token = authHeader.slice(7).trim();
  const payload = verifyToken(token);

  if (!payload || payload.role !== "admin") {
    return res.status(401).json({
      message: "Invalid or expired admin token"
    });
  }

  req.admin = payload;
  next();
};

export default verifyAdminToken;
