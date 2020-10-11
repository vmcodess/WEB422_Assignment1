/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Vladislav Matveev Student ID:032112138 Date: September 28, 2020
* Heroku Link: https://web422-assmt1.herokuapp.com/
* 
*
********************************************************************************/

//----------------
// .env
require('dotenv').config()
//----------------

const express = require("express");
const cors = require("cors");
//const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dataService = require("./modules/data-service.js");
const main = require("./js/main.js");

const myData = dataService(process.env.MONGO_DB_URL);

const app = express();

app.use(cors());
app.use(bodyParser.json());

// This tells express to make form data available via req.body in every request
app.use(bodyParser.urlencoded({ extended: false }));

const HTTP_PORT = process.env.PORT || 8080;

// ************* API Routes

// POST /api/sales (NOTE: This route must read the contents of the request body) // addNewSale 
app.post("/api/sales", async (req, res) => {
    await myData.addNewSale().then(results => { 
        res.status(200).send(results) 
    }).catch(err => { 
        res.status(500).send(err) 
    })
});


// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )    // getAllSales
app.get("/api/sales", async (req,res) => {
    await myData.getAllSales(req.query.page, req.query.perPage).then(results => {
        res.status(200).send(main)
    }).catch(err => {
        res.status(500).send(err)
    })
});


// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8) // getSalebyId
app.get("/api/sales/:id", async (req, res) => {
    await myData.getSaleById(req.params.id).then(results => { 
        res.status(200).send(results) 
    }).catch(err => { 
        res.status(500).send(err) 
    })
});


// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body) // updateSaleById
app.put("/api/sales/:id", async (req, res) => {
    await myData.updateSaleById(req.body, req.params.id).then(results => { 
        res.status(200).send(results) 
    }).catch(err => { 
        res.status(500).send(err) 
    })
});


// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)  //deleteSale
app.delete("/api/sales/:id", async (req, res) => {
    await myData.deleteSaleById(req.params.id).then(results => { 
        res.status(200).send(results) 
    }).catch(err => { 
        res.status(500).send(err) 
    })
});



// ************* Initialize the Service & Start the Server

myData.initialize().then(()=>{
    app.listen(HTTP_PORT,()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

