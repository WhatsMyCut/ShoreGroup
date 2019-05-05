/**
 * CompliChain by Sepire
 *
 * @author Mike Taylor <mike.taylor@shoregrp.com>
 */

import { ServiceBase } from './ServiceBase';
import { IJobModel } from '../models/IJobModel';

/**
 * Jobs Service - API
 *
 * This class serves as the API client for
 * managing job records on MS Dynamics via
 * the ASP.net middleware server.
 */
export default class JobService extends ServiceBase {
  /**
   * Pull all Jobs and filter them based on a search term.
   *
   * @param id String
   * @returns Promise<IJobModel[]>
   */
  public static async fetch(id: string = null): Promise<IJobModel[]> {
    id = id == null ? '' : `/${id}`;
    var result = await this.requestJson<IJobModel[]>({
      url: `${process.env.REACT_APP_API_ENDPOINT_URL}/api/job` + id,
      method: 'GET',
    });
    return result.value;
  }

  /**
   * Update a remote Job record
   *
   * @param model IJobModel
   * @returns Promise<IJobModel>
   */
  public static async update(model: IJobModel): Promise<IJobModel> {
    var result = await this.requestJson<IJobModel>({
      url: `${process.env.REACT_APP_API_ENDPOINT_URL}/api/job`,
      method: 'PUT',
      data: model,
    });

    return result.value;
  }

  /**
   * Delete a job record
   *
   * @param id int
   */
  public static async delete(id: string): Promise<boolean> {
    var result = await this.requestJson<IJobModel>({
      url: `${process.env.REACT_APP_API_ENDPOINT_URL}/api/job/${id}`,
      method: 'DELETE',
    });

    // TODO: Add in delete confirmation or error out
    console.log('DELETE: ', result);
    return true;
  }

  /**
   * Add a new Job record
   *
   * @param model IJobModel
   */
  public static async add(model: IJobModel): Promise<string> {
    var result = await this.requestJson<IJobModel>({
      url: `${process.env.REACT_APP_API_ENDPOINT_URL}/api/job`,
      method: 'POST',
      data: model,
    });

    if (!result || !result.value || !result.value.Id) {
      return '';
    }

    return result.value.Id;
  }
}
