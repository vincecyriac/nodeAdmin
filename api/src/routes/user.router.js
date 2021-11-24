const  { 
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
    login
 } = require('../controllers/user.controller'); 
const router = require('express').Router();
const { validateToken } = require("../auth/tokenValidator")


router.post('/',validateToken, createUser);
router.get('/',validateToken, getAllUsers);
router.get('/:id',validateToken, getUserById);
router.delete('/:id',validateToken, deleteUser);
router.post('/login', login);


module.exports = router;