//all the modules
const express = require('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
const SQL = require('./db/db');
const CRUD = require('./db/CRUD');
const CRUDdb = require('./db/createDB');
const port = 3000;
const fs = require('fs');
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const CSVToJSON = require('csvtojson');
const cookieParser = require('cookie-parser')

app.use(express.static(path.join(__dirname,'static')));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
app.use(cookieParser());

//set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/CreateStudents',CRUDdb.CreateStudents);
app.get('/InsertDataStudents',CRUDdb.InsertDataStudents);
app.get('/ShowStudents', CRUDdb.ShowStudents);
app.get('/DropStudents', CRUDdb.DropStudents);
app.get('/CreateClasses',CRUDdb.CreateClasses);
app.get('/InsertDataClasses',CRUDdb.InsertDataClasses);
app.get('/ShowClasses', CRUDdb.ShowClasses);
app.get('/DropClasses', CRUDdb.DropClasses);
app.get('/CreateBuilding',CRUDdb.CreateBuilding);
app.get('/InsertDataBuilding',CRUDdb.InsertDataBuilding);
app.get('/ShowBuilding', CRUDdb.ShowBuilding);
app.get('/DropBuilding', CRUDdb.DropBuilding);
app.get('/DropTables', CRUDdb.DropTables);


//all the routs


app.get('/', (req, res)=>{
    res.redirect('/HomePage');
});

app.get('/HomePage', (req, res)=>{
    res.render('HomePage');
});

app.get('/WelcomePage', (req, res)=>{
    let userCookie = req.cookies.StudentName;
    res.render('WelcomePage', {v1: userCookie});

});

app.get('/SearchPage', (req, res)=>{
    res.render('SearchPage');
});

app.get('/ResultsPage', (req, res)=>{
    let userCookieClass = req.cookies.className;
    res.render('ResultsPage', {v2: userCookieClass});
});

app.get('/AromaOrder', (req, res)=>{
    let aromadata=[
        {
            id: 1,
            name:"שוקו חם",
            price:"16.00₪",
            img:'graphics/hotchoko.png',
            count: "0"
    
        },
        {
            id: 2,
            name:"תה",
            price:"10.00₪",
            img:'graphics/tea.png',
            count: "0"
    
        },{
            id: 3,
            name:"הפוך",
            price:"14.00₪",
            img:'graphics/capuchino.png',
            count: "0"
    
        },{
            id: 4,
            name:"אספרסו",
            price:"9.00₪",
            img:'graphics/espresso.png',
            count: "0"
    
        },{
            id: 5,
            name:"סלט חלומי",
            price:"39.00₪",
            img:'graphics/halumi.png',
            count: "0"
    
        },{
            id: 6,
            name:"סלט טונה",
            price:"44.00₪",
            img:'graphics/tuna.png',
            count: "0"
    
        },{
            id: 7,
            name:"כריך חביתה",
            price:"32.00₪",
            img:'graphics/omlet.png',
            count: "0"
    
        },{
            id: 8,
            name:"כריך סלמון",
            price:"40.00₪",
            img:'graphics/salmon.png',
            count: "0"
    
        },
    ]
    res.render('AromaOrder', {product: aromadata} );
});

app.get('/OrderDetails', (req, res)=>{
    let userCookieDetails = JSON.parse(req.cookies.shoppingBagString)
    console.log(req.cookies.shoppingBagString)
    res.render('OrderDetails',{v3: userCookieDetails} );
});

app.get('/NevigationPage', (req, res)=>{
    res.render('NevigationPage');
});

app.get('/Map', (req, res)=>{
    res.render('Map');
});

app.get('/AboutPage', (req, res)=>{
    res.render('AboutPage');
});

app.all('/SingUpPage', (req, res)=>{
    res.render('SingUpPage')
});

app.post('/NewStudent',CRUD.NewStudent)

app.post('/FindStudent',CRUD.FindStudent)

app.post('/FindClasses',CRUD.FindClasses)

app.post('/Navigate',CRUD.Navigate)

app.get('/ChoosenClass', (req, res)=>{
    // validate body exists
    console.log("in drop")
    let userCookieclasswont = JSON.parse(req.cookies.classwont)
    let userCookiechoosenClass = JSON.parse(req.cookies.choosenClass)
    if (!userCookiechoosenClass) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    // insert input data from body 
    const data = [userCookiechoosenClass.building, userCookiechoosenClass.class, userCookiechoosenClass.start, userCookiechoosenClass.end]
    // run quries
    console.log(userCookiechoosenClass.start)
    console.log(userCookieclasswont)
    console.log(userCookiechoosenClass.start.includes(userCookieclasswont.start))
    console.log(userCookieclasswont.end<userCookiechoosenClass.end)
    if (userCookiechoosenClass.start.includes(userCookieclasswont.start) && userCookiechoosenClass.end.includes(userCookieclasswont.end)){
        const Q7 = "DELETE FROM Classes WHERE building=? and class=? and start=? and end=? "
        SQL.query(Q7, data, (err, results) =>{
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message:"בעיה בשריון בניין"});
                return;
            }
        })
    }
    if (userCookiechoosenClass.start.includes(userCookieclasswont.start) && userCookiechoosenClass.end>userCookieclasswont.end){
        console.log("hereeeeeee")
        let newdata =[userCookieclasswont.end, userCookieclasswont.building, userCookiechoosenClass.class, userCookieclasswont.start]
        const Q8 = "UPDATE Classes SET start=? WHERE building=? and class=? and start=? "
        SQL.query(Q8, newdata,  (err, results) =>{
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message:"בעיה בשריון בניין"});
                return;
            }
            
            console.log(Q8)
            console.log(newdata)
            console.log(results)
        })
    }
    if (userCookiechoosenClass.start<userCookieclasswont.start && userCookiechoosenClass.end.includes(userCookieclasswont.end)){
        let newdata =[userCookieclasswont.start, userCookieclasswont.building, userCookiechoosenClass.class, userCookieclasswont.end]
        const Q9 = "UPDATE Classes SET end=? WHERE building=? and class=? and start=? "
        SQL.query(Q9, newdata,  (err, results) =>{
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message:"בעיה בשריון בניין"});
                return;
            }
        })
    }
    if (userCookiechoosenClass.start<userCookieclasswont.start && userCookiechoosenClass.end>userCookieclasswont.end){
        var Q10 = "INSERT INTO Classes SET ?";
        let newdata =[userCookieclasswont.building, userCookiechoosenClass.class, userCookieclasswont.date, userCookiechoosenClass.start, userCookieclasswont.start]
            SQL.query(Q10, newdata,  (err, results) =>{
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message:"בעיה בשריון בניין"});
                return;
            }
        })
        let newdata2 =[userCookieclasswont.building, userCookiechoosenClass.class, userCookieclasswont.date, userCookieclasswont.end,userCookiechoosenClass.end]
        SQL.query(Q10, newdata2,  (err, results) =>{
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message:"בעיה בשריון בניין"});
                return;
            }
        })
        let newdata3 =[userCookiechoosenClass.building, userCookiechoosenClass.class, userCookiechoosenClass.start, userCookiechoosenClass.end]
        const Q11 = "DELETE FROM Classes WHERE building=? and class=? and start=? and end=? "
        SQL.query(Q11, newdata3,  (err, results) =>{
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message:"בעיה בשריון בניין"});
                return;
            }
        })
    }
    
    let userCookie = req.cookies.StudentName;
    res.render('WelcomePage', {v1: userCookie});
})  ;

//listen
app.listen(port, () => {
    console.log("Server is running on port "+ port);
});