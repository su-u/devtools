import { v1, v3, v4, v5 } from 'uuid';

export type Options = {
  isUppercase?: boolean;
  isHyphen?: boolean;
  name?: string;
  namespace?: string;
};

export const generateUUIDs = (version: number, generateCount: number, options?: Options) => {
  const uuids: string[] = [];
  for (let i = 0; i < generateCount; i++) {
    const uuid = getUUID(version, options);
    const processedUUID = UUIDProcessor(uuid, options);
    uuids.push(processedUUID);
  }
  return uuids;
};

const UUIDProcessor = (uuid: string, options?: Options) => {
  const { isUppercase, isHyphen } = options;
  const processedHyphen = isHyphen ? uuid : uuid.replaceAll('-', '');
  const processedUppercase = isUppercase ? processedHyphen.toUpperCase() : processedHyphen;

  return processedUppercase;
};

export const getUUID = (version: number, options?: Options) => {
  const { name, namespace } = options;
  switch (version) {
    case 1:
      return v1();
    case 3:
      return v3(name, namespace);
    case 4:
      return v4();
    case 5:
      return v5(name, namespace);
    default:
      new Error('不正なバージョンです。');
  }
};
