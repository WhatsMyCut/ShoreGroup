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

export interface IProps {
  onClickShowAddModal?;
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
      <div className="panel panel-default">
        <div className="panel-body row">
          <div className="col-sm-1">
            <DefaultButton primary onClick={this.props.onClickShowAddModal}>
              Add
            </DefaultButton>
          </div>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              defaultValue={''}
              onChange={this.props.onChangeSearchInput}
              placeholder={'Search jobs...'}
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
              Job Type
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
