import NotificationCenter from "../../Events/NotificationCenter";
import AppCache from "../../Utility/AppCache";
import RenderingContext from "../../Renderer/RenderingContext";
import Resource from "../../Utility/Resource";

export default class Services
{
    private static _appCache: AppCache;
    private static _notificationCenter: NotificationCenter;
    private static _resrouce: Resource;
    private static _renderingContext: RenderingContext;

    constructor(renderingContext: RenderingContext, appCache: AppCache, notificationCenter: NotificationCenter, resources: Resource)
    {
        Services._appCache = appCache;
        Services._notificationCenter = notificationCenter;
        Services._resrouce = resources;
        Services._renderingContext = renderingContext;
    }

    public static get AppCache()
    {
        return Services._appCache;
    }

    public static get NotificationCenter()
    {
        return Services._notificationCenter;
    }

    public static get Resource()
    {
        return Services._resrouce;
    }

    public static get RenderingContext()
    {
        return Services._renderingContext;
    }
}