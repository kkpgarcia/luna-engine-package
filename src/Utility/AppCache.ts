export enum CacheType
{
    TEXTURE,
    SHADER,
    TEXT,
    FONT
}

export default class AppCache
{
    private _textureCache: Map<string, HTMLImageElement>;
    private _fontCache: Map<string, HTMLImageElement>;
    private _shaderCache: Map<string, string>;
    private _textCache: Map<string, string>;

    constructor()
    {
        this._textureCache = new Map<string, HTMLImageElement>();
        this._textCache = new Map<string, string>();
        this._fontCache = new Map<string, HTMLImageElement>();
        this._shaderCache = new Map<string, string>();
    }

    public GetCount(type: CacheType)
    {
        switch(type)
        {
            case CacheType.TEXTURE:
                return this._textureCache.size;
            case CacheType.SHADER:
                return this._shaderCache.size;
            case CacheType.FONT:
                return this._fontCache.size;
            case CacheType.TEXT:
                return this._textCache.size;
            default:
                return -1;
        }
    }

    public AddTexture(key: string, image: HTMLImageElement, override?: false): void
    {
        this.AddCache<HTMLImageElement>(key, image, this._textureCache, override);
    }
    
    public AddFont(key: string, image: HTMLImageElement, override?: false): void
    {
        this.AddCache<HTMLImageElement>(key, image, this._fontCache, override);
    }

    public AddShader(key: string, source: string, override?: false): void
    {
        this.AddCache<string>(key, source, this._shaderCache, override);
    }

    public AddText(key: string, source: string, override?: false): void
    {
        this.AddCache<string>(key, source, this._textCache, override);
    }

    private AddCache<T>(key: string, data: T, map: Map<string, T>, override?: false): void
    {
        if (this.KeyCheck(map, key) && !override)
        {
            return;
        }

        map.set(key, data);
    }

    public GetTexture(key: string): HTMLImageElement
    {
        return this.GetCache<HTMLImageElement>(key, this._textureCache);
    }

    public GetFont(key: string): HTMLImageElement
    {
        return this.GetCache<HTMLImageElement>(key, this._fontCache);
    }

    public GetShader(key: string): string
    {
        return this.GetCache<string>(key, this._shaderCache);
    }
    
    public GetText(key: string): string
    {
        return this.GetCache<string>(key, this._textCache);
    }

    private GetCache<T>(key: string, map: Map<string, T>): T
    {
        return map.get(key);
    }

    public DisposeKey(type: CacheType, key: string): void
    {
        switch(type)
        {
            case CacheType.TEXTURE:
                this._textureCache.delete(key);
                break;
            case CacheType.FONT:
                this._fontCache.delete(key);
                break;
            case CacheType.SHADER:
                this._shaderCache.delete(key);
                break;
            case CacheType.TEXT:
                this._textCache.delete(key);
                break;
        }
    }

    public DisposeCache(type: CacheType)
    {
        switch(type)
        {
            case CacheType.TEXTURE:
                this._textureCache.clear();
                break;
            case CacheType.FONT:
                this._fontCache.clear();
                break;
            case CacheType.SHADER:
                this._shaderCache.clear();
                break;
            case CacheType.TEXT:
                this._textCache.clear();
                break;
        }
    }

    public DisposeAll(): void
    {
        this._textureCache.clear();
        this._textCache.clear();
        this._shaderCache.clear();
        this._fontCache.clear();
    }

    public CheckContains(keys: string[]): boolean
    {
        let retVal = true;
        for (let i = 0; i < keys.length; i++)
        {
            const key = keys[i];

            retVal = this.KeyCheck(this._textureCache, key) || 
                     this.KeyCheck(this._textCache, key) ||
                     this.KeyCheck(this._shaderCache, key) ||
                     this.KeyCheck(this._fontCache, key);
        }

        return retVal;
    }

    public CheckCache()
    {
        console.log(this._textCache);
        console.log(this._textureCache);
        console.log(this._fontCache);
        console.log(this._shaderCache);
    }

    private KeyCheck<K, V>(map: Map<K, V>, key: K): boolean
    {
        if (map.has(key))
        {
            console.warn("Already contains a cache for the key: " + key)
            return true;
        }
        else
        {
            return false;
        }
    }
}

