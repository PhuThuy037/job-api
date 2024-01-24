const Jobs = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");
const getAllJob = (req, res) => {
  res.send("Get all job");
};
const getJob = (req, res) => {
  res.send("Get  job");
};
const creatJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = (req, res) => {
  res.send("update job");
};
const deleteJob = (req, res) => {
  res.send("delete job");
};
module.exports = { getAllJob, getJob, creatJob, updateJob, deleteJob };
