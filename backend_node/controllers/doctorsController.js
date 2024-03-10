const express=require("express");
const db=require('../models/doctors.js');

const doctorsController = {
getAllDoctors : (req, res) => {
    var sql="select * from Doctors"
    var params=[]
    db.all(sql,params,(err,rows)=>{
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    })},

  getDoctorById : (req, res) => { 
    var sql = "select * from Doctors where id = ?"
    var params =[req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
},

addDoctor : (req, res) => {
    var errors=[]
    if (!req.body.name){
        errors.push("No name specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        speciality: req.body.speciality
    }
    var sql ='INSERT INTO Doctors (name, email, phone, speciality) VALUES (?,?,?,?)'
    var params =[data.name, data.email, data.phone, data.speciality]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
},


updateDoctor : (req, res) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        speciality: req.body.speciality
    }
    db.run(
        `UPDATE Doctors set 
           name = COALESCE(?,name), 
           email = COALESCE(?,email), 
           phone = COALESCE(?,phone), 
           speciality = COALESCE(?,speciality) 
           WHERE id = ?`,
        [data.name, data.email, data.phone, data.speciality, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
}
};

module.exports = doctorsController;