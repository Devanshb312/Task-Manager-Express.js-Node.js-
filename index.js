const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");


// set up form handlers 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// set up public static files
app.use(express.static(path.join(__dirname,"public")));

//set up ejs
app.set("view engine","ejs");


app.get("/",function(req,res){
    fs.readdir("./files",function(err,files){
        res.render('index',{files:files});
    }) 
})

app.get("/file/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render("show",{filename:req.params.filename,filedata:filedata});
         
    }) 
})

app.get("/edit/:filename",function(req,res){
    
        res.render("edit",{filename:req.params.filename});
         
})


app.post("/create",function(req,res){
     fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,function(err){

        res.redirect("/");
     })
})


app.post("/edit",function(req,res){
    fs.rename(`./files/${req.body.Previous}`,`./files/${req.body.New}`, function(err){
        res.redirect("/");
    })

    
})


app.listen(3000,function(){
    console.log("Working Successfully!");
})