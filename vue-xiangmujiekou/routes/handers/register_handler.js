
// 数据库模块
const connect = require("../../modules/connect")

const registerHandler = (req, res, next) => {
    let params = req.body
    let content = {err: null, data: {}}
    // 连接数据库
    connect((db, close) => {
        // 查找数据库中是否有此用户的数据
        let admin = db.collection('admin');
        admin.find({usernumber: params.usernumber}).toArray((err, results) => {
            // console.log(results)
            if (err) {
                console.log(err)
                content = {err: 500, data: {}}
                // 返回信息 关闭数据库
                res.send(content); close()
                return false
            } 
            if (results.length) {
                // 有此用户的信息
                content = {err: 400, data: {}}
                res.send(content); close()
            } else {
                // 插入一条数据
                admin.insertOne(params, (err, results) => {
                    if (!err) {
                        //注册成功
                        content = {err: 200, data: {}}
                    } else{
                        // 注册失败
                        content = {err: 500, data: {}}
                    }
                    res.send(content); close()
                });
            }
        })

    })
}

module.exports = registerHandler