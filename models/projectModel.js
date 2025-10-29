const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    status: {type: String, enum: ['Planned', 'In Progress', 'Completed'], default: 'Planned'},
    addedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true,}
}, { timestamps: true })

module.exports = mongoose.model('Project', ProjectSchema )