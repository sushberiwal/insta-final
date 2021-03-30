const express = require("express");
const multer =  require("multer");
const app = express();
const path = require("path");


app.use(express.static("public"));

//to see json data in req.body
app.use(express.json());


const storage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null, 'public/images');
    },
    filename: function(req , file, cb){
        console.log("Inside multer");
        console.log(file);
        cb(null , new Date(Date.now())+ path.extname(file.originalname));
    }
});

const fileFilter = function(req, file, cb){
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image.png' || file.mimetype == 'image.jpg'){
        cb(null, true); //accepts file only when true is passed
    }
    else{
        cb(null,  false); // file rejected
    }
};


const upload = multer({storage:storage , fileFilter : fileFilter});


app.post("/imageUpload" , upload.single('photo'), function(req , res){
    console.log("Inside callback function");
    console.log(req.file);
    console.log(req.body);
});

app.listen(3000, function(){
    console.log("App started at port 3000!!");
});