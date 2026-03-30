import crypto from "crypto";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@scintel.local";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || "scintel-admin-secret";
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

const createAdminToken = (email) => {
  const payload = {
    email,
    role: "admin",
    exp: Date.now() + TOKEN_TTL_MS
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", ADMIN_TOKEN_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        message: "Invalid admin credentials"
      });
    }

    const token = createAdminToken(email);

    return res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        email,
        role: "admin"
      }
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};
