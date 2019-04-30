import React, { Component, MouseEvent } from 'react';
import {
  IJobModel,
  IJobStatusReason,
  formatStatusLabel,
  IJobOwner,
  IJobAccount,
} from '../../models/IJobModel';
import {
  _getAccountPersona,
  _getDefaultPersona,
  _getOwnerPersona,
  _getJobPersona,
} from '../shared/AppPersona';

export interface IProps {
  disabled?: boolean;
  checked?: boolean;
  job?: IJobModel;
}
export default class JobHeader extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const job = this.props.job as IJobModel;
    const status = job.StatusReason as IJobStatusReason;
    const account = job.Account as IJobAccount;
    const owner = job.Owner as IJobOwner;
    const jobDetail = job ? _getJobPersona(job) : _getDefaultPersona();
    const label = status ? status.Label : '–';
    const fullName = owner ? _getOwnerPersona(owner) : _getDefaultPersona();
    const client = account ? _getAccountPersona(account) : _getDefaultPersona();
    const statusClassName = formatStatusLabel(label);

    return (
      <div className="job-header">
        <div className="job-header-cells">
          <div className="job-header-info">
            <h5>Job</h5>
            {jobDetail}
          </div>
          <div className="job-header-status">
            <h5>Status</h5>
            <h4 className={'bold ' + statusClassName}>{label}</h4>
          </div>
          <div className="job-header-client">
            <h5>Client Owner</h5>
            {client}
          </div>
          <div className="job-header-owner">
            <h5>Sepire Owner</h5>
            <h4>{fullName}</h4>
          </div>
        </div>
      </div>
    );
  }
}
