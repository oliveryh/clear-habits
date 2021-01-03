import { Models } from '../models'
import { EntryInstance } from '../models/entry';

export const batchEntries = async (keys: number[], models: Models): Promise<Array<EntryInstance|undefined>> => {
  const entries = await models.Entry.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });

  return keys.map((key) => entries.find((entry) => entry.id === key));
};
