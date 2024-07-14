const app = require('./app/app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Mongo DB connected'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
