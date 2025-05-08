const fs = require('fs');
const path = require('path');

// Load the destinations data
const destinationsPath = path.join(__dirname, '..', 'destinations', 'destinations.json');
const destinations = JSON.parse(fs.readFileSync(destinationsPath, 'utf8'));

// exports.searchDestination = (req, res) => {
//     const searchTerm = req.query.term;
  
//     if (!searchTerm) {
//       return res.status(400).json({ error: 'Term query parameter is required' });
//     }
  
//     const destination = destinations.find(dest => dest.term.toLowerCase() === searchTerm.toLowerCase());
  
//     if (destination) {
//       return res.json({ uid: destination.uid });
//     } else {
//       return res.status(404).json({ error: 'Destination not found' });
//     }
//   };

//controllers/SearchDestinationController.js

exports.searchDestination = (req, res) => {
  const searchTerm = req.query.term;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Term query parameter is required' });
  }

  const matches = destinations.filter(dest =>
    dest.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Backend autocomplete results for:", searchTerm);
  console.log(matches); // ✅ this logs the actual array to backend terminal

  return res.json(matches); // ✅ return array
};


