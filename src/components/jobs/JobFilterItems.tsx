import { Redirect } from 'react-router';
import { IJobModel, IJobType } from '../../models/IJobModel';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/components/ContextualMenu';
import { getTheme } from 'office-ui-fabric-react/lib/Styling';
// Data for CommandBar
export const _getControlBarItems = () => {
  const theme = getTheme();
  return [
    {
      key: 'filterBy',
      name: 'Views',
      className: 'someClass',
      subMenuProps: {
        items: [
          {
            key: 'myJobs',
            name: 'My Jobs',
            iconProps: {
              iconName: 'ReminderPerson',
            },
            ['data-automation-id']: 'newEmailButton',
          },
          {
            key: 'allActiveJobs',
            name: 'All Active Jobs',
            iconProps: {
              iconName: 'BusinessCenterLogo',
              style: { color: 'green' },
            },
          },
          {
            key: 'allInactiveJobs',
            name: 'All Inactive Jobs',
            iconProps: {
              iconName: 'BusinessCenterLogo',
              style: { color: 'red' },
            },
          },
        ],
      },
      ariaLabel: 'New Job',
      onClick: () => this._addJob(),
    },
    {
      key: 'divider',
      name: '',
      className: 'command-bar-divider',
      iconProps: {
        iconName: 'Separator',
        style: { color: theme.palette.black, maxWidth: 20 },
      },
    },
    {
      key: 'newItem',
      name: 'New Job',
      className: 'someClass',
      iconProps: {
        iconName: 'Add',
      },
      ariaLabel: 'New Job',
      onClick: () => _addJob(),
    },
  ];
};

export const _getFilterItems = state => {
  const { jobs } = state;
  let retArr = [] as IContextualMenuItem[];
  if (jobs) {
    retArr = jobs.map((x: IJobModel) => {
      const type: IJobType = x.Type;
      return {
        name: 'Types: ' + state.filterBy || '',
        className: 'someClass',
        subMenuProps: {},
        ariaLabel: 'New Job',
      };
    });
    return retArr;
  }

  return retArr;
};

export const _addJob = () => {
  <Redirect to="/jobs/add" />;
};
