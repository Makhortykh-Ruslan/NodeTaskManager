const app = require("./app/app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSORD
);

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const TodoModel = mongoose.model("todo", todoSchema);

const todo = new TodoModel({
  name: "tet mongo db",
});

todo.save().then((doc) => {
  console.log('hello doc', doc);
})

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Cpnections done"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
