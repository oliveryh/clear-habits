import { Models } from '../models'
import { TaskInstance } from '../models/task';

export const batchTasks = async (keys: number[], models: Models): Promise<Array<TaskInstance|undefined>> => {
  const entries = await models.Task.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });

  return keys.map((key) => entries.find((task) => task.id === key));
};
