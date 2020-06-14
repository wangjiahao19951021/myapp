

// 数据库模块
const connect = require("../../modules/connect")

const loginHandler = (req, res, next) => {
    // 获取前端传递过来的参数
    let params = req.body;
    let content = {err: null, data: {}}
    connect ((db, close) => {
        const admin = db.collection('admin')
        admin.find({usernumber: params.usernumber}).toArray((err, results) => {
            if (err) {
                console.log(err);
                content.err = 500;
                res.send(content);
                close();
                return false;
            } else {
                // 如果用户存在
                if (results.length) {
                    if (results[0].pass === params.pass) {
                        // 密码正确
                        content.err = 200;
                        // 删除密码
                        delete results[0].password
                        // 将用户信息返回给前端
                        content.data = results[0]

                        res.send(content);
                        close();
                        return false;
                    } else {
                        // 密码错误
                        content.err = 401;
                        res.send(content);
                        close();
                        return false;
                    }

                } else {
                    // 用户不存在
                    content.err = 400;
                    res.send(content);
                    close();
                    return false;
                }
            }
            
        })
    })
}

module.exports = loginHandler