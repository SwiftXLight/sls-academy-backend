const { createShortURL, getOriginalURL } = require('../services/service');

async function postShortURL(req, res) {
  const { link } = req.body;

  try {
    const shortURL = await createShortURL(link);
    const fullShortURL = `${req.protocol}://${req.get("host")}/${shortURL}`;
    res.status(200).json({ shortURL: fullShortURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function redirectOriginalURL(req, res) {
  const { linkHash } = req.params;

  try {
    const originalURL = await getOriginalURL(linkHash);
    res.redirect(originalURL);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  postShortURL,
  redirectOriginalURL
};
