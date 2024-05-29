const express = require('express');
const ejs = require('ejs');
const db2 = require('./db2.js');

const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));


/////////////End points

app.get("/students", async (req, res) => {
  const sql = `SELECT * FROM students;`
  const students = await db2.query(sql);
  res.json(students)
})

app.get("/courses", async (req, res) => {
  const sql = `SELECT * FROM courses;`
  const courses = await db2.query(sql);
  res.json(courses)
})

app.get("/student_courses", async (req, res) => {
  const sql = `SELECT * FROM student_courses;`
  const student_courses = await db2.query(sql);
  res.json(student_courses)
})


app.get("/student/id/:id", async (req, res) => {
  const sql = `SELECT s.fname, s.lname, c.name FROM students s JOIN student_courses sc ON s.id = sc.students_id JOIN courses c ON sc.courses_id = c.id WHERE s.id = ${req.params.id}`
  const student_courses = await db2.query(sql);
  res.json(student_courses)
})


app.get("/student/fname/:fname", async (req, res) => {
  const sql = `SELECT s.fname, s.lname, c.name FROM students s JOIN student_courses sc ON s.id = sc.students_id JOIN courses c ON sc.courses_id = c.id WHERE s.fname = "${req.params.fname}"`
  const student_courses = await db2.query(sql);
  res.json(student_courses)
})

app.get("/student/lname/:lname", async (req, res) => {
  const sql = `SELECT s.fname, s.lname, c.name FROM students s JOIN student_courses sc ON s.id = sc.students_id JOIN courses c ON sc.courses_id = c.id WHERE s.lname = "${req.params.lname}"`
  const student_courses = await db2.query(sql);
  res.json(student_courses)
})

app.get("/student/town/:town", async (req, res) => {
  const sql = `SELECT s.fname, s.lname, c.name FROM students s JOIN student_courses sc ON s.id = sc.students_id JOIN courses c ON sc.courses_id = c.id WHERE s.town = "${req.params.town}"`
  const student_courses = await db2.query(sql);
  res.json(student_courses)
})

app.get("/courses/id/:id", async (req, res) => {
  const sql = `SELECT c.name, s.fname, s.lname FROM courses c JOIN student_courses sc ON c.id = sc.courses_id JOIN students s ON sc.students_id = s.id WHERE c.id = ${req.params.id}`
  const courses = await db2.query(sql);
  res.json(courses)
})

app.get("/courses/name/:name", async (req, res) => {
  const sql = `SELECT c.name, s.fname, s.lname FROM courses c JOIN student_courses sc ON c.id = sc.courses_id JOIN students s ON sc.students_id = s.id WHERE c.name = "${req.params.name}"`
  const courses = await db2.query(sql);
  res.json(courses)
})

app.get("/courses/cname/:cname", async (req, res) => {
  const sql = `SELECT c.name, s.fname, s.lname FROM courses c JOIN student_courses sc ON c.id = sc.courses_id JOIN students s ON sc.students_id = s.id WHERE c.name LIKE "%${req.params.cname}%"`;
  const courses = await db2.query(sql);
  res.json(courses)
})

app.get("/courses/description/:description", async (req, res) => {
  const sql = `SELECT c.name, s.fname, s.lname FROM courses c JOIN student_courses sc ON c.id = sc.courses_id JOIN students s ON sc.students_id = s.id WHERE c.description LIKE "%${req.params.description}%"`;
  const courses = await db2.query(sql);
  res.json(courses)
})

const port = 3001;
app.listen(port, () => {
  console.log(`server is running on  http://localhost:${port}/`);
});