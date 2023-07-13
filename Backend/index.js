import express from "express";
import mysql from "mysql";
import cors from "cors";



const app= express()
app.use(cors())


const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"books"
})


  

app.get("/books",(req,res)=>{
    const q= "SELECT * FROM  books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.use(express.json())
app.post("/books",(req,res)=>{
    const q="INSERT INTO books.books(`title`,`Disc`,`price`,`cover`) VALUES (?)";
    const values =[
    req.body.title,
    req.body.Disc,
    req.body.price,
    req.body.cover,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been created");
    })
})


app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books.books WHERE id = ?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully.");

    })
})

//update
app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books.books SET `title`=?,`Disc`=?,`price`=?,`cover`=? WHERE id=?";

    const values =[
        req.body.title,
        req.body.Disc,
        req.body.price,
        req.body.cover,
        ];

    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been updated successfully.");

    })
})

app.listen(8800, ()=>{
    console.log("connected to backend!")
})