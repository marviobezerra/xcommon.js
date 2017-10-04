export declare enum ExecuteMessageType {
    Error = 1,
    Warning = 2,
    Exception = 3,
}
export declare enum EntityAction {
    None = 0,
    New = 1,
    Update = 2,
    Delete = 3,
}
export interface IMap<TValue> {
    [K: string]: TValue;
}
export interface IKeyValue<TKey, TValue> {
    Key: TKey;
    Value: TValue;
}
