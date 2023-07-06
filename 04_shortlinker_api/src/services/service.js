const { supabase } = require('../config/db');
const { generateShortURL } = require('../utils/shortenUrl');

async function createShortURL(link) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  if (!link) {
    throw new Error("URL is required");
  }

  if (!urlRegex.test(link)) {
    throw new Error("Invalid URL format");
  }

  const shortURL = generateShortURL(link);

  try {
    const { error } = await supabase
      .from("urls")
      .upsert([{ short_url: shortURL, original_url: link }]);

    if (error) {
      throw new Error("Failed to store URL");
    }

    return shortURL;
  } catch (err) {
    console.error(err);
    throw new Error("Internal server error");
  }
}

async function getOriginalURL(linkHash) {
  try {
    const { data, error } = await supabase
      .from("urls")
      .select("original_url")
      .eq("short_url", linkHash);

    if (error) {
      throw new Error("Failed to get URL");
    }

    if (data.length === 0) {
      throw new Error("Short URL not found");
    }

    return data[0].original_url;
  } catch (err) {
    console.error(err);
    throw new Error("Internal server error");
  }
}

module.exports = {
  createShortURL,
  getOriginalURL
};
