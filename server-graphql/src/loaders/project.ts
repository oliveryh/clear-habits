import { Models } from '../models'
import { ProjectInstance } from '../models/project';

export const batchProjects = async (keys: number[], models: Models): Promise<Array<ProjectInstance|undefined>> => {
  const projects = await models.Project.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });

  return keys.map((key) => projects.find((project) => project.id === key));
};
