const express = require("express");
const bodyParser = require("body-parser");
const mongoose =  require("mongoose")
const port = 3000;
const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/DBfruits");


app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.use(express.static('public'));
const schema = new mongoose.Schema({
  para : String
})

const home = mongoose.model('todoTable',schema);

app.get("/",(req,res) =>{
  home.find().then((data) => {
    res.render("file", { listTitle: "To-Day", arr: data,path: ""});
  }).catch((error) => {
    console.error(error);
  });
})

app.post("/", (req,res) =>{
  let newName = req.body.name_work;
    const newElement = new home({
      para : newName
    })
    newElement.save();
    res.redirect("/");
})

app.post("/", (req,res) =>{
  let newName = req.body.name_work;
    const newElement = new home({
      para : newName
    })
    newElement.save();
    res.redirect("/");
})

app.post("//delete",(req,res)=>{
 
  home.deleteOne({_id : req.body.items}).then(()=>
    console.log("sucess")
  );
  res.redirect(`/`);
})

app.get("/:path", (req, res) => {
  const path = req.params.path; 
  const get_table = mongoose.model(path, schema); 
  let date = new Date();
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const dayName = date.toLocaleDateString('hi-IN', options);
  
  get_table.find().then((data) => {
    res.render("file", { listTitle: `${dayName} का कार्य `, arr: data, path: path });
  }).catch((error) => {
    console.error(error);
  });
});



app.post("/:path",(req,res)=>{
  const road = req.params.path;
  const post_table = mongoose.model(road,schema);
  let newName = req.body.name_work;
    const newWork = new post_table({
      para : newName
    });
    newWork.save();
    res.redirect(`/${road}`);
    
})

app.post("/:path/delete",(req,res)=>{
  const road = req.params.path;
  const delete_table = mongoose.model(road,schema);
  console.log( req.body.items);
  delete_table.deleteOne({_id : req.body.items}).then(()=>
    console.log("sucess")
  );
  res.redirect(`/${road}`);
})



app.listen(port, () => {  
  console.log(`server has started listening at port: ${port}`);
});
