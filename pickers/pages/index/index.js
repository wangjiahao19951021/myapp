//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    datas: [
      {
          "name": "a",
          "nameid": "1",
          "names": [
              {
                  "name": "a1",
                  "nameid": "1-1"
              },
              {
                  "name": "a2",
                  "nameid": "1-2"
              }
          ]
      },
      {
          "name": "b",
          "nameid": "2",
          "names": [
              {
                  "name": "b1",
                  "nameid": "2-1"
              },
              {
                  "name": "b2",
                  "nameid": "2-2"
              }
          ]
      },
      {
        "name": "c",
        "nameid": "3",
        "names": [
            {
                "name": "c1",
                "nameid": "3-1"
            },
            {
                "name": "c2",
                "nameid": "3-2"
            },
            {
              "name": "c3",
              "nameid": "3-3"
          }
        ]
    }
  ],
  "bigs": [],   //大类类别数组

  "smalls":[],    //小类类别数组
  
  "bigid":0,     //大类类别编号
  
  "smallid":0, //小类类别编号
  
  "bigname":'',   //大类类别名称  
  
  "smallname":'',     //小类类别名称,
  tempdata: "",
  pickerss: [0, 0]


  
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


this. gets()
// console.log(this.data.bigs[0][this.data.pickerss[0]].nameid)
// console.log(this.data.bigs[1][this.data.pickerss[1]].nameid)
console.log(this.data.bigid +"/////"+ this.data.smallid)
  },
  gets: function () {
    var that = this
    // console.log(that.data.datas);
    const bigs = [[], []];
    const smalls = [[], []];
    that.setData({
        tempdata: that.data.datas
    });
    for (let i = 0; i < that.data.datas.length; i++) {
      var obj = new Object;
      obj.nameid = that.data.datas[i].nameid;
      obj.name = that.data.datas[i].name;
      bigs[0].push(obj);
  }
  
  for (let i = 0; i < that.data.datas[0].names.length; i++) {
      var obj1 = new Object;
      obj1.nameid = that.data.datas[0].names[i].nameid;
      obj1.name = that.data.datas[0].names[i].name;
      bigs[1].push(obj1);
  } 
  that.setData({
      'bigs': bigs,
      smalls: smalls,
      bigname: that.data.datas[0].name,//res2.data.data[0].name,
      smallname: that.data.datas[0].name.length>0?that.data.datas[0].names[0].name:'',   //小类的名称默认是大类的第一个子类名称
      bigid: that.data.datas[that.data.pickerss[0]].nameid,
      smallid: that.data.datas[that.data.pickerss[0]].names[that.data.pickerss[1]].nameid,
  });

  

    


    
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  bindMultiPickerChange: function (e) {
    // console.log(this.data.provinceid);//获取了省份编号
    // console.log(bigs[1]);//获取了城市编号
    // console.log(this.data.pickerss)
    // console.log(this.data.bigs)
    // console.log(this.data.pickerss[0])
    // console.log(this.data.bigs[0][this.data.pickerss[0]].nameid)
    // console.log(this.data.bigs[1][this.data.pickerss[1]].nameid)
    var that = this
    that.setData({
      bigid: this.data.bigs[0][this.data.pickerss[0]].nameid,
      smallid: this.data.bigs[1][this.data.pickerss[1]].nameid
    })
    console.log(this.data.bigid + this.data.smallid)


 
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this;
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
 
    switch (e.detail.column) {
      case 0:
        //当选择了大类的时候
        that.setData({
          "bigs[1]": that.data.tempdata[e.detail.value].names,
          "bigname": that.data.tempdata[e.detail.value].name,
          "bigid": that.data.tempdata[e.detail.value].nameid,
          "smallname": that.data.tempdata[e.detail.value].names.length > 0 ? that.data.tempdata[e.detail.value].names[0].name:'',
          "smallid": that.data.tempdata[e.detail.value].names.length > 0 ? that.data.tempdata[e.detail.value].names[0].nameid:0,
          'pickerss': [e.detail.value , 0]
        });
        break;
      case 1:
        //当选择了小类以后
        that.setData({
          "smallname": that.data.bigs[1][e.detail.value].name,
          "smallid": that.data.bigs[1][e.detail.value].nameid,
          'pickerss': [ that.data.pickerss[0], e.detail.value ,] 
        });
    }
  },



















})
