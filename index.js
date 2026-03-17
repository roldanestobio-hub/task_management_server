const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 4000;

const userRoute = require('./routes/user');
const taskRoute = require('./routes/task');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', userRoute);
app.use('/api/tasks', taskRoute);

sequelize.sync({force: false}).then(() => console.log('Mysql connected and tables synced'))
.catch(error => console.log('Connection Error', error));


app.listen(PORT, () => {

	console.log(`Server is running in localhost:${PORT}`);
});