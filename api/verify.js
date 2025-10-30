export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    const token = req.headers["x-whop-user-token"];
    if (!token) {
      return res.status(401).json({ error: "missing token" });
    }

    // Verify token manually with Whop API
    const response = await fetch("https://api.whop.com/api/v2/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();

    return res.status(200).json({
      userId: data?.id,
      username: data?.username,
      hasAccess: true,
    });
  } catch (err) {
    return res.status(500).json({ error: "server error", details: err.message });
  }
}
