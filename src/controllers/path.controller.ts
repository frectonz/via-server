import Path from "../models/Path.model";
import asyncHandler from "../utils/async";

// @desc      Register a path
// @route     POST /api/path/new
// @access    Private
export const newPath = asyncHandler(async (req, res) => {
  let path = await Path.create({
    to: req.body.to,
    from: req.body.from,
    images: req.body?.images,
    busPrice: req.body?.busPrice,
    ladaPrice: req.body?.ladaPrice,
    minBusPrice: req.body?.minBusPrice,
    approved: false,
  });

  res.status(201).json({
    data: path,
    success: true,
  });
});

// @desc      Search a path
// @route     POST /api/path/search/:fromName/:toName
// @access    Private
export const searchPath = asyncHandler(async (req, res) => {
  const paths = await Path.find({
    approved: true,
    "to.name": req.params.toName,
    "from.name": req.params.fromName,
  });

  res.status(200).json({
    success: true,
    data: paths,
  });
});

// @desc      Get path by id
// @route     POST /api/path/:id
// @access    Private
export const getPathById = asyncHandler(async (req, res) => {
  const path = await Path.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: path,
  });
});
