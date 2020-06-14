var express = require('express');
var router = express.Router();

var handler = require("./handers")

// 注册接口
router.post("/register", handler.registerHandler)
// 登录接口
router.post("/login", handler.loginHandler)

module.exports = router;
