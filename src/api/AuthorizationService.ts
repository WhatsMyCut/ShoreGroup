import { ServiceBase } from './ServiceBase';
import { IUserInfoModel } from '../models/IUserInfoModel';

/**
 * Authorization Service - API
 *
 * This class serves as the API client for
 * managing authorization.
 */
export default class AuthorizationService extends ServiceBase {
  /**
   * Pull user info for the currently logged-in user
   *
   * @returns Promise<IUserInfo>
   */
  public static async userinfo(): Promise<IUserInfoModel> {
    var result = await this.requestJson<IUserInfoModel>({
      url: `${process.env.REACT_APP_API_ENDPOINT_URL}/api/userinfo`,
      method: 'GET',
    });
    return result.value;
  }
}
