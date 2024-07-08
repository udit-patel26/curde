const productCtrl = require('../controller/productCtrl')

const router = require('express').Router()

router.route('/product')
.get(productCtrl.getProduct)
.post(productCtrl.createProduct)


router.route('/product/:id')
.put(productCtrl.updateProduct)
.delete(productCtrl.deleteProduct)


module.exports= router