const mongoose = require('mongoose');
const Mahals = require("../models/mahalsModel");
const { acceptSearchText} = require("../middlewares/validatore");


// Search-endpoint
exports.search = async (req, res) => {
    const { searchText } = req.body;
    try {
      // Validate input
      const { error } = acceptSearchText.validate({ searchText });
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }
  
      // Convert search text to lowercase
      const text = searchText.toLowerCase();
  
      // Perform case-insensitive search on `name` and `location`
      const match = await Mahals.find({
        $or: [
          { name: { $regex: text, $options: 'i' } },
          { location: { $regex: text, $options: 'i' } },
        ],
      });
  
      // Send response
      res.status(200).json({ success: true, data: match });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ success: false, message: "An error occurred during the search" });
    }
  };


  const normalizeMahals = (mahals) =>
    mahals.map((mahal) => ({
      ...mahal,
      price: parseFloat(mahal.price), // Convert Decimal128 to number
      ratings: parseFloat(mahal.ratings), // Convert Decimal128 to number
    }));


// Sorting-endpoint
exports.sort = async (req, res) => {
    try {
        //...filters for optional param. if wish we can add location as well like shown below
        // http://localhost:8000/api/sort?sortBy=price&order=desc&location=chennai
      const { sortBy = 'price', order = 'desc', ...filters } = req.query;

      const validFields = ['price', 'ratings'];
      const validOrders = ['asc', 'desc'];
  
      if (!validFields.includes(sortBy)) {
        return res.status(400).json({ success: false, message: "Invalid sort field" });
      }
  
      if (!validOrders.includes(order)) {
        return res.status(400).json({ success: false, message: "Invalid sort order" });
      }
  
      const sortQuery = order === 'desc' ? `-${sortBy}` : sortBy;
  
      const sortedResults = await Mahals.find(filters).sort(sortQuery);
      const normalizedMahals = normalizeMahals(sortedResults);
  
      res.status(200).json({ success: true, data: normalizedMahals });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "An error occurred while sorting" });
    }
  };
  