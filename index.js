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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/create', (req, res) => {
  const apiKey = crypto.randomBytes(16).toString('hex');

  db.query('INSERT INTO api_keys (api_key) VALUES (?)', [apiKey], (err) => {
    if (err) {
      console.error('Gagal menyimpan API key:', err);
      return res.status(500).json({ 
        success: false,
        message: 'Terjadi kesalahan saat menyimpan API Key!'
      });
    }
    res.json({ 
      success: true,
      message: 'API Key berhasil dibuat dan disimpan!',
      apiKey 
    });
  });
});






