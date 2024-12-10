const express=require('express');
const searchController=require('../controllers/searchController');
const { identifier } = require('../middlewares/identification');

const router=express.Router();

router.post('/search',searchController.search);
router.get('/sort',searchController.sort);


module.exports=router;