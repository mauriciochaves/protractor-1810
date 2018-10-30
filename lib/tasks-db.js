const mongoose = require('mongoose');
const config = require('./conf-db');

const { db: {host, port, user, pass, database } } = config;
const mongoSrtConn = `mongodb://${user}:${pass}@${host}:${port}/${database}`;

mongoose.connect(mongoSrtConn)

const TaskSchema = new mongoose.Schema({
    title: String,
    dueDate: Date,
    done: Boolean,
    tags: Array,
    createdBy: String
});

const Task = mongoose.model('tasks', TaskSchema)

module.exports = {
    addTask: task => new Task(task).save(),
    deleteByName: taskName => Task.remove({title: taskName})
}