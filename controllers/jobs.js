const Jobs = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");
const getAllJob = async (req, res) => {
  const jobs = await Jobs.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).send({ jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Jobs.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`Cant find id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const creatJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Jobs.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body
  );
  if (!job) {
    throw new NotFoundError(`Cant find id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Jobs.findByIdAndRemove({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`Cant find id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
module.exports = { getAllJob, getJob, creatJob, updateJob, deleteJob };
