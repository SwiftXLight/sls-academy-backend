const supabase = require('../config/db');

async function updateJSON(jsonPath, jsonData) {
  try {
    const { data, error } = await supabase
      .from('json')
      .update({ data: jsonData })
      .eq('path', jsonPath);

    if (error) {
      throw new Error('Failed to update JSON document.');
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update JSON document.');
  }
}

async function getJSON(jsonPath) {
  try {
    const { data, error } = await supabase
      .from('json')
      .select('data')
      .eq('path', jsonPath)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error(error);
      throw new Error('Failed to retrieve JSON document.');
    } else if (data && data.length > 0) {
      return data[0];
    } else {
      throw new Error('JSON document not found.');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve JSON document.');
  }
};

module.exports = { updateJSON, getJSON };
