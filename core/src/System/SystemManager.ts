import SystemScheduler from "./SystemScheduler";

export default class SystemManager
{
    private _systemScheduler: SystemScheduler;

    constructor()
    {
        this._systemScheduler = new SystemScheduler();
    }

    public Start(): void
    {
        this._systemScheduler.Start();
    }
}