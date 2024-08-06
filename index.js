const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerSetup = require('./src/swagger');
swaggerSetup(app);

const meetingRouter = require('./src/router/meeting.router');
const customerRouter = require('./src/router/customers.router');
const businessRouter = require('./src/router/business.router');
const serviceRouter = require('./src/router/services.router');

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use('/meetings', meetingRouter);
app.use('/customers', customerRouter);
app.use('/businesses', businessRouter);
app.use('/services', serviceRouter);

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://' + process.env.DATABASE_HOST + '/' + process.env.DATABASE_NAME, {
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});