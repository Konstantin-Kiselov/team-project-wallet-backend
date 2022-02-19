const queryString = require("query-string");
const URL = require("url");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const googleRedirect = async (req, res) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;
    const tokenData = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.BASE_URL}users/google-redirect`,
        grant_type: "authorization_code",
        code,
      },
    });
    const userData = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${tokenData.data.access_token}`,
      },
    });
    const payload = {
      id: _id,
    };
    const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });

    await User.findByIdAndUpdate(_id, { token });

    return res.redirect(
      `${process.env.BASE_URL}?accessToken=${accessToken}`
    );
  };

module.exports = googleRedirect;