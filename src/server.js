const app = require('./app');
const sequelize = require('../src/utils/database');
const initModels = require('./utils/initModels');

sequelize.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch((e) => console.log(e));

initModels();

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((e) => console.log(e))


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});