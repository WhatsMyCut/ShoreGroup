import React, { Component } from 'react';
import {
  PrimaryButton,
  IconButton,
  // Older api
  Button,
  ButtonType,
} from 'office-ui-fabric-react/lib/Button';
import * as loadThemeByName from '../../components/fabric/styling/loadThemeByName';
import { IJobModel } from '../../models/IJobModel';

export interface IProps {
  disabled?: boolean;
  checked?: boolean;
}

export default class JobActions extends Component<IProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PrimaryButton
          buttonType={ButtonType.primary}
          primary={true}
          // onClick={evt => this.onClickShowEditModal(evt, job)}
        >
          Edit
        </PrimaryButton>
        &nbsp;
        <IconButton
          disabled={this.props.disabled}
          checked={this.props.checked}
          iconProps={{ iconName: 'Delete', color: 'red' }}
          styles={{
            root: { color: '#f00', background: 'transparent' },
            rootHovered: { color: 'darkred', background: 'transparent' },
          }}
          title="Delete Job"
          ariaLabel="Delete Job"
        />
      </div>
    );
  }
}
