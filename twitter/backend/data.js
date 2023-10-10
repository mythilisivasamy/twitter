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
  tweets: [
    {
      content:
        'Take a look at this Twint will let you scrape a lot of tweets, you can be as specific of as vague as you want',
      tweetedBy: '650d4d5149b225f0cbf21014',
    },
    {
      content:
        'I need a fake news dataset with twitter user information. Is there any dataset without fakenewsnet?',
      tweetedBy: '650d4d5149b225f0cbf21014',
    },
    {
      content: 'please provide me twitter review on mobile phone as a dataset',
      tweetedBy: '650d4d5149b225f0cbf21015',
    },
    {
      content:
        'Take a look at this Twint will let you scrape a lot of tweets, you can be as specific of as vague as you want',
      tweetedBy: '650d4d5149b225f0cbf21016',
    },
    {
      content: 'please provide me twitter review on mobile phone as a dataset',
      tweetedBy: '650d4d5149b225f0cbf21017',
    },
  ],
};

export default data;
