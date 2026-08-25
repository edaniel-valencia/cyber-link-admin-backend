const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controllers/serviceRequestController');
const upload = require('../middlewares/uploadMiddleware');
const { requireAdmin } = require('../middlewares/authMiddleware');

// Endpoint para el cliente (crear solicitud, subir archivo)
// Idealmente usaríamos un middleware requireAuth, pero por brevedad confiaremos en los headers del front
router.post('/', upload.single('payment_receipt'), serviceRequestController.createRequest);

// Endpoints para que el cliente vea sus propias solicitudes
router.get('/client/:userId', serviceRequestController.getClientRequests);

// Endpoints para el Administrador
router.get('/', requireAdmin, serviceRequestController.getAllRequests);
router.put('/:id/status', requireAdmin, serviceRequestController.updateRequestStatus);

module.exports = router;
