const  { 
    createUser,
    getAllUsers,
    getUserById,
    deleteUser
 } = require('../controllers/user.controller'); 
const router = require('express').Router();
const { validateToken } = require("../auth/tokenValidator")


router.post('/',validateToken, createUser);
router.get('/',validateToken, getAllUsers);
router.get('/:id',validateToken, getUserById);
router.delete('/:id',validateToken, deleteUser);


module.exports = router;