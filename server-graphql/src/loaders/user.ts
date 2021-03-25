import { Models } from '../models'
import { UserInstance } from '../models/user';

export const batchUsers = async (keys: number[], models: Models): Promise<Array<UserInstance|undefined>> => {
  const users = await models.User.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });

  return keys.map((key) => users.find((user) => user.id === key));
};
