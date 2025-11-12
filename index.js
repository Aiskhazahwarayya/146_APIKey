const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: 'localhost',
  port: 3309,  
  user: 'root',      
  password: 'Aiszr131004',    
  database: 'apikey_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Terhubung ke database MySQL');
});


