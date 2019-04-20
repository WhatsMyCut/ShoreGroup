import Result from './Result';

export interface IJobType {
  name?: string;
  value?: number;
}

export interface IJobStatusReason {
  label?: string;
  stateCode?: number;
  value?: number;
}

export interface IJobModel {
  id?: string;
  name?: string;
  createdOn?: string;
  dataFileQuantity?: string;
  description?: string;
  dueDate?: string;
  modifiedOn?: string;
  jobType?: IJobType;
  statusReason?: IJobStatusReason;
}
