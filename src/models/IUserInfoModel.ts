export interface IUserGroupModel {
  guid?: string;
  name?: string;
  groupType?: string;
}

export interface IUserInfoModel {
  guid?: string;
  name?: string;
  account?: string;
  program?: string;
  userGroup?: IUserGroupModel[];
}
