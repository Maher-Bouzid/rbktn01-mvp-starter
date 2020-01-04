var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  username: {
    unique: true,
    required: true,
    type: String
  },
  password: String
});

var todoSchema = mongoose.Schema({
  username: {
    type: String
  },
  todo: {
    required: true,
    type: String
  },
  done: Boolean,
})

var User = mongoose.model('User', userSchema);
var Todo = mongoose.model('Todo', todoSchema);

const saveUser = async (username, password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt)

  let user = new User({
    username: username,
    password: hashedPassword
  })
  return user.save()
}

const findUser = (username, password) => {
  return User.findOne({ username })
    .then(async (user) => {
      if (user) {
        let pswd = await bcrypt.compare(password, user.password);
        return pswd
      } else {
        return false
      }
    })
}

const getData = (username) => {
  return Todo.find({ username })
    .then(todos => {
      return todos.map(elm => {
        return elm._doc
      })
    })
}

const addTodo = (todo, username) => {
  console.log(todo, username)
  var todos = new Todo({
    username: username,
    todo: todo,
    done: false
  })
  return todos.save()
    .then((a) => {
      return Todo.find({ username })
    })
    .then(todos => {
      return todos.map(elm => {
        return elm._doc
      })
    })
}

deletTodo = (id, username) => {
  return Todo.findByIdAndRemove(id)
    .then(() => {
      return getData(username)
    })
}
const updateTodo = (username, id, msg) => {
  return Todo.findByIdAndUpdate(id, { todo: msg })
    .then(() => {
      return getData(username)
    })
}

const updateState = (username, id, state) => {
  let done = !(state === 'true') // to convert if back to boolean
  return Todo.findByIdAndUpdate(id, { done: done })
    .then(() => {
      return getData(username)
    })
}


// module.exports.selectAll = selectAll;
module.exports.saveUser = saveUser;
module.exports.findUser = findUser;
module.exports.getData = getData;
module.exports.addTodo = addTodo;
module.exports.deletTodo = deletTodo;
module.exports.updateTodo = updateTodo;
module.exports.updateState = updateState;