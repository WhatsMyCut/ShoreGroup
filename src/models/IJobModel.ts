import Result from './Result';

export interface IJobModel {
  id?: number;
  name?: string;
  createdOn?: number;
  type?: object;
  statusReason?: object;
}
