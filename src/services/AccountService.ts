import { ILoginModel } from "@Models/ILoginModel";
import { IServiceUser } from "@Models/IServiceUser";
import Result from "@Models/Result";
import { ServiceBase } from "./ServiceBase";
import Globals from "@Globals";

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
        var result = {"hasErrors": false, "errors": [], "value": null};
        // await this.requestJson<IServiceUser>({
        //    url: "api/Account/Logout",
        //    method: "POST"
        // });

        if ( ! result.hasErrors) {
            Globals.serviceUser = null;
        }

        window.localStorage.setItem('publicSession', JSON.stringify({
            "serviceUser": null
        }));

        return result;
    }
}