export interface Map<TValue> {
    [K: string]: TValue;
}

export interface KeyValue<TKey, TValue> {
    Key: TKey;
    Value: TValue;
}
