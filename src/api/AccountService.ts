import { ILoginModel } from "../models/ILoginModel";
import { IServiceUser } from "../models/IServiceUser";
import Result from "../models/Result";
import { ServiceBase } from "./ServiceBase";
import Globals from "../Globals";

export default class AccountService extends ServiceBase {
    
    static async login(loginModel: ILoginModel) : Promise<Result<IServiceUser>> {
        var result = {"hasErrors": false, "value": {"login": loginModel.login}, "errors": []};
        // await this.requestJson<IServiceUser>({
        //    url: "api/Account/Login",
        //    method: "POST",
        //    data: loginModel
        // });

        if ( ! result.hasErrors) {
            Globals.serviceUser = result.value;
        }

        window.localStorage.setItem('publicSession', JSON.stringify({
            "serviceUser": result.value
        }));

        return result;
    }

    static async logout(): Promise<Result<{}>> {
        var result = {"hasErrors": false, "errors": [], "value": ""};
        // await this.requestJson<IServiceUser>({
        //    url: "api/Account/Logout",
        //    method: "POST"
        // });

        if ( ! result.hasErrors) {
            Globals.serviceUser = <IServiceUser>{};
        }

        window.localStorage.setItem('publicSession', JSON.stringify({
            "serviceUser": null
        }));

        return result;
    }
}