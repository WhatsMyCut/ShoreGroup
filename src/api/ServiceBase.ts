/**
 * Services Base - API
 * 
 * This is the base class that all API services should extend.
 * 
 * @author Matthew Dunham <matthew.d@shoregrp.com>
 */

import { Ui } from "../Ui";
import Result from "../models/Result";
import Axios, { AxiosRequestConfig } from "axios";
import jsonToUrl from "json-to-url";

// Type mappings for REST requests
export interface IRequestOptions {
  url: string;
  data?: any;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

// Type mappings for file uploads
export interface ISendFormDataOptions {
  url: string;
  data: FormData;
  method: "POST" | "PUT" | "PATCH";
}

/**
 * Represents base class of the isomorphic service.
 */
export abstract class ServiceBase {

  /**
   * Make request with JSON data.
   * @param opts
   */
  public static async requestJson<T>(opts: IRequestOptions): Promise<Result<T>> {

    var
      axiosResult = null,
      result = null,
      axiosRequestConfig: AxiosRequestConfig = {},

      // Convert JSON into a query string
      processQuery = (url: string, data: any): string => {
        if (data) {
          return `${url}?${jsonToUrl(data)}`;
        }
        return url;
      };

    // TODO: Add API layer security for authenticating calls
    axiosRequestConfig = {
      // headers: {
      //     Cookie: Globals.getData().private.cookie
      // }
    }

    try {

      switch (opts.method) {
        case "GET":
          axiosResult = await Axios.get(processQuery(opts.url, opts.data), axiosRequestConfig);
          break;
        case "POST":
          axiosResult = await Axios.post(opts.url, opts.data, axiosRequestConfig);
          break;
        case "PUT":
          axiosResult = await Axios.put(opts.url, opts.data, axiosRequestConfig);
          break;
        case "PATCH":
          axiosResult = await Axios.patch(opts.url, opts.data, axiosRequestConfig);
          break;
        case "DELETE":
          axiosResult = await Axios.delete(processQuery(opts.url, opts.data), axiosRequestConfig);
          break;
      }

      if (axiosResult) {
        if ( ! axiosResult.data) {
          axiosResult.data = {};
        }
        // Normalize errors
        if ('undefined' === typeof axiosResult.data.errors)
          axiosResult.data.errors = [];

        // Successful result
        result = new Result(axiosResult.data, ...axiosResult.data.errors);
      } else {

        // No response?
        result = new Result({});
      }

    }
    
    // Handle an axios client error
    catch (error) {
      result = new Result(null, error.message);
    }

    // If errors trigger the notification window
    if (result && result.hasErrors) {
      Ui.showErrors(...result.errors);
    }

    return result;
  }

  /**
   * Allows you to send files to the server.
   * 
   * @param opts
   */
  public static async sendFormData<T>(opts: ISendFormDataOptions): Promise<Result<T>> {

    var
      axiosResult = null,
      result = null,

      // TODO: Add API layer auth
      axiosOpts = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

    try {

      switch (opts.method) {
        case "POST":
          axiosResult = await Axios.post(opts.url, opts.data, axiosOpts);
          break;
        case "PUT":
          axiosResult = await Axios.put(opts.url, opts.data, axiosOpts);
          break;
        case "PATCH":
          axiosResult = await Axios.patch(opts.url, opts.data, axiosOpts);
          break;
      }

      if (axiosResult) {

        // Normalize errors
        if (axiosResult.data && 'undefined' === typeof axiosResult.data.errors)
          axiosResult.data.errors = [];

        // Successful result
        result = new Result(axiosResult.data, ...axiosResult.data.errors);
      } else {

        // No response?
        result = new Result({});
      }
    }

    // Handle an axios client error
    catch (error) {
      result = new Result(null, error.message);
    }

    // Handle API errors
    if (result.hasErrors) {
      Ui.showErrors(...result.errors);
    }

    return result;
  }
}