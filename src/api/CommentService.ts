/**
 * CompliChain by Sepire
 *
 * @author Mike Taylor <mike.taylor@shoregrp.com>
 */

import { ServiceBase } from './ServiceBase';
import { ICommentModel } from '../models/ICommentModel';
import { IJobModel } from '../models/IJobModel';

/**
 * Comments Service - API
 *
 * This class serves as the API client for
 * managing job records on MS Dynamics via
 * the ASP.net middleware server.
 */
export default class CommentService extends ServiceBase {
  /**
   * Pull all Comments and filter them based on a search term.
   *
   * @param id String
   * @returns Promise<ICommentModel[]>
   */
  public static async fetchComments(
    job: IJobModel = null,
    id: string = null,
  ): Promise<ICommentModel[]> {
    var result = await this.requestJson<ICommentModel[]>({
      url: `${process.env.REACT_APP_API_ENDPOINT_URL}/api/job/${
        job.Id
      }/comment`,
      method: 'GET',
    });
    console.log('result', result);
    return result.value;
  }

  /**
   * Update a remote Comment record
   *
   * @param model ICommentModel
   * @returns Promise<ICommentModel>
   */
  public static async update(model: ICommentModel): Promise<ICommentModel> {
    var result = await this.requestJson<ICommentModel>({
      url: `${process.env.REACT_APP_API_ENDPOINT_URL}/api/comment`,
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
    var result = await this.requestJson<ICommentModel>({
      url: `${process.env.REACT_APP_API_ENDPOINT_URL}/api/comment/${id}`,
      method: 'DELETE',
    });

    // TODO: Add in delete confirmation or error out
    console.log('DELETE: ', result);
    return true;
  }

  /**
   * Add a new Comment record
   *
   * @param id ICommentModel
   */
  public static async add(
    job: IJobModel,
    model: ICommentModel,
  ): Promise<string> {
    var result = await this.requestJson<ICommentModel>({
      url: `${process.env.REACT_APP_API_ENDPOINT_URL}/api/job/${
        job.Id
      }/comment`,
      method: 'POST',
      data: model,
    });

    if (!result || !result.value || !result.value.Id) {
      return '';
    }

    return result.value.Id;
  }
}
