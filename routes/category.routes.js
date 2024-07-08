const categoryCtrl = require('../controller/categoryCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const router = require('express').Router()



router.route('/category') 
.get(categoryCtrl.getCategory)
.post([auth,authAdmin],categoryCtrl.createCategory)


router.route('/deleteCategory/:id')
.delete([auth,authAdmin],categoryCtrl.deleteCategory)
router.route('/updateCategory/:id')
.put([auth,authAdmin],categoryCtrl.updateCategory)






module.exports=router
