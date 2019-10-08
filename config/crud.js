const getOneById = model => async (req, res) => {
  const modelId = req.params.id;
  try {
    if (!modelId) {
      const error = new Error("No Id specified");
      error.statusCode = 404;
      throw error;
    }
    const doc = await model.findById(modelId).exec();
    if (!doc) {
      const error = new Error("No Data Fetched");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      data: doc
    });
  } catch (err) {
    if (!err.statusCode) {
      console.log(err);
      return res.status(500).end();
    } else {
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
};

const getMany = model => async (req, res) => {
  try {
    const docs = await model.find().exec();
    if (!docs) {
      const error = new Error("No Data Fetched");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ data: docs });
  } catch (err) {
    if (!err.statusCode) {
      // console.log(err);
      res.status(500).end();
    } else {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};

const createOne = model => async (req, res) => {
  try {
    const createdDoc = await model.create({ ...req.body });
    res.status(201).json({ data: createdDoc });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

const updateOne = model => async (req, res) => {
  const modelId = req.params.id;
  try {
    const updatesDoc = await model
      .updateOne(
        {
          _id: modelId
        },
        req.body,
        { new: true }
      )
      .exec();
    if (!updatesDoc) {
      const error = new Error("No Data Found");
      error.statusCode = 404;
      throw error;
    }
    res.status(201).json({ data: updatesDoc });
  } catch (err) {
    if (!err.statusCode) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};
const removeOne = model => async (req, res) => {
  const modelId = req.params.id;
  try {
    const deletesDoc = await model.deleteOne({
      _id: modelId
    });
    if (!deletesDoc) {
      const error = new Error("No Data Found");
      error.statusCode = 404;
      throw error;
    }
    res.status(201).json({ data: deletesDoc });
  } catch (err) {
    if (!err.statusCode) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(err.statusCode).json({ message: err.message });
    }
  }
};
exports.controller = model => ({
  getOneById: getOneById(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model)
});
