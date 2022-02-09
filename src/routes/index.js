const router = require("express").Router();

router.use("/api/posts", require("./api/posts"));
router.use("/api/users", require("./api/users"));

module.exports = router;