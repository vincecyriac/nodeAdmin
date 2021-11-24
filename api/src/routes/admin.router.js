const  { 
    createAdmin,
    login,
    refreshToken
 } = require('../controllers/admin.controller'); 
const router = require('express').Router();


router.post('/', createAdmin);
router.post('/login', login);
router.post('/refreshToken', refreshToken);


module.exports = router;