export interface IUserGroupModel {
  guid?: string;
  name?: string;
  groupType?: string;
  groups?: IUserGroupModel[];
}

export interface IUserInfoModel {
  guid?: string;
  name?: string;
  email?: string;
  account?: string;
  accounts?: IUserGroupModel[];
  programs?: string[];
  roles?: string[];
}
