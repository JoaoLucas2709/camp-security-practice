// index.js
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

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
app.get('/profile', async (req, res) => {
  const { username } = req.query;
  const user = await User.findOne({ where: { username: username ?? null } });
  if (user) {
    const userWithoutPassword = {
      id: user.id,
      username: user.username,
    };
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
