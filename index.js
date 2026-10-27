import express from 'express';
const app = express();
import path from 'path';
import mysql from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

app.listen("8080", ()=>{
    console.log("Listening on port 8080");
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

//Home Route
app.get("/tasks", (req, res)=>{
    let {search, status, priority} = req.query;
    search = search?.trim();
    let conditions = [];
    let values = [];
    if(search){
        conditions.push('title LIKE ?');
        values.push(`%${search}%`);
    }
    if(status){
        conditions.push('status=?');
        values.push(`${status}`);
    }
    if(priority){
        conditions.push('priority=?');
        values.push(`${priority}`);
    }
    let condition = conditions.join(" AND ");

    try{
        let totalTasks = 0;
        let pendingTasks = 0;
        let inProgressTasks = 0;
        let completedTasks = 0;
        let statsQ = `SELECT
                        COUNT(*) AS totalTasks,
                        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pendingTasks,
                        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) AS inProgressTasks,
                        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completedTasks
                    FROM tasks;`
        connection.query(statsQ, (err, result)=>{
            if(err) throw err;
            totalTasks = result[0]["totalTasks"];
            pendingTasks = result[0]["pendingTasks"];
            inProgressTasks = result[0]["inProgressTasks"];
            completedTasks = result[0]["completedTasks"];
        });

        let q = "SELECT *, DATE_FORMAT(created_at, '%d/%m/%Y') AS task_date FROM tasks";
        if(conditions.length != 0){
            q += " WHERE " + condition;
        }
        q += ` ORDER BY
            CASE status
                WHEN 'Pending' THEN 1
                WHEN 'In Progress' THEN 2
                WHEN 'Completed' THEN 3
                ELSE 4
            END`;

        connection.query(q, values, (err, result)=>{
            if(err) throw err;
            let tasks = result;// console.log(tasks);
            res.render("index.ejs", {tasks, search, status, priority, totalTasks, pendingTasks, inProgressTasks, completedTasks});
        });
    }
    catch(err){
        console.log(err);
        res.send("Error");
    }
});

//New task Route
app.get("/tasks/new", (req, res)=>{
    let newId = uuidv4();
    res.render("add.ejs", {newId});
});

app.post("/tasks/:id", (req, res)=>{
    let {id} = req.params;
    let {title: newTitle, description: newDescription, status: newStatus, priority: newPriority} = req.body;
    try{
        let q = `INSERT INTO tasks(id, title, description, status, priority) VALUES ('${id}', '${newTitle}', '${newDescription}', '${newStatus}', '${newPriority}')`;
        connection.query(q, (err, result)=>{
            if(err) throw err;
            res.redirect("/tasks");
        });
    }
    catch(err){
        console.log(err);
        res.send("Error");
    }
});

// Edit route
app.get("/tasks/:id/edit", (req, res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM tasks WHERE id = '${id}'`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let task = result[0];
            res.render("edit.ejs", {task});
        });
    }
    catch(err){
        console.log(err);
        res.send("Error");
    }
});

app.patch("/tasks/:id", (req, res)=>{
    let {id} = req.params;
    let {title: newTitle, description: newDescription, status: newStatus, priority: newPriority} = req.body;
    let q = `UPDATE tasks SET title='${newTitle}', description='${newDescription}', status='${newStatus}', priority='${newPriority}' WHERE id='${id}'`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            console.log(result);
            res.redirect("/tasks");
        });
    }catch(err){
        console.log(err);
        res.render("Error");
    }
});

//Show route
app.get("/tasks/:id", (req, res)=>{
    let {id} = req.params;
    try{
        let q = `SELECT id, title, description, DATE_FORMAT(created_at, '%d/%m/%Y') AS task_date, status, priority FROM tasks WHERE id = '${id}'`;
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let task = result[0];
            res.render("show.ejs", {task});
        });
    }
    catch(err){
        console.log(err);
        res.send("Error");
    }
});

//Destroy route
app.delete("/tasks/:id", (req, res)=>{
    let {id} = req.params;
    let q = `DELETE FROM tasks WHERE id='${id}'`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            console.log(result);
            res.redirect("/tasks");
        });
    }
    catch(err){
        console.log(err);
        res.send("Error");
    }
});

app.post("/tasks/:id/toggle-completion", (req, res) => {
    const { id } = req.params;
    const q = `
        UPDATE tasks
        SET status = CASE
            WHEN status = 'Completed' THEN 'Pending'
            ELSE 'Completed'
        END
        WHERE id = ?`;

    connection.query(q, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Unable to update task status");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Task not found");
        }

        res.redirect("/tasks");
    });
});