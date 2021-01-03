import models from '../models'

import DataLoader from 'dataloader';

// instances
import { UserInstance } from '../models/user';
import { CategoryInstance } from '../models/category';
import { ProjectInstance } from '../models/project';
import { TaskInstance } from '../models/task';
import { EntryInstance } from '../models/entry'

// batch functions
import { batchUsers } from './user'
import { batchCategories } from './category'
import { batchProjects } from './project'
import { batchTasks } from './task'
import { batchEntries } from './entry'

export interface Loaders {
    user: DataLoader<unknown, UserInstance|undefined>,
    category: DataLoader<unknown, CategoryInstance|undefined>,
    project: DataLoader<unknown, ProjectInstance|undefined>,
    task: DataLoader<unknown, TaskInstance|undefined>,
    entry: DataLoader<unknown, EntryInstance|undefined>,

}
const userLoader: DataLoader<unknown, UserInstance|undefined> = new DataLoader((keys) =>
    batchUsers(keys as number[], models)
);

const categoryLoader: DataLoader<unknown, CategoryInstance|undefined> = new DataLoader((keys) =>
    batchCategories(keys as number[], models)
);

const projectLoader: DataLoader<unknown, ProjectInstance|undefined> = new DataLoader((keys) =>
    batchProjects(keys as number[], models)
);

const taskLoader: DataLoader<unknown, TaskInstance|undefined> = new DataLoader((keys) =>
    batchTasks(keys as number[], models)
);

const entryLoader: DataLoader<unknown, EntryInstance|undefined> = new DataLoader((keys) =>
    batchEntries(keys as number[], models)
);

const loaders: Loaders = {
    user: userLoader,
    category: categoryLoader,
    project: projectLoader,
    task: taskLoader,
    entry: entryLoader,
}

export default loaders;
