import { IAttachmentModel } from './IAttachmentModel';
import { IJobStatusReason, IJobType } from './IJobModel';
export interface IPriority {
  Name?: string;
  Value?: number;
}
export interface ITaskModel {
  Attachment?: IAttachmentModel;
  CASS?: boolean;
  CASSInstructions: null;
  CreatedOn?: string;
  Dedupe?: boolean;
  DueDate?: string;
  FedexAccount: null;
  Household?: boolean;
  HouseholdInstructions: null;
  Id: string;
  ModifiedOn?: string;
  NCOA?: boolean;
  NCOAInstructions: null;
  Presort?: boolean;
  Priority: IPriority;
  ProofInstructions: null;
  ProofType: null;
  SpotColorMatch?: boolean;
  SpotColorMatchInstructions: null;
  StatusReason: IJobStatusReason;
  Subject?: string;
  TaskNumber: null;
  Type: IJobType;
  UPSAccount: null;
  USPSAccount: null;
  VariableProgramming?: boolean;
  VariableProgrammingInstructions: null;
}
