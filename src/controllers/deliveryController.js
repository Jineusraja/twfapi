const { calculateCost } = require('../utils/calculator');

exports.calculateDeliveryCost = (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ success: false, message: "Invalid or missing 'order' object in request body." });
  }

  try {
    const cost = calculateCost(req.body);
    res.json({cost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error calculating cost." });
  }
};
