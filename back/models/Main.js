const mongoose = require('mongoose');

const mainSchema = mongoose.Schema({
    name : String ,
    date :  String ,
    size :  Number ,
    analyse :  String
});

module.exports = mongoose.model('List', mainSchema, 'list');