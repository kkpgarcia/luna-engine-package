import Config from "../../Utility/Config";
import SystemScheduler from "./SystemScheduler";

export default class SystemManager
{
    private _systemScheduler: SystemScheduler;

    constructor(config: Config)
    {
        this._systemScheduler = new SystemScheduler(config.systemConfig.fps);
    }

    public Start(): void
    {
        this._systemScheduler.Start();
    }
}