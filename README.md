# clear-habits

A modern task manager based on tracking progress and time

## Deployment

Deployment is currently done using a cloud service and no domain. You can find the deployment script in `conf` directory.

### Ansible User Account

We've created an ansible technical account on our target host in order to do deployments without the use of root. The following [Linode - Running Ansible Playbooks](https://www.linode.com/docs/applications/configuration-management/running-ansible-playbooks/) instructions describe this well.
