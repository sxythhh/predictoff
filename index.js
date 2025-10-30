import express from "express";
import cors from "cors";
import Whop from "@whop/sdk";

const app = express();
app.use(cors());
app.use(express.json());

const whopsdk = new Whop({
  apiKey: process.env.WHOP_API_KEY,
  appID: process.env.WHOP_APP_ID,
});

app.get("/verify", async (req, res) => {
  try {
    const token = req.headers["x-whop-user-token"];
    if (!token) return res.status(401).json({ error: "missing token" });

    const { userId } = await whopsdk.verifyUserToken(req.headers);
    const access = await whopsdk.users.checkAccess("exp_yourExperienceId", {
      id: userId,
    });

    res.json({
      userId,
      accessLevel: access.access_level,
      hasAccess: access.has_access,
    });
  } catch (err) {
    res.status(403).json({ error: "invalid token", details: err.message });
  }
});

app.listen(3000, () => console.log("Whop Auth API running on port 3000"));
