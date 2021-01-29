const { json } = require('express');
var express = require('express');
var router = express.Router();
const connectionCompanion = require('../DBSchema/configDb');

// const spawn = require('child_process').spawn;
// const process = spawn('python', ['./pymodeules/tester2.py']);
// process.stdout.on('data', data => {
//   let res = data.toString()
//   res = JSON.parse(res)
//   console.log(res.name)
// });


// const process1 = spawn('python', ['./pymodeules/tester.py', 'check_fun']);
// process1.stdout.on('data', data1 => {
//   console.log(data1.toString())
// });



/*get requests ***************************************************************************************************************************/

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});



router.get('/all_videos', function (req, res, next) {
  const sqlQuery = `SELECT DISTINCT(teacher_name),subject_name,video_name,id,link,dept_name,likes,dislikes,views,comments FROM videos WHERE dept_name = 'Information Technology' LIMIT 20`;
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
})


router.get('/faculty_search/:fName', function (req, res, next) {

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
})



router.get('/department_search/:dName', function (req, res, next) {

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
})


router.get('/subject_search/:sName', function (req, res, next) {

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
})



/*Post requests ***************************************************************************************************************************/

router.post('/get_key_search', function (req, res, next) {

  let key_val = req.body.fName;
  //console.log(key_val);  
  const sqlQuery = `SELECT * FROM videos WHERE LOWER(video_name) LIKE '%${key_val}%' or LOWER(subject_name) LIKE '%${key_val}%'`;
  connectionCompanion.query(sqlQuery, function (err, data) {
    if (err) {
      return
    } else {
      res.render('videoSearchPage', { flag3: 1, data: data });
      //console.log(data)
    }
  });
})


module.exports = router;
