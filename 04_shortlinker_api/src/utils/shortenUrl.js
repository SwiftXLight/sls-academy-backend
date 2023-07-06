const crypto = require('crypto');

function generateShortURL(url) {
  const hash = crypto.createHash('sha256').update(url).digest('hex');
  return hash.substring(0, 6);
}

module.exports = {
  generateShortURL
};
