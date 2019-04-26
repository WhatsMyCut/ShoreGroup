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
  CommandBarButton,
} from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/components/SearchBox';
import { CommandBar } from 'office-ui-fabric-react/lib/components/CommandBar';
import { _getControlBarItems, _getFilterItems } from './JobFilterItems';

export interface IProps {
  onClickAddJob?;
  onChangeSearchInput?;
  onClickShowJobTypeFilter?;
  onClickShowJobStatusFilter?;
}

export interface IState {
  filterBy?: string;
}

export default class JobListFilter extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props);
    this.state = state;
  }

  render() {
    return (
      <div className="job-list-filter">
        <div className="job-list-filter-menu">
          <CommandBar
            items={_getControlBarItems()}
            className="job-list-command-bar"
            overflowButtonProps={{ ariaLabel: 'More commands' }}
            ariaLabel={
              'Use left and right arrow keys to navigate between commands'
            }
          />
        </div>
        <div className="job-list-filter-container">
          <SearchBox
            className="job-list-filter-input"
            placeholder="Filter by keyword"
            onFocus={() => console.log('onFocus called')}
            onBlur={() => console.log('onBlur called')}
            iconProps={{ iconName: 'Filter' }}
            onChange={this.props.onChangeSearchInput}
          />
          <CommandBar
            items={_getFilterItems(this.state)}
            className="job-list-filter-command-bar"
            overflowButtonProps={{ ariaLabel: 'More commands' }}
            ariaLabel={
              'Use left and right arrow keys to navigate between commands'
            }
          />
        </div>
      </div>
    );
  }
}
