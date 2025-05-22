const express = require('express');
const router = express.Router();

const softwareController = require('../controllers/softwareController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/',
    authMiddleware,
    roleMiddleware(['Admin']),
    softwareController.createSoftware
);

router.get('/', 
    authMiddleware,
    softwareController.getAllSoftware
);

module.exports = router;