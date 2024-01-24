const getAllJob = (req, res) => {
  res.send("Get all job");
};
const getJob = (req, res) => {
  res.send("Get  job");
};
const creatJob = (req, res) => {
  res.json(req.user);
};
const updateJob = (req, res) => {
  res.send("update job");
};
const deleteJob = (req, res) => {
  res.send("delete job");
};
module.exports = { getAllJob, getJob, creatJob, updateJob, deleteJob };
