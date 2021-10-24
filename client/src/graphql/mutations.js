// category
import M_CATEGORY_CREATE from '@/graphql/category/createCategory.gql'
import M_CATEGORY_UPDATE from '@/graphql/category/updateCategory.gql'
import M_CATEGORY_DELETE from '@/graphql/category/deleteCategory.gql'

// project
import M_PROJECT_CREATE from '@/graphql/project/createProject.gql'
import M_PROJECT_UPDATE from '@/graphql/project/updateProject.gql'
import M_PROJECT_DELETE from '@/graphql/project/deleteProject.gql'

// task
import M_TASK_CREATE from '@/graphql/task/createTask.gql'
import M_TASK_UPDATE from '@/graphql/task/updateTask.gql'

// entry
import M_ENTRY_START from '@/graphql/entry/startEntry.gql'
import M_ENTRY_STOP from '@/graphql/entry/stopEntry.gql'
import M_ENTRY_UPDATE from '@/graphql/entry/updateEntry.gql'
import M_ENTRY_COMPLETE from '@/graphql/entry/completeEntry.gql'
import M_ENTRY_RESTART from '@/graphql/entry/restartEntry.gql'
import M_ENTRY_DELETE from '@/graphql/entry/deleteEntry.gql'
import M_ENTRY_CREATE from '@/graphql/entry/createEntry.gql'
import M_ENTRY_CREATE_WITH_TASK from '@/graphql/entry/createEntryWithTask.gql'
import M_ENTRY_REORDER from '@/graphql/entry/reorderEntries.gql'

// settings
import M_SETTINGS_UPDATE from '@/graphql/settings/settingsUpdate.gql'

export {
  // category
  M_CATEGORY_CREATE,
  M_CATEGORY_UPDATE,
  M_CATEGORY_DELETE,
  // project
  M_PROJECT_CREATE,
  M_PROJECT_UPDATE,
  M_PROJECT_DELETE,
  // task
  M_TASK_CREATE,
  M_TASK_UPDATE,
  // entry
  M_ENTRY_START,
  M_ENTRY_STOP,
  M_ENTRY_UPDATE,
  M_ENTRY_COMPLETE,
  M_ENTRY_RESTART,
  M_ENTRY_DELETE,
  M_ENTRY_CREATE,
  M_ENTRY_CREATE_WITH_TASK,
  M_ENTRY_REORDER,
  // settings
  M_SETTINGS_UPDATE,
}
