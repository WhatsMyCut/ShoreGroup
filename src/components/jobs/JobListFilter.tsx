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

export interface IProps {
  onClickAddJob?;
  onChangeSearchInput?;
  onClickShowJobTypeFilter?;
  onClickShowJobStatusFilter?;
}

export default class JobListFilter extends Component<IProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="">
        <div>
          <DefaultButton primary href="/jobs/add">
            Add
          </DefaultButton>
        </div>
        <div className="panel-body">
          <div className="">
            <SearchBox
              placeholder="Filter by keyword"
              onFocus={() => console.log('onFocus called')}
              onBlur={() => console.log('onBlur called')}
              iconProps={{ iconName: 'Filter' }}
              onChange={this.props.onChangeSearchInput}
            />
          </div>
          <div>
            <DefaultButton
              persistMenu={true}
              onClick={this.props.onClickShowJobTypeFilter}
              primary
              menuProps={{
                items: [
                  {
                    key: 'editJob',
                    text: 'Edit Job',
                    iconProps: { iconName: 'ColumnLeftTwoThirdsEdit' },
                  },
                ],
              }}
            >
              Types
            </DefaultButton>
            &nbsp;
            <DefaultButton
              persistMenu={true}
              onClick={this.props.onClickShowJobStatusFilter}
              primary
              menuProps={{
                items: [
                  {
                    key: 'editJob',
                    text: 'Edit Job',
                    iconProps: { iconName: 'ColumnLeftTwoThirdsEdit' },
                  },
                ],
              }}
            >
              Status
            </DefaultButton>
          </div>
        </div>
      </div>
    );
  }
}
