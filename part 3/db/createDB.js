const SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');


const CreateStudents = (req,res)=>{
    var Q1 = "CREATE TABLE Students (email VARCHAR(255), password VARCHAR(255), firstname VARCHAR(255), lastname VARCHAR(255), PRIMARY KEY (email))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table Students"});
            return;
        }
        console.log('created table Students');
        res.send("Students table created");
        return;
    })
};

const InsertDataStudents = (req,res)=>{
    var Q2 = "INSERT INTO Students SET ?";
    const csvFilePathStudents= path.join(__dirname, "csv/students.csv");
    csv()
    .fromFile(csvFilePathStudents)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "email": element.mail,
            "password": element.password,
            "firstname": element.firstname,
            "lastname": element.lastname
        }
        SQL.query(Q2, NewEntry, (err,mySQLres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    }); 
    res.send(" student data inserted");
};

const ShowStudents = (req,res)=>{
    var Q3 = "SELECT * FROM Students";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};

const DropStudents = (req, res)=>{
    var Q4 = "DROP TABLE Students";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
        })
    }

const CreateClasses = (req,res)=>{
    var Q5 = "CREATE TABLE Classes (building VARCHAR(255), class VARCHAR(255), date DATE, start TIME(0), end TIME(0), PRIMARY KEY (building, class, date, start, end))";
    SQL.query(Q5,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table Classes"});
            return;
        }
        console.log('created table Classes');
        res.send("Classes table created");
        return;
    })
};

const InsertDataClasses = (req,res)=>{
    var Q6 = "INSERT INTO Classes SET ?";
    const csvFilePathClasses= path.join(__dirname, "csv/Classes.csv");
    csv()
    .fromFile(csvFilePathClasses)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewSearch = {
            "building": element.building,
            "class": element.class,
            "date": element.date,
            "start": element.start,
            "end": element.end
        }
        SQL.query(Q6, NewSearch, (err,mySQLres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    }); 
    res.send(" Classes data inserted");
};

const ShowClasses = (req,res)=>{
    var Q7 = "SELECT building, class, DATE_FORMAT(date,'%y/%m/%d'), start, end  FROM Classes";
    SQL.query(Q7, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};

const DropClasses = (req, res)=>{
    var Q8 = "DROP TABLE Classes";
    SQL.query(Q8, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table Classes dropped");
        res.send("table Classes dropped");
        return;
        })
    }


const CreateBuilding = (req,res)=>{
        var Q10 = "CREATE TABLE Building (building VARCHAR(255), location VARCHAR(225), closes VARCHAR(255), PRIMARY KEY (building))";
        SQL.query(Q10,(err,mySQLres)=>{
            if (err) {
                console.log("error ", err);
                res.status(400).send({message: "error in creating table Building"});
                return;
            }
            console.log('created table Building');
            res.send("Building table created");
            return;
        })
    };
    
const InsertDataBuilding = (req,res)=>{
        var Q11 = "INSERT INTO Building SET ?";
        const csvFilePathBuilding= path.join(__dirname, "csv/Buildings.csv");
        csv()
        .fromFile(csvFilePathBuilding)
        .then((jsonObj)=>{
        console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewSearch = {
                "building": element.building,
                "location": element.location,
                "closes": element.closes
            }
            SQL.query(Q11, NewSearch, (err,mySQLres)=>{
                if (err) {
                    console.log("error in inserting data", err);
                }
                console.log("created row sucssefuly ");
            });
        });
        }); 
        res.send(" Building data inserted");
    };
    
const ShowBuilding = (req,res)=>{
        var Q12 = "SELECT * FROM Building";
        SQL.query(Q12, (err, mySQLres)=>{
            if (err) {
                console.log("error in showing table ", err);
                res.send("error in showing table ");
                return;
            }
            console.log("showing table");
            res.send(mySQLres);
            return;
        })};
    
const DropBuilding = (req, res)=>{
        var Q13 = "DROP TABLE Building";
        SQL.query(Q13, (err, mySQLres)=>{
            if (err) {
                console.log("error in droping table ", err);
                res.status(400).send({message: "error om dropping table" + err});
                return;
            }
            console.log("table Building dropped");
            res.send("table Building dropped");
            return;
            })
        }

const DropTables= (req, res)=>{
    var Q4 = "DROP TABLE Students";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table Students drpped");
    })
    var Q8 = "DROP TABLE Classes";
    SQL.query(Q8, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table Classes dropped");
    })
    var Q13 = "DROP TABLE Building";
    SQL.query(Q13, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table Building dropped");
    })
    return;
}
        

module.exports = {CreateStudents, InsertDataStudents,ShowStudents, DropStudents, CreateClasses, InsertDataClasses, ShowClasses, DropClasses, CreateBuilding, InsertDataBuilding, ShowBuilding, DropBuilding, DropTables};