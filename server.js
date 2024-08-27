const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

// 設置MySQL資料庫連接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'carbon'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// API路由來獲取所有Category
app.get('/api/categories', (req, res) => {
    const sql = 'SELECT * FROM Category';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

//每五秒log回傳OK
setInterval(()=>{
    console.log('ok')
},1000 * 60 * 60 *7)


// API路由來根據Category ID獲取對應的Items
app.get('/api/items/:category_id', (req, res) => {
    const sql = 'SELECT * FROM Item WHERE category_id = ?';
    db.query(sql, [req.params.category_id], (err, result) => {
    if (err){
        console.error('SQL Error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(result);
    });
});

// 啟動服務器
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
