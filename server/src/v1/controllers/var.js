const Var = require("../models/Var");

const getAllVars = async (req, res, next) => {

  try {
    const varList = await Var.find();
    return res.status(200).json({ varList });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
  
};

exports.getAllVars = getAllVars;
