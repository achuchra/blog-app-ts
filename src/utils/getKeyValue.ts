export const getKeyValue = <T extends Record<string, any>, U extends keyof T>(key: U) => (obj: T) => obj[key];
