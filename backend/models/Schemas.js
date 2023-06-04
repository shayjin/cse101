const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    number: {type: String, required: true},
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    tech: {type: [String], required: true},
    description: {type: String, required: false}
});

const previewClassSchema = new Schema({
    number: {type: String, required: true},
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    tech: {type: [String], required: true}
});

const classTypeSchema = new Schema({
    type: {type: String, required: true},
    courses: {type: [String], required: true}
});

const classDetailSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    credit: {type: Number, required: true},
    prereq: {type: [[String]], required: true},
    coreq: {type: [[String]], required: true}
});

const reviewSchema = new Schema({
    selectInput: {type: String, required: true},
    difficulty: {type: Number, required: true},
    textInput: {type: String, required: true},
    user: {type: String, required: true},
    date: {type: String, required: true}
});

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    verified: {type: Boolean, required: true}
});

const Classes = mongoose.model('Class', classSchema, 'Class');
const PreviewClasses = mongoose.model('PreviewClass', previewClassSchema, 'PreviewClass');
const ClassTypes = mongoose.model('ClassType', classTypeSchema, 'ClassType');
const ClassDetails = mongoose.model('ClassDetail', classDetailSchema, 'ClassDetail');
const Reviews = mongoose.model('Review', reviewSchema, 'Review');
const Users = mongoose.model('User', userSchema, 'User');
const mySchemas = {'Class': Classes, 'PreviewClass': PreviewClasses, 'ClassType': ClassTypes, 'ClassDetail': ClassDetails, 'Review': Reviews, 'User': Users};

module.exports = mySchemas;