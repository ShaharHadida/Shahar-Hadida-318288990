const SQL = require("./db");
const path = require("path");
const csv=require('csvtojson');
const cookieParser = require('cookie-parser');

const NewStudent = (req,res)=>{
        // validate body exists
        if (!req.body) {
            res.status(400).send({message: "content cannot be empty"});
            return;
        }
        // insert input data from body into json
        const NewStudent = {
            "email": req.body.emailsing,
            "password": req.body.passwordsing,
            "firstname":req.body.firstname,
            "lastname": req.body.lastname
        }
        // run quries
        const Q1 = "SELECT * FROM Students WHERE email =?"
        SQL.query(Q1, req.body.emailsing, (err, results) =>{
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message:"בעיה עם הכנסת משתמש"});
                return;
            }if (results.length != 0){
                console.log("error: error: ", err);
                res.render('SingUpPage',{v2: "קיים משתמש עם מייל זהה"});
                return;
            }
            const Q2 = 'INSERT INTO Students SET ?';
            SQL.query(Q2, NewStudent, (err) =>{
                if (err) {
                    console.log("error: error: ", err);
                    res.status(400).send({message:"בעיה בהכנסת הסטונדט"});
                    return;
                }
                res.redirect('/HomePage');
                return;
            })
        })

} ;

const FindStudent = (req,res)=>{
        // validate body exists
        if (!req.body) {
            res.status(400).send({message: "content cannot be empty"});
            return;
        }
        // insert input data from body 
        const data = [req.body.emailOpen, req.body.passwordOpen]
        // run quries
        const Q3 = "SELECT * FROM Students WHERE email=? and password=?"
        SQL.query(Q3, data, (err, results) =>{
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message:"בעיה במציאת משתמש"});
                return;
            }
            if (results.length == 0){
                console.log("error: error: ", err);
                res.render('HomePage',{v3: "שם משתמש או סיסמה לא תקינים"});
                return;
            }
            res.cookie("StudentName", results[0].firstname);
            res.redirect('/WelcomePage');
            return;
        })
         
} ;


const FindClasses = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    // insert input data from body 
    console.log(req.body)
    const data = [req.body.serchBuilding, req.body.date, req.body.start, req.body.end]

    // run quries
    const Q4 = "SELECT * FROM Classes WHERE building=? and date=? and start<=? and end>=?";
    SQL.query(Q4, data, (err, results) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"בעיה במציאת כיתות"});
            return;
        }
        if (results.length == 0) {
            console.log("error: error: ");
            res.render('SearchPage',{v4: "אין כיתות פנויות"});
            return;
        }
        let processedResults = 0;
        results.forEach(element => {
            let Q5 = "SELECT * FROM Building WHERE building=?";
            SQL.query(Q5, element.building, (err, mySQLres) => {
                if (err) {
                    console.log("error: error: ", err);
                    res.status(400).send({message:"בעיה במציאת מיקום"});
                    return;
                }
                if (mySQLres.length == 0) {
                    console.log("error: error: ");
                    res.status(400).send({message:"בעיה במציאת מיקום"});
                    return;
                }
                element.location = mySQLres[0].location;
                processedResults++;
                if (processedResults === results.length) {
                    console.log(results);
                    res.cookie("className", results);
                    res.redirect('/ResultsPage');
                    return;
                }
            });
        });
    });
};

const Navigate = (req,res)=>{
    // validate body exists
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    // insert input data from body 
    const data = [req.body.buildingSelect]
    // run quries
    const Q5 = "SELECT * FROM Building WHERE building=??"
    SQL.query(Q5, data, (err, results) =>{
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message:"בעיה במציאת בניין"});
            return;
        }
        res.redirect(results.location);
        return;
    })     
};



module.exports = {NewStudent, FindStudent, FindClasses, Navigate}