const { Task } = require('../models');
const { Op } = require('sequelize');

const createTask = async(req, res) => {

	try {

		const { title, description, dueDate } = req.body;

		if(!title || !description || !dueDate){
			return res.status(400).json({ message: "All fields are required" });
		}

		const task = await Task.create({

			title,
			description,
			dueDate,
			userId: req.user.id
		});

		return res.status(201).json({ message: "Task successfully created", task });

	}catch(error){
		console.log(error);
		return res.status(500).json({ message: "Server Error", error: error.message });
	}
};

const getTasks = async(req, res) => {

	try {

		const { status, search, own } = req.query;

		const whereClause = own === 'true' ? { userId: req.user.id } : {};

		if(status && status !== 'all'){
			whereClause.status = status;
		}

		if(search){
			whereClause.title = { [Op.like]: `%${search}%` };
		}

		const tasks = await Task.findAll({ where: whereClause });

		if(tasks.length === 0){
			return res.status(404).json({ message: "Task not found" });
		}

		return res.status(200).json({tasks});

	}catch(error){
		console.log(error);
		return res.status(500).json({ message: "Server Error", error: error.message });
	}
};

const updateTask = async(req, res) => {

	try {

		const { title, description, dueDate } = req.body;

		const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });

		if(!task){
			return res.status(404).json({ message: "You do not have permission to edit this task" });
		}

		await task.update({

			title: title || task.title,
			description: description || task.description,
			dueDate: dueDate || task.dueDate
		});

		return res.status(200).json({ message: "Task updated successfully", task });

	}catch(error){
		console.log(error);
		return res.status(500).json({ message: "Server Error", error: error.message });
	}
};

const deleteTask = async(req, res) => {

	try {

		const task = await Task.findOne({ where: {id: req.params.id, userId: req.user.id } });

		if(!task){
			return res.status(404).json({ message: "Task not found" });
		}

		await task.destroy();
		return res.status(200).json({ message: "Task deleted successfully" });

	}catch(error){
		console.log(error);
		return res.status(500).json({ message: "Server Error", error: error.message });
	}
};

const setInactive = async(req, res) => {
	try{
		const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id }});

		if(!task){
			return res.status(404).json({ message: "Task not found "});
		}
		const newStatus = task.status === 'inactive' ? 'active' : 'inactive';
		await task.update({status: newStatus});
		return res.status(200).json({ message: `Task set to ${newStatus}`, task });

	}catch(error){
		console.log(error);
		return res.status(500).json({ message: "Server Error", error: error.message })
	}
};

const toggleStatus = async(req, res) => {

	try {

		const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });

		if(!task){
			return res.status(404).json({ message: "Task not found" });
		}

		const newStatus = task.status === 'completed' ? 'active' : 'completed';

		await task.update({status: newStatus});

		return res.status(200).json({ message: `Task marked as ${newStatus}`, task });

	}catch(error){
		console.log(error);
		return res.status(500).json({ message: "Server Error", error: error.message });
	}
};

module.exports = { createTask, getTasks, updateTask, deleteTask, setInactive ,toggleStatus };