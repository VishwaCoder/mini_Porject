var express = require('express');
var router = express.Router();
const mainController = require('../controllers/routeControllers');





/*get requests ***************************************************************************************************************************/



/* Index page route */
router.get('/', mainController.getIndex);


/* Get all videos route */
router.get('/all_videos', mainController.getAllVideos);


/* Faculty search route */
router.get('/faculty_search/:fName', mainController.searchFaculty);


/* Department search route */
router.get('/department_search/:dName', mainController.searchDepartment);


/* Subject search route */
router.get('/subject_search/:sName', mainController.searchSubject);




/*Post requests ***************************************************************************************************************************/


/* Random Keyword search route */
router.post('/get_key_search', mainController.getSearchByKey);



module.exports = router;
