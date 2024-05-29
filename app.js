
const express = require('express');
const ejs = require('ejs');
const db = require('./db.js');

const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));


let selectedTable;


app.get('/', async (req, res) => {
    const pageTitle = "Home";
    const sql = 'SHOW TABLES';
    const dbData = await db.query(sql);
    res.render('index', { pageTitle, dbData });
});

app.post('/', async (req, res) => {
    const tableName = req.body;
    const pageTitle = "Home";
    const sql = `SELECT * FROM ${tableName.table_name}`;
    const dbData = await db.query(sql);
    const sql2 = `DESCRIBE ${tableName.table_name}`;
    const dbHeaders = await db.query(sql2);

    selectedTable = tableName.table_name;
    res.render('index', { pageTitle, dbData, dbHeaders });
});

//////update

app.get('/update.ejs', async (req, res) => {
    const pageTitle = "Update";
    const sql = `SHOW TABLES`;
    const dbData = await db.query(sql);
    res.render('update', { pageTitle, dbData });
});

let selected_update;
app.post('/selectupdate.ejs', async (req, res) => {
    selected_update = req.body.name;
    const pageTitle = "Update";

    const sql = `SELECT * FROM ${selected_update}`;

    const sql2 = `DESCRIBE ${selected_update}`;
    const dbHeaders = await db.query(sql2);
    const dbData = await db.query(sql);
    res.render('update', { pageTitle, dbData, dbHeaders });
});

app.post('/update.ejs', async (req, res) => {
    const updateInfo = req.body;
    const pageTitle = "Update";

    const updatedInfo = `UPDATE ${selected_update} SET ${updateInfo.column} = "${updateInfo.updated}" WHERE id = ${updateInfo.id}`;
    const dbDataUpdate = await db.query(updatedInfo);
    const sql = `SELECT * FROM ${selected_update}`;

    const dbData = await db.query(sql);
    const sql2 = `DESCRIBE ${selected_update}`;
    const dbHeaders = await db.query(sql2);

    res.render('update', { pageTitle, dbData, dbHeaders });
});



//Remove sidan 


app.get('/remove.ejs', async (req, res) => {
    const pageTitle = "Remove";
    const sql = `SHOW TABLES`;
    const dbData = await db.query(sql);
    res.render('remove', { pageTitle, dbData });
});

let selected_remove;
app.post('/selectRemove.ejs', async (req, res) => {
    selected_remove = req.body.name;
    const pageTitle = "Remove";

    const sql = `SELECT * FROM ${selected_remove}`;
    const dbData = await db.query(sql);

    const sql2 = `DESCRIBE ${selected_remove}`;
    const dbHeaders = await db.query(sql2);

    res.render('remove', { pageTitle, dbData, dbHeaders });
});


app.post('/remove.ejs', async (req, res) => {
    const idReq = req.body;
    const pageTitle = "Remove";

    const del = `DELETE FROM ${selected_remove} WHERE id = ${idReq.id}`;

    const dbDataDel = await db.query(del);
    const sql = `SELECT * FROM ${selected_remove}`;

    const sql2 = `DESCRIBE ${selected_remove}`;
    const dbHeaders = await db.query(sql2);

    const dbData = await db.query(sql);
    res.render('remove', { pageTitle, dbData, dbHeaders });
});



//Add sida

app.get('/add.ejs', async (req, res) => {
    const pageTitle = "Add";
    const sql = 'SHOW TABLES';
    const hideColumns = "";

    const dbData = await db.query(sql);
    res.render('add', { pageTitle, dbData, hideColumns });
});

let selectedTable2;

app.post('/selectAdd', async (req, res) => {
    selectedTable2 = req.body;

    const pageTitle = "Add";
    const hideColumns = selectedTable2.selected_table ? selectedTable2.selected_table : "";
    const describedData = `DESCRIBE ${selectedTable2.selected_table};`;
    const dbData = await db.query(describedData);

    res.render('add', { pageTitle, dbData, hideColumns });
});


app.post('/add', async (req, res) => {

    const userInfo = req.body;
    const pageTitle = "Add";

    let userInfoKey = '';
    let userInfoValue = '';
    let amount = '';
    for (const key in userInfo) {
        userInfoKey += key + ", ";
        userInfoValue += userInfo[key] + ", ";
        amount += '?, ';

    }

    const columns = userInfoKey.slice(0, -2);

    const addRow = `INSERT INTO ${selectedTable2.selected_table}(${columns}) VALUES (${amount.slice(0, -2)});`;

    const rowAdded = await db.query(addRow, Object.values(userInfo));

    const sql = `SHOW TABLES;`;
    const dbData = await db.query(sql);
    const hideColumns = "";

    res.render('add', { pageTitle, dbData, hideColumns });
});


const port = 3000;
app.listen(port, () => {
    console.log(`server is running on  http://localhost:${port}/`);
});