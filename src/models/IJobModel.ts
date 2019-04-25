import Result from './Result';

export interface IJobType {
  Name?: string;
  Value?: number;
}

export interface IJobStatusReason {
  Label?: string;
  StateCode?: number;
  Value?: number;
}

export interface IJobModel {
  Id?: string;
  Name?: string;
  CreatedOn?: string;
  DataFileQuantity?: string;
  Description?: string;
  DueDate?: string;
  ModifiedOn?: string;
  Type?: IJobType;
  StatusReason?: IJobStatusReason;
}
