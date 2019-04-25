import '../../styles/jobs.scss';
import React, { MouseEvent, Component } from 'react';
import { IJobModel } from '../../models/IJobModel';
import {
  DefaultButton,
  IconButton,
  // Older api
  Button,
  ButtonType,
  IButtonProps,
} from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/components/SearchBox';
import { CommandBar } from 'office-ui-fabric-react/lib/components/CommandBar';
import { Redirect } from 'react-router';

export interface IProps {
  onClickAddJob?;
  onChangeSearchInput?;
  onClickShowJobTypeFilter?;
  onClickShowJobStatusFilter?;
}

export default class JobListFilter extends Component<IProps, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  private _addJob = () => {
    <Redirect to="/jobs/add" />;
  };
  // Data for CommandBar
  private _getItems = () => {
    return [
      {
        key: 'newItem',
        name: 'Filter By',
        className: 'someClass',
        iconProps: {
          iconName: 'ChevronDown',
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
          style: { color: '#000', maxWidth: 20 },
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
        onClick: () => this._addJob(),
      },
    ];
  };

  render() {
    return (
      <div className="job-list-filter">
        <div className="job-list-filter-menu">
          <CommandBar
            items={this._getItems()}
            //overflowItems={this.getOverlflowItems()}
            overflowButtonProps={{ ariaLabel: 'More commands' }}
            //farItems={this.getFarItems()}
            ariaLabel={
              'Use left and right arrow keys to navigate between commands'
            }
          />
        </div>
        <div className="panel-body">
          <div className="job-list-filter-keyword">
            <SearchBox
              placeholder="Filter by keyword"
              onFocus={() => console.log('onFocus called')}
              onBlur={() => console.log('onBlur called')}
              iconProps={{ iconName: 'Filter' }}
              onChange={this.props.onChangeSearchInput}
            />
          </div>
        </div>
      </div>
    );
  }
}
