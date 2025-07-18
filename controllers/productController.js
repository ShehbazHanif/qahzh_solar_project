const mongoose = require('mongoose');
const Product = require('../models/product');

const sellProduct = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name,type, condition,brand,governorate,city,location, price, phone, images } = req.body;

    if ( !name|| !phone || !type || !price ||!condition || !brand ||!governorate  || !city ||!location) {
      await session.abortTransaction();
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    const product = await Product.create([{
      name,
      price,
      phone,
      images,
      type,
      condition,
      governorate,
      city,
      location,
      brand
    }], { session });

    await session.commitTransaction();
    res.status(200).json({
      msg: 'Product saved temporarily. Please register or confirm your number.',
      product

    });

  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  } finally {
    session.endSession();
  }
};
const productController ={
    sellProduct
}
module.exports = productController;
