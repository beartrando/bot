export const stateStoreConfig = {} as const;

export type StateStoreKey = keyof typeof stateStoreConfig;

export type StateStoreEntity<K extends StateStoreKey> = typeof stateStoreConfig[K];

export default stateStoreConfig;
