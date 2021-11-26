const { request } = require('express');
const express = require('express');
const { route } = require('.');
const router = express.Router();
const pool = require('../database.js');

router.get('/', async (req, res) =>{
    let listProducts = await pool.query('SELECT * FROM products');
    res.json({
        status: 200,
        message: 'Se ha listado correctamente',
        listProducts: listProducts
    });
});

router.get('/:id', async (req, res) => {
    const{id} = req.params;
    let product = await pool.query('SELECT * FROM products WHERE idProduct = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado correctamente",
        product: product
    });
});

router.post('/create', async (req, res) =>{
    const {name, price} = req.body;
    const product = {
        name, price, status: 1
    };
    await pool.query('INSERT INTO products set ?', [product]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente", 
        product: product
    });
});

router.post('/update/:id', async (req, res) =>{
    const {id} = req.params;
    const {name, price} = req.body;

    const product = {name, price};
    await pool.query('UPDATE products SET ? WHERE idProduct = ?', [product, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        product: product
    });
});

router.post('/delete/:id', (req, res) =>{
    const {id} = req.params;
    pool.query('UPDATE products SET status = 0 WHERE idProduct= ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
});

module.exports = router;