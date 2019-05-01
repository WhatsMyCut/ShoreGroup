import { IAttachmentModel } from './IAttachmentModel';
import { IJobStatusReason, IJobType } from './IJobModel';
export interface IPriority {
  Name?: string;
  Value?: number;
}
export interface IInstruction {
  Name?: string;
  Value?: number;
}
export interface ICarrierAccount {
  Name?: string;
  Value?: number;
}
export interface IProofType {
  Name?: string;
  Value?: number;
}
export interface ITaskModel {
  Attachment?: IAttachmentModel;
  CASS?: boolean;
  CASSInstructions: IInstruction;
  CreatedOn?: string;
  Dedupe?: boolean;
  DueDate?: string;
  FedexAccount: ICarrierAccount;
  Household?: boolean;
  HouseholdInstructions: IInstruction;
  Id: string;
  ModifiedOn?: string;
  NCOA?: boolean;
  NCOAInstructions: IInstruction;
  Presort?: boolean;
  Priority: IPriority;
  ProofInstructions: IInstruction;
  ProofType: IProofType;
  SpotColorMatch?: boolean;
  SpotColorMatchInstructions: IInstruction;
  StatusReason: IJobStatusReason;
  Subject?: string;
  TaskNumber: number;
  Type: IJobType;
  UPSAccount: ICarrierAccount;
  USPSAccount: ICarrierAccount;
  VariableProgramming?: boolean;
  VariableProgrammingInstructions: IInstruction;
}
