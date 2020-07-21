import ApiService from "@/common/api.service";
import {
  A_TASK_CREATE,
  A_TASK_DELETE,
  A_TASK_RETRIEVE,
  A_TASK_UPDATE,
} from "./actions.type";
import {
  M_ERROR_SET,
  M_TASK_CREATE,
  M_TASK_DELETE,
  M_TASK_RETRIEVE,
  M_TASK_UPDATE,
} from "./mutations.type";

const state = {
  errors: null,
  tasks: [],
};

const actions = {
    [A_TASK_RETRIEVE](context) {
        return new Promise(resolve => {
        ApiService.get("tasks")
            .then(({ data }) => {
            context.commit(M_TASK_RETRIEVE, data);
            resolve(data);
            })
            .catch(({ response }) => {
            context.commit(M_ERROR_SET, response.data.errors);
            });
        });
    },
    [A_TASK_CREATE](context, description) {
        return new Promise(resolve => {
            ApiService.post('tasks', {
                description: description
            }).then(({ data }) => {
                context.commit(M_TASK_CREATE, data);
                resolve(data);
            })
            .catch(({ response }) => {
                context.commit(M_ERROR_SET, response.data.errors);
            });
        });
    },
    [A_TASK_UPDATE](context, task) {
        return new Promise(resolve => {
            ApiService.put(`tasks/${task._id}`, task)
            .then(({ data }) => {
                context.commit(M_TASK_UPDATE, data);
                resolve(data);
            })
            .catch(({ response }) => {
                context.commit(M_ERROR_SET, response.data.errors);
            });
        });
    },
    [A_TASK_DELETE](context, task) {
        return new Promise(resolve => {
            ApiService.delete(`tasks/${task._id}`, task)
            .then(({ data }) => {
                context.commit(M_TASK_DELETE, task);
                resolve(data);
            })
            .catch(({ response }) => {
                console.log(response)
                context.commit(M_ERROR_SET, response.data.errors);
            });
        });
    },
};

const mutations = {
  [M_ERROR_SET](state, error) {
    state.errors = error;
  },
  [M_TASK_RETRIEVE](state, tasks) {
      state.tasks = tasks
  },
  [M_TASK_CREATE](state, task) {
      state.tasks.push(task)
  },
  [M_TASK_UPDATE](state, data) {
    state.tasks = state.tasks.map(task => {
        if (task._id !== data._id) {
          return task;
        }
        
        task.complete = data.complete;
        task.description = data.description;
        return task;
    });
  },
  [M_TASK_DELETE](state, data) {
    let i = state.tasks.map(task => task._id).indexOf(data._id)
    state.tasks.splice(i, 1)
  }
};

export default {
    state,
    actions,
    mutations,
};
