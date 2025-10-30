import Whop from "@whop/sdk";

const whopsdk = new Whop({
  apiKey: process.env.WHOP_API_KEY,
  appID: process.env.WHOP_APP_ID,
});

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    const token = req.headers["x-whop-user-token"];
    if (!token) {
      return res.status(401).json({ error: "missing token" });
    }
    const { userId } = await whopsdk.verifyUserToken(req.headers);
    const access = await whopsdk.users.checkAccess("exp_yourExperienceId", {
      id: userId,
    });
    return res.status(200).json({
      userId,
      accessLevel: access.access_level,
      hasAccess: access.has_access,
    });
  } catch (err) {
    return res.status(403).json({ error: "invalid token", details: err.message });
  }
}
