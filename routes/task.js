const express = require('express');
const router = express.Router();

const { createTask, getTasks, updateTask, deleteTask, setInactive ,toggleStatus } = require('../controllers/task');
const auth  = require('../authMiddleware/auth');

router.post('/', auth, createTask);

router.get('/', auth, getTasks);

router.put('/:id', auth, updateTask);

router.delete('/:id', auth, deleteTask);

router.patch('/:id/inactive', auth, setInactive);
router.patch('/:id/toggle', auth, toggleStatus);

module.exports = router;