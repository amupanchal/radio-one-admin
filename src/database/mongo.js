const mongoose = require('mongoose');
const { mongo_config } = require('./config/config');


exports.initialize_mongo_connection = async () => {
    try {
        await mongoose.connect(mongo_config.url, { 'useUnifiedTopology': true, 'useNewUrlParser': true });
        console.log("MongoDb Connected Successfully");
    } catch (error) {
        console.log('Retrying to connect to Mongodb')
        setTimeout(data => {
            this.initialize_mongo_connection()
        }, 1000)
    }
} 
