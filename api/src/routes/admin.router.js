const  { 
    createAdmin,
    login,
    refreshToken
 } = require('../controllers/admin.controller'); 
const router = require('express').Router();
const { validateRefreshToken } = require("../auth/tokenValidator");


router.post('/', createAdmin);
router.post('/login', login);
router.post('/refreshToken',validateRefreshToken, refreshToken);


module.exports = router;