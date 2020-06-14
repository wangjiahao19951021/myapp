const MongoClient = require('mongodb').MongoClient;


// 引入配置文件
const config = require('../config');

// 测试
// const assert = require('assert');
 
// // Connection URL
// const url = mongo_url;
 
// // Database Name
// const dbName = dbname;


 
// Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   // 测试模块
//   // assert.equal(null, err);
//   // console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   client.close();
// });

const connect = (callback) => {
  // Connection URL
  const url = config.mongo_url;
  
  // Database Name
  const dbName = config.dbname;
  console.log(url, dbName)

  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    const close = client.close.bind(client);


    callback(db, close)
    
  })
  
}

module.exports = connect