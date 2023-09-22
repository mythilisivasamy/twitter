import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Mythili sivasamy',
      userName: 'mythili',
      email: 'mythili@example.com',
      password: bcrypt.hashSync('1234'),
    },
    {
      name: 'mahi sivasamy',
      userName: 'mahi',
      email: 'mahi@example.com',
      password: bcrypt.hashSync('1234'),
    },
    {
      name: 'prathi sivasamy',
      userName: 'prathi',
      email: 'prathi@example.com',
      password: bcrypt.hashSync('1234'),
    },
    {
      name: 'kathir',
      userName: 'kathir',
      email: 'kathir@example.com',
      password: bcrypt.hashSync('1234'),
    },
    {
      name: 'ganesh',
      userName: 'ganesh',
      email: 'ganesh@example.com',
      password: bcrypt.hashSync('1234'),
    },
  ],
};

export default data;
