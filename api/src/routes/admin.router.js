const  { 
    createAdmin,
    login
 } = require('../controllers/admin.controller'); 
const router = require('express').Router();


router.post('/', createAdmin);
router.post('/login', login);


module.exports = router;