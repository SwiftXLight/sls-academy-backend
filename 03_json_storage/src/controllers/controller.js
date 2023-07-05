const { updateJSON, getJSON } = require('../services/service');

async function update(req, res) {
  const jsonPath = req.params.json_path;
  const jsonData = req.body;

  try {
    await updateJSON(jsonPath, jsonData);
    res.status(200).json({ message: 'JSON document updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update JSON document.' });
  }
}

async function retrieve(req, res) {
  const jsonPath = req.params.json_path;

  try {
    const data = await getJSON(jsonPath);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    if (error.message === 'JSON document not found.') {
      res.status(404).json({ message: 'JSON document not found.' });
    } else {
      res.status(500).json({ message: 'Failed to retrieve JSON document.' });
    }
  }
}

module.exports = { update, retrieve };
