const {
  getAllJob,
  getJob,
  creatJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
const express = require("express");
const router = express.Router();

router.route("/").post(creatJob).get(getAllJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
