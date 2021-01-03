import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

require('dotenv/config.js')

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import loaders from './loaders';

const app = express();

app.use(cors());

const getMe = async (req: express.Request) => {
  var token = req.headers['authorization'] as string;
  if (token) {
    token = token.replace(/^Bearer\s+/, "");
    try {
      const secret:string  = process.env.SECRET || "SECRET"
      return jwt.verify(token, secret);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};


const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers as any,
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      models,
      me,
      secret: process.env.SECRET,
      loaders,
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const isTest = !!process.env.TEST_DATABASE;

sequelize.sync({ force: isTest }).then(async () => {
  if (isTest) {
    createUsersWithTasks();
  }
  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => console.log('Module disposed. '));
}

const createUsersWithTasks = async () => {
  const user1 = await models.User.create({
    username: 'oliver',
    email: 'hello@oliver.com',
    password: 'alpineforest',
  });

  const user1category1 = await models.Category.create({
    description: 'User 1 Category 1',
    color: '#FFF',
    userId: user1.id,
  });

  const user1category2 = await models.Category.create({
    description: 'User 1 Category 2',
    color: '#FFF',
    userId: user1.id,
  });

  const user1category3 = await models.Category.create({
    description: 'User 1 Category 3',
    color: '#FFF',
    userId: user1.id,
  });

  const user1project1 = await models.Project.create({
    description: 'User 1 Project 1',
    color: '#FFF',
    categoryId: user1category1.id as number,
    userId: user1.id,
  });

  const user1project2 = await models.Project.create({
    description: 'User 1 Project 2',
    color: '#FFF',
    categoryId: user1category1.id as number,
    userId: user1.id,
  });

  const user1project3 = await models.Project.create({
    description: 'User 1 Project 3',
    color: '#FFF',
    categoryId: user1category1.id as number,
    userId: user1.id,
  });

  const user1task1 = await models.Task.create({
    projectId: user1project1.id,
    userId: user1.id,
    description: 'User 1 Task 1',
  });

  const user1task2 = await models.Task.create({
    projectId: user1project1.id,
    userId: user1.id,
    description: 'User 1 Task 2',
  });

  const user1task3 = await models.Task.create({
    projectId: user1project1.id,
    userId: user1.id,
    description: 'User 1 Task 3',
  });

  const user1entry1 = await models.Entry.create({
    userId: user1.id,
    taskId: user1task1.id,
    date: '2020-01-01',
  })

  const user1entry2 = await models.Entry.create({
    userId: user1.id,
    taskId: user1task1.id,
  })

  const user1entry3 = await models.Entry.create({
    userId: user1.id,
    taskId: user1task1.id,
  })

  const user1entry4 = await models.Entry.create({
    userId: user1.id,
    taskId: user1task1.id,
    date: '2019-01-01',
    timerActive: false,
    timerEstimatedTime: 100,
  })

  var dateTwentyMinutesAgo = new Date()
  dateTwentyMinutesAgo.setMinutes(dateTwentyMinutesAgo.getMinutes() - 20)

  const user1entry5 = await models.Entry.create({
    userId: user1.id,
    taskId: user1task1.id,
    date: '2019-01-01',
    timerActive: true,
    timerEstimatedTime: 100,
    timerStartedAt: dateTwentyMinutesAgo
  })

  const user1entry6 = await models.Entry.create({
    userId: user1.id,
    taskId: user1task1.id,
    date: '2019-01-01',
  })

  const user1entry7 = await models.Entry.create({
    userId: user1.id,
    taskId: user1task1.id,
    date: '2019-01-01',
    timerActive: true,
    timerEstimatedTime: 100,
    timerStartedAt: dateTwentyMinutesAgo
  })

  const user2 = await models.User.create({
    username: 'john',
    email: 'hello@john.com',
    password: 'alpineforest',
  });

  const user2category1 = await models.Category.create({
    description: 'User 2 Category 3',
    color: '#FFF',
    userId: user2.id,
  });

  const user2project1 = await models.Project.create({
    description: 'User 2 Project 1',
    color: '#FFF',
    userId: user2.id,
    categoryId: user2category1.id as number,
  });

  const user2task1 = await models.Task.create({
    userId: user2.id,
    projectId: user2project1.id,
    description: 'User 2 Task 1',
  });

  const user2entry1 = await models.Entry.create({
    userId: user2.id,
    taskId: user2task1.id,
    complete: true
  })
};
