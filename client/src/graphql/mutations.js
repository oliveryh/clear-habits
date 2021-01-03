// category
import M_CATEGORY_CREATE from '@/graphql/category/categoryCreate.gql'
import M_CATEGORY_UPDATE from '@/graphql/category/categoryUpdate.gql'
import M_CATEGORY_DELETE from '@/graphql/category/categoryDelete.gql'

// project
import M_PROJECT_CREATE from '@/graphql/project/projectCreate.gql'
import M_PROJECT_UPDATE from '@/graphql/project/projectUpdate.gql'
import M_PROJECT_DELETE from '@/graphql/project/projectDelete.gql'

// task
import M_TASK_UPDATE from '@/graphql/task/taskUpdate.gql'

// entry
import M_ENTRY_START from '@/graphql/entry/entryStart.gql'
import M_ENTRY_STOP from '@/graphql/entry/entryStop.gql'
import M_ENTRY_UPDATE from '@/graphql/entry/entryUpdate.gql'
import M_ENTRY_COMPLETE from '@/graphql/entry/entryComplete.gql'
import M_ENTRY_DELETE from '@/graphql/entry/entryDelete.gql'
import M_ENTRY_CREATE_WITH_TASK from '@/graphql/entry/entryCreateWithTask.gql'
import M_ENTRY_REORDER from '@/graphql/entry/entryReorder.gql'

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
  M_TASK_UPDATE,
  // entry
  M_ENTRY_START,
  M_ENTRY_STOP,
  M_ENTRY_UPDATE,
  M_ENTRY_COMPLETE,
  M_ENTRY_DELETE,
  M_ENTRY_CREATE_WITH_TASK,
  M_ENTRY_REORDER,
  // settings
  M_SETTINGS_UPDATE,
}
