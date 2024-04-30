// index.js
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
<<<<<<< HEAD
const bcrypt = require('bcrypt');
=======
>>>>>>> 3c4d9349e6fd48865ebc82936d3bb70ac054883f

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

<<<<<<< HEAD
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  User.findOne({ where: { username } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      bcrypt.compare(password, user.password)
        .then(isValid => {
          if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
          return res.json({ message: 'Logged in' });
        })
        .catch(error => {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    });
});

app.get('/users', async (req, res) => {
  const users = await User.findAll({ attributes: ['username'] });
  res.json(users);
});

=======
// Endpoint de login (vulnerável a SQL Injection)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username, password } });
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Endpoint de listagem de usuários (expondo dados sensíveis)
app.get('/users', async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'username', 'password'] });
  res.json(users);
});

// Endpoint de detalhe do usuário logado (expondo senha)
>>>>>>> 3c4d9349e6fd48865ebc82936d3bb70ac054883f
app.get('/profile', async (req, res) => {
  const { username } = req.query;
  const user = await User.findOne({ where: { username: username ?? null } });
  if (user) {
<<<<<<< HEAD
    const userWithoutPassword = {
      id: user.id,
      username: user.username,
    };
    res.json(userWithoutPassword);
=======
    res.json(user);
>>>>>>> 3c4d9349e6fd48865ebc82936d3bb70ac054883f
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
