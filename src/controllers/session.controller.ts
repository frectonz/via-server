import asyncHandler from "../utils/async";
import Session from "../models/Session.model";
import generateToken from "../utils/generateToken";

// @desc      Register a session
// @route     POST /api/session/new
// @access    Public
export const newSession = asyncHandler(async (_, res) => {
  const token = await generateToken();

  const session = await Session.create({
    token,
  });

  res.status(201).json({
    success: true,
    data: {
      token: session.token,
    },
  });
});
