# Clear Habits

A modern task manager based on tracking progress and time with a clean UI

## Motivation

The motivation of this project is to take the components from the best task managers and put them in a single Vue application, with the ability to extend and amend as I please.

## Features

The application has the following basic features:

- CRUD operations on a task
- Track time spent on a task
- Categorise tasks by date
- Focus on a particular date (for mobile)

### Future Features

Future features will include the ability to:

- Get statistics on number of tasks complete per date, time spent on tasks
- Ability to categorise tasks
- Recurring tasks
- Set expected time taken
- Drag and drop tasks across dates

## Inspiration

The code for this project has been largely inspired by the [GoThinkster - Real World](https://github.com/gothinkster/realworld) suite of applications. In fact, the Node server example acted as a base for the server of this application.

## Deployment

Deployment is currently done using a cloud service and no domain. You can find the deployment script in `conf` directory.

### Ansible User Account

We've created an ansible technical account on our target host in order to do deployments without the use of root. The following [Linode - Running Ansible Playbooks](https://www.linode.com/docs/applications/configuration-management/running-ansible-playbooks/) instructions describe this well.
