const express = require('express');
const { signin } = require('../controllers/auth');
const router = express.Router();

const {signup, activateAccount, login} = require('../controllers/auth');

router.post('/signup', signup);
router.post('/email-activate', activateAccount);
// router.get('/getData', (req, res) => {
//     res.send('test valied')
// })

//Login
router.post('/login', login);
module.exports = router