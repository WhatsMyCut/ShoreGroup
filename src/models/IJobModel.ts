import { IAttachmentModel } from './IAttachmentModel';
import { ITaskModel } from './ITaskModel';

export interface IJobType {
  Name?: string;
  Value?: number;
}

export interface IJobStatusReason {
  Label?: string;
  StateCode?: number;
  Value?: number;
}

export interface IJobAccount {
  Id?: string;
  Name?: string;
}

export interface IJobOwner {
  Id?: string;
  FullName?: string;
}

export interface IJobModel {
  Account?: IJobAccount;
  Id?: string;
  Name?: string;
  CreatedOn?: string;
  DataFileQuantity?: string;
  Description?: string;
  DueDate?: string;
  JobName?: string;
  ModifiedOn?: string;
  Owner?: IJobOwner;
  Type?: IJobType;
  StatusReason?: IJobStatusReason;
  Attachments?: IAttachmentModel[];
  Tasks?: ITaskModel[];
}

export const formatStatusLabel = (status: string) => {
  let statusClassName = '';
  switch (status) {
    case 'New':
      statusClassName = 'status-new';
      break;
    case 'Late':
      statusClassName = 'status-late';
      break;
    default:
      break;
  }
  return statusClassName;
};
