import { DebugType } from "./DebugType";

export default class Debug
{
    private static readonly LOG_PREFIX = 
    [
        "LOG: ",
        "WARNING: ",
        "ERROR: "
    ];

    public static Log(message: any): void
    {
        Debug.SendMessage(message, DebugType.LOG);
    }

    public static Warning(message: any): void
    {
        Debug.SendMessage(message, DebugType.WARNING);
    }

    public static Error(message: any): void
    {
        //Debug.SendMessage(message, DebugType.ERROR);
        throw Error("ERROR: " + message);
    }

    private static SendMessage(message: any, type: DebugType): void
    {
        console.log(Debug.LOG_PREFIX[type] + (message));
        //Send event
    }
}