const { Search } = require('../Models/searchmodel'); // Adjust the path if necessary

const searchdogsitter = async (req, res) => {
    try {
        const suburb = req.query.location;
        if (!suburb) {
            return res.status(400).json({ error: 'Location query parameter is required' });
        }

        // Use regular expression for case-insensitive search
        const results = await Search.find({ suburb: new RegExp(suburb, 'i') });
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
};

module.exports = { searchdogsitter };
