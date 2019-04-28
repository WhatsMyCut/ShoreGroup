import { IJobType, IJobStatusReason } from './IJobModel';

export interface IColor {
  Name?: string;
  Value?: number;
}
export interface IFinishSize {
  Name?: string;
  Value?: number;
}
export interface IFinishing {
  Name?: string;
  Value?: number;
}
export interface ISimplexDuplex {
  Name?: string;
  Value?: number;
}
export interface IStock {
  Name?: string;
  Value?: number;
}
export interface IUrl {
  Name?: string;
  Value?: number;
}
export interface IBinding {
  Name?: string;
  Value?: number;
}
export interface IAttachmentModel {
  AzureBlobId?: number;
  Binding?: IBinding;
  Color?: IColor;
  CreatedOn?: string;
  FinishSize?: IFinishSize;
  Finishing?: IFinishing[];
  FlatSize?: string;
  Id: string;
  ModifiedOn?: string;
  Name: string;
  Orientation?: string;
  PageCount?: string;
  PlusCoverStock?: string;
  PrintReady?: boolean;
  SimplexOrDuplex?: ISimplexDuplex;
  StatusReason: IJobStatusReason;
  Stock?: IStock;
  Type?: IJobType;
  Url?: IUrl;
  VariablePageLength?: boolean;
}
