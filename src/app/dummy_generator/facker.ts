import { faker } from '@faker-js/faker/locale/ja';
import type { DefaultOptionType } from 'antd/es/select';

export const dataTypeOptions = [
  {
    label: '氏名',
    options: [
      {
        label: '氏名',
        value: 'name',
      },
    ],
  },
] as const;

export type DataType = (typeof dataTypeOptions)[number]['options'][number]['value'];

export const nameOptions = [
  {
    label: '姓名',
    value: 'name',
  },
  {
    label: '名字',
    value: 'lastName',
  },
  {
    label: '名前',
    value: 'firstName',
  },
] as const;

export const nameDataOptions = [
  {
    label: '漢字',
    value: 'ja',
  },
  {
    label: 'カタカナ',
    value: 'jaKana',
  },
  {
    label: 'ローマ字',
    value: 'jaRomazi',
  },
] as const;
