const userCtrl = require('../controller/userCtrl')
const auth = require('../middleware/auth')

const router = require('express').Router()


router.post('/user/register',userCtrl.register)
router.post('/user/login',userCtrl.login)
router.post('/user/logout',userCtrl.logout)
router.post('/refresh_token',userCtrl.refreshToken)
router.get('/inFor',[auth],userCtrl.getUser)

module.exports= router