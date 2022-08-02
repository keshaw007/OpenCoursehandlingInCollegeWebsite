var express=require('express');

const ejs=require('ejs');


const MongoClient=require('mongodb').MongoClient;
const url="mongodb+srv://vivekraiv100:ramR00@cluster0.1nplp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const bodyParser=require('body-parser');
const { json } = require('express/lib/response');

var app=express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());


var db;
MongoClient.connect(url, function(err, client){
    if(err) throw err;
    db=client.db('firstdb');
    app.listen(8080);
    console.log('Listening on 8080');
})

app.set('view engine', 'ejs');



app.get('/', function(req,res){
    res.render('pages/_Home');
})


app.get('/login', function(req,res){
    res.render('pages/login');
})






// addStudent route
app.post('/addStudent', function(req, res){
    
    var name=req.body.name;
    var email = req.body.email;
     var password=req.body.password;
     var stdDetails={"email":email, "password":password, "name":name};
     db.collection('students').insertOne(stdDetails, function(err, result){
         if(err) throw err;
         console.log(result);
        
        res.render('pages/welcome');
     })
});




// route for authentication of the student

app.post('/authStd', function(req, res){
    var email=req.body.email
    var password=req.body.password
    db.collection('students').find({"email":req.body.email}).toArray(function(err, result){

        console.log("Courses "+JSON.stringify(result));
        var resp=""
        if(err){
            resp="User Not Found !"
            console.log(err);
            res.render('pages/error',{
                error:resp
            })
        }
        if(result.length>0){

            var enrollment=result[0].password
            if(enrollment==password){
                res.render('pages/student1', {
                    studentDetails:result[0].courses,
                    studentName:result[0].name
                })
            }
            else{
                resp="Wrong Password !"
                res.render('pages/error',{
                    error:resp
                })
            }
        }
        else{
            resp="User Not Found !"
            console.log(resp);
            res.render('pages/error', {
                error:resp
            })
        }
    })
})

// route for authentication of faculty

app.post('/authTea', function(req, res){
    var email=req.body.email
    var password=req.body.password
    db.collection('teachers').find({"email":req.body.email}).toArray(function(err, result){
        if(err) throw err;
        console.log("Courses "+JSON.stringify(result));
        var resp=""
        if(err){
            resp="User Not Found !"
            console.log(err);
            res.render('pages/error',{
                error:resp
            })
        }
        if(result.length>0){
            var name=result[0].name
         
            var pass=result[0].password
            if(pass==password){
                db.collection('courses').find({}).toArray(function(err, result){
                    console.log("Courses : "+JSON.stringify(result));
                    res.render('pages/teacher1', {
                        courseDetails:result,
                        name:name
                    });
                })
            }
            else{
                resp="Wrong Password !"
                res.render('pages/error',{
                    error:resp
                })
            }
        }
        else{
            resp="User Not Found !"
            console.log(resp);
            res.render('pages/error', {
                error:resp
            })
        }
    })
})

// route to redirect to operating system
app.get('/Operating', function(req, res){
    res.render('pages/os', {
        name:"Operating System"
    })
})

app.get('/Software', function(req, res){
    res.render('pages/os', {
        name:"Software Engineering"
    })
})

app.get('/Discrete', function(req, res){
    res.render('pages/os', {
        name:"Discrete Mathematics and Graph Theory"
    })
})

app.get('/Design', function(req, res){
    res.render('pages/os', {
        name:"Design Principles of Programming Languages"
    })
})

app.get('/Desing', function(req, res){
    res.render('pages/os', {
        name:"Design and Analysis of Algorithms"
    })
})

app.get('/Electronics', function(req, res){
    res.render('pages/os', {
        name:"Electronics"
    })
})


app.get('/stdSignUP', function(req, res){
    res.render('pages/stdSignUp1')
})
app.get('/teaSignUP', function(req, res){
    res.render('pages/teaSignUp1')
})

app.get('/logout', function(req, res){
    res.render('pages/Home')
})

app.get('/eLibrary', function(req, res){
    res.render('pages/E-Library')
})

app.get('/director', function(req, res){
    res.render('pages/director')
})

app.get('/recruitment', function(req, res){
    res.render('pages/recruitment')
})

app.get('/courses', function(req, res){

    db.collection('courses').find({}).toArray(function(err, result){
        if(err) throw err;
        console.log("Courses : "+JSON.stringify(result));
        res.render('pages/courses', {
            courseDetails:result,
            
        });
    })
})

app.get('/rti', function(req, res){
    res.render('pages/rti')
})
app.get('/contact', function(req, res){
    res.render('pages/contact')
})
app.get('/about', function(req, res){
    res.render('pages/about');
})