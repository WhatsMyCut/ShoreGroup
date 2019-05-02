/**
 * CompliChain by Sepire
 *
 * @author Matthew Dunham <matthew.d@shoregrp.com>
 */

import { ServiceBase } from './ServiceBase';
import { ITaskModel } from '../models/ITaskModel';

/**
 * Jobs Service - API
 *
 * This class serves as the API client for
 * managing job records on MS Dynamics via
 * the ASP.net middleware server.
 */
export default class TaskService extends ServiceBase {
  /**
   * Pull all Jobs and filter them based on a search term.
   *
   * @param term String
   * @returns Promise<ITaskModel[]>
   */
  public static async search(term: string = null): Promise<ITaskModel[]> {
    if (term == null) term = '';
    var result = await this.requestJson<ITaskModel[]>({
      url: `${window['endPoint']}/api/Task?query=${term}`,
      method: 'GET',
    });

    return !term
      ? result.value
      : result.value.filter(
          (task: ITaskModel) =>
            task.Subject.indexOf(term) > -1 ||
            task.Id.toString().indexOf(term) > -1,
        );
  }

  /**
   * Update a remote Job record
   *
   * @param model ITaskModel
   * @returns Promise<ITaskModel>
   */
  public static async update(model: ITaskModel): Promise<ITaskModel> {
    var result = await this.requestJson<ITaskModel>({
      url: `${window['endPoint']}/api/Task`,
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
  public static async delete(id: number): Promise<boolean> {
    var result = await this.requestJson<ITaskModel>({
      url: `${window['endPoint']}/api/Task/${id}`,
      method: 'DELETE',
    });

    // TODO: Add in delete confirmation or error out
    console.log('DELETE: ', result);
    return true;
  }

  /**
   * Add a new Job record
   *
   * @param model ITaskModel
   */
  public static async add(model: ITaskModel): Promise<number> {
    var result = await this.requestJson<ITaskModel>({
      url: `${window['endPoint']}/api/Task`,
      method: 'POST',
      data: model,
    });

    if (!result || !result.value || !result.value.Id) {
      return 0;
    }

    return result.value[0].Id;
  }
}
