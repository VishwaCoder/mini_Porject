var express = require('express');
const { json } = require('express');
const connectionCompanion = require('../DBSchema/configDb');


/* Index page controller */

exports.getIndex = (req, res, next) => {

    res.render('index', { title: 'Home' });
}


/* Get all videos controller */

exports.getAllVideos = (req, res, next) => {

    const sqlQuery = `SELECT DISTINCT(teacher_name),subject_name,video_name,id,link,dept_name,likes,dislikes,views,comments FROM videos WHERE dept_name = 'Information Technology' LIMIT 40`;
    connectionCompanion.query(sqlQuery, function (err, data) {
        if (err) {
            res.render('videoSearchPage', { err: err });
        } else {
            const sqlQuery = `SELECT * FROM videos`;
            connectionCompanion.query(sqlQuery, function (err, data1) {
                res.render('videoSearchPage', { data: data, data1: data1 });
            });
            //console.log(data)
        }
    });
}


/* Faculty search controller */

exports.searchFaculty = (req, res, next) => {

    let facultyName = req.params.fName

    const sqlQuery = `SELECT teacher_name,subject_name,video_name,id,link,dept_name,likes,dislikes,views,comments FROM videos WHERE teacher_name = ? ORDER BY teacher_name`;
    connectionCompanion.query(sqlQuery, [facultyName], function (err, data) {
        if (err) {
            return;
        }
        else {
            //console.log(data)
            res.render('videoSearchPage', { flag: 1, data: data });
        }
    });
}


/* Department search controller */

exports.searchDepartment = (req, res, next) => {

    let departmentName = req.params.dName

    const sqlQuery = `SELECT teacher_name,subject_name,video_name,id,link,dept_name,likes,dislikes,views,comments FROM videos WHERE dept_name = ? ORDER BY dept_name`;
    connectionCompanion.query(sqlQuery, [departmentName], function (err, data) {
        if (err) {
            return;
        }
        else {
            //console.log(data)
            res.render('videoSearchPage', { flag1: 1, data: data });
        }
    });
}


/* Subject search controller */

exports.searchSubject = (req, res, next) => {

    let subjectName = req.params.sName

    const sqlQuery = `SELECT teacher_name,subject_name,video_name,id,link,dept_name,likes,dislikes,views,comments FROM videos WHERE subject_name = ? ORDER BY subject_name`;
    connectionCompanion.query(sqlQuery, [subjectName], function (err, data) {
        if (err) {
            return;
        }
        else {
            //console.log(data)
            res.render('videoSearchPage', { flag2: 1, data: data });
        }
    });
}


/* Random Keyword search controller */

exports.getSearchByKey = (req, res, next) => {

    let key_val = req.body.fName;
    //console.log(key_val);  
    const sqlQuery = `SELECT * FROM videos WHERE LOWER(video_name) LIKE '%${key_val}%' or LOWER(subject_name) LIKE '%${key_val}%' or LOWER(teacher_name) LIKE '%${key_val}%'`;
    connectionCompanion.query(sqlQuery, function (err, data) {
        if (err) {
            return
        } else {
            res.render('videoSearchPage', { flag3: 1, data: data });
            //console.log(data)
        }
    });
}