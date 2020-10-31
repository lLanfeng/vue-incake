const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')
//跨域
app.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
})
//连接数据库
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'incake'
})
connection.connect()



app.get('/index', (req, res) => {
  console.log(req.query.id);
  connection.query(`select * from first_page where tab='${req.query.id}';`, function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});
app.get('/detail', (req, res) => {
  connection.query(`select * from details where tab='${req.query.id}';`, function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});
//购物车
app.get('/cars', (req, res) => {
  connection.query('insert into cars(title,titles,img,price,scale,num,judge) values("'+req.query.title+'","'+req.query.titles+'","'+req.query.pic+'","'+req.query.price+'","'+req.query.scale+'","'+req.query.num+'","'+req.query.judge+'");', function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});
// 购物车查询
app.get('/car', (req, res) => {
  connection.query(`select * from cars;`, function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});
// 购物车删除
app.get('/del', (req, res) => {
  connection.query(`delete from cars where id=${req.query.id};`, function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});
// 注册
app.get('/sign', (req, res) => {
  console.log(req.query.id,req.query.psd);
  connection.query('insert into userinfo(tel,password) values("'+req.query.id+'","'+req.query.psd+'");', function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});
// 查询
app.get('/demand', (req, res) => {
  connection.query(`select * from userinfo where tel=${req.query.id};`, function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});
// 优惠
app.get('/cheap', (req, res) => {
  connection.query(`select * from details where youhui="cake";`, function (err, result) {
      const obj={
          status: 200,
          data: result
      }
      res.json(obj)
  })
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})