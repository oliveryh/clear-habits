import { Models } from '../models'
import { CategoryInstance } from '../models/category';

export const batchCategories = async (keys: number[], models: Models): Promise<Array<CategoryInstance|undefined>> => {
  const categories = await models.Category.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });

  return keys.map((key) => categories.find((category) => category.id === key));
};
