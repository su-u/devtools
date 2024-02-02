import type { DataType, nameType, nameDataType, addressType } from '@/app/dummy_generator/options';

type Option = undefined | nameType | nameDataType | addressType;

export const facker = (dataType: DataType, option: Option) => {
  switch (dataType) {
    case 'name': {
      return nameFacker(option as nameType);
    }
    default:
      break;
  }

  return [];
};

const nameFacker = (option: nameType) => {};
