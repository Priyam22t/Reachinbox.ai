import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/google", async (req, res) => {
  const { token } = req.body;

  try {
    const googleRes = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );

    const { email, name, picture } = googleRes.data;

    return res.json({
      user: { email, name, picture },
    });
  } catch (err) {
    return res.status(401).json({ error: "Invalid Google token" });
  }
});

export default router;
