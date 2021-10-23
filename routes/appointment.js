const express = require('express');
const { 
    get,
    create,
    deleteAppointment
} = require('../controllers/appointment');
const { validateJWT } = require('../middlewares/validateToken');

const router = express.Router();

router.post('/get', get);
router.post('/create', validateJWT, create);
router.post('/delete', validateJWT, deleteAppointment);

module.exports = router;
