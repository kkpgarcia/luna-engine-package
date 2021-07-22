import NotificationCenter from "../../Events/NotificationCenter";
import EventArgs from "../../Events/EventArgs";
import Services from "../Service/Services";

export default class SystemScheduler
{
    public static readonly UPDATE_NOTIFICATION = "SystemScheduler.UPDATE_NOTIFICATION";
    public static readonly SYSTEM_UPDATE_NOTIFICATION = "SystemScheduler.SYSTEM_UPDATE_NOTIFICATION";

    private _currentTime: number;
    private _frameRate: number;
    private _isPaused: boolean;
    private _timeScale: number;
    private _startTime: number;
    private _systemStartTime: number;
    private _lastTime: number;

    private _currentFpsCount: number;
    private _currentSystemFpsCount: number;

    private _requestAnimationHandler: number;
    private _update: FrameRequestCallback;
    private _internalUpdate: FrameRequestCallback;
    private _isRunning: boolean;
    private _notificationCenter: NotificationCenter;

    constructor(frameRate: number = 30, timeScale: number = 1)
    {
        this._frameRate = frameRate;
        this._timeScale = timeScale;
        this._isPaused = false;
        this._systemStartTime = 0;
        this._currentTime = 0;
        this._currentFpsCount = 0;
        this._currentSystemFpsCount = 0;
        this._lastTime = 0;
        this._isRunning = false;

        this._internalUpdate = this.InternalUpdate;
        this._update = (time: number) => this._internalUpdate(time);
        this._notificationCenter = Services.NotificationCenter;
    }
    
    public Start(): void
    {
        if (this._isRunning)
        {
            return;
        }
        
        this._isRunning = true;
        this._currentTime = performance.now() * this._timeScale;
        this._startTime = this.GetStartTime(this._currentTime, this._currentFpsCount);
        this._systemStartTime = this.GetStartTime(this._currentTime, this._currentSystemFpsCount);
        
        this.Stop();
        this._requestAnimationHandler = requestAnimationFrame(this._update);
    }

    public Stop(): void
    {
        cancelAnimationFrame(this._requestAnimationHandler);
    }

    public Pause(value: boolean): void
    {
        this._isPaused = value;
    }

    private SystemUpdate(deltaTime: number): void
    {
        if(!this._notificationCenter)
        {
            this.ResolveDispatcher();
            return;
        }

        this._notificationCenter.PostNotification(SystemScheduler.SYSTEM_UPDATE_NOTIFICATION, new EventArgs<number>(deltaTime));
        this._currentSystemFpsCount++;
    }

    private Update(deltaTime: number): void
    {
        if(!this._notificationCenter)
        {
            this.ResolveDispatcher();
            return;
        }

        this._notificationCenter.PostNotification(SystemScheduler.UPDATE_NOTIFICATION, new EventArgs<number>(deltaTime));
        this._currentFpsCount++;
    }

    private InternalUpdate(time: number): void
    {
        time *= this._timeScale;
        this._currentTime = time;

        let targetFps = this.GetTargetFrameRate(time, this._startTime);
        let systemTargetFps = this.GetTargetFrameRate(time, this._systemStartTime);
        let deltaTime =  (this._currentTime - this._lastTime) / 1000;

        if (targetFps < this._currentFpsCount - 1)
        {
            targetFps = this._currentFpsCount;
            this._startTime = this.GetStartTime(time, targetFps);
        }

        if (!this._isPaused)
        {
            while(this._currentFpsCount < targetFps)
            {
                this.Update(deltaTime);
            }
        }

        while (this._currentSystemFpsCount < systemTargetFps)
        {
            this.SystemUpdate(deltaTime);
        }

        if (this._isRunning)
        {
            this.Stop();
            this._requestAnimationHandler = requestAnimationFrame(this._update);
        }

        this._lastTime = this._currentTime;
    }

    private GetStartTime(time: number, currentCount: number): number
    {
        return time - currentCount * 1000 / this._frameRate;
    }

    private GetTargetFrameRate(time: number, startTime: number): number
    {
        return (time - startTime) * (this._frameRate / 1000);
    }

    private ResolveDispatcher(): void
    {
        if (!this._notificationCenter)
        {
            this._notificationCenter = Services.NotificationCenter;
        }
    }
}