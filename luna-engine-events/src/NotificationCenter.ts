import Debug from "../Debug/Debug";
import ArrayEx from "../Util/ArrayEx";
import EventArgs from "./EventArgs";

export default class NotificationCenter
{
    private static _instance: NotificationCenter;
    private _table: Map<string, Map<Object, Array<Function>>>;
    private _invoking: Array<Array<Function>>;
    
    public static get instance(): NotificationCenter
    {
        if (this._instance == null)
        {
            this._instance = new NotificationCenter();
        }

        return this._instance;
    }
    
    constructor()
    {
        this._table = new Map<string, Map<Object, Array<Function>>>();
        this._invoking = new Array<Array<Function>>();
    }

    public AddObserver(callback: Function, name: string, sender?: Object): void
    {
        if (!this.IsValid(callback, name))
        {
            Debug.Error("Parameters invalid when adding an observer.");
            return;
        }

        if (!this._table.has(name))
        {
            this._table.set(name, new Map<Object, Array<Function>>());
        }

        var subTable: Map<Object, Array<Function>> = this._table.get(name);
        const key = this.GetKey(sender);


        if (!subTable.has(key))
        {
            subTable.set(key, new Array<Function>());
        }

        let list = subTable.get(key);

        if (!list.find(x => x === callback))
        {
            if (this._invoking.find(x => x === list))
            {
                subTable.set(key, list)
            }

            list.push(callback);
        }
    }

    public RemoveObserver(callback: Function, name: string, sender: Object): void
    {
        if (!this.IsValid(callback, name))
        {
            Debug.Error("Parameters invalid.");
            return;
        } 

        if (!this._table.has(name))
        {
            return;
        }

        let subTable: Map<Object, Array<Function>> = this._table[name];
        let key = this.GetKey(sender);

        if (!subTable.has(key))
        {
            return;
        }

        let list = subTable.get(key);
        let index = list.indexOf(callback);

        if (!list.find(x => x === callback))
        {
            if (this._invoking.find(x => x === list))
            {
                subTable.set(key, list)
            }

            delete list[index];
        }
    }

    public PostNotification(name: string, args: EventArgs<any> = null, sender: Object = this): void
    {
        if (name === '')
        {
            Debug.Error("Notification Name is Required");
            return;
        }
        
        if (!this._table.has(name))
        {
            return;
        }

        let subTable: Map<Object, Array<Function>> = this._table.get(name);
        let key = this.GetKey(sender);

        this.InvokeFunction(subTable, key, args);
    }

    private InvokeFunction(senderTable: Map<Object, Array<Function>>, sender: Object, args: any): void
    {
        if (senderTable.has(sender))
        {
            let handlers = senderTable.get(sender);
            this._invoking.push(handlers);

            for (let i = 0; i < handlers.length; i++)
            {
                let handler = handlers[i];

                if (handler === null)
                {
                    continue;
                }
                
                handler(sender, args);
            }

            this._invoking = ArrayEx.RemoveElement(this._invoking, handlers);
        }
    }

    private IsValid(callback: Function, name: string): boolean
    {
        return callback != null || name !== '';
    }

    private GetKey(sender: Object): Object
    {
        return (sender != null) ? sender : this;
    }
}