import { ServiceBase } from "./ServiceBase";
import { ITaskModel } from "../models/ITaskModel";

export default class TaskService extends ServiceBase {
    public static async search(term: string = null): Promise<ITaskModel[]> {
        if (term == null) {
            term = "";
        }
        var result = await this.requestJson<ITaskModel[]>({
            url: `${window['endPoint']}/api/Task`,
            method: "GET"
        });
        return ! term ? result.value : result.value.filter(
            (task) => task.name.indexOf(term) > -1 || 
                task.description.indexOf(term) > -1 || 
                task.taskID.toString().indexOf(term) > -1);
    }
    public static async update(model: ITaskModel): Promise<ITaskModel> {
        var result = await this.requestJson<ITaskModel>({
            url: `${window['endPoint']}/api/Task`,
            method: "PUT",
            data: model
        });
        return result.value;
    }
    public static async delete(id: number): Promise<boolean> {
        var result = await this.requestJson<ITaskModel>({
            url: `${window['endPoint']}/api/Task/${id}`,
            method: "DELETE"
        });
        return true;
    }
    public static async add(model: ITaskModel): Promise<number> {
        var result = await this.requestJson<ITaskModel>({
            url: `${window['endPoint']}/api/Task`,
            method: "POST",
            data: model
        });
        return result.value.taskID;
    }
}