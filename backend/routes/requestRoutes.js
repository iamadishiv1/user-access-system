const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requestController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/',
    authMiddleware,
    roleMiddleware(['Employee']),
    requestController.createRequest
);

router.get('/pending',
    authMiddleware,
    roleMiddleware(['Manager']),
    requestController.getPendingRequests
);

router.patch('/:id',
    authMiddleware,
    roleMiddleware(['Manager']),
    requestController.updateRequestStatus
);

router.get('/my-requests', 
    authMiddleware,
    requestController.getUserRequests
)

module.exports = router;