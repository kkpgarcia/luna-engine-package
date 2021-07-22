class ScreenConfig 
{
    public width: number;
    public height: number;
}

class SystemConfig
{
    public fps: number;
}

export default class Config
{
    public screenConfig: ScreenConfig;
    public systemConfig: SystemConfig;

    constructor(config: { screen, system }) 
    {
        this.screenConfig = config.screen;
        this.systemConfig = config.system;    
    }
}