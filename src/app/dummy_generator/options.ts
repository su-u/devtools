export const dataTypeOptions = [
  {
    label: '個人情報',
    options: [
      {
        label: '氏名',
        value: 'name',
      },
      {
        label: '電話番号',
        value: 'phoneNumber',
      },
      {
        label: '郵便番号',
        value: 'zipcode',
      },
      {
        label: '住所',
        value: 'address',
      },
      {
        label: '仕事',
        value: 'job',
      },
    ],
  },
  {
    label: 'インターネット',
    options: [
      {
        label: 'Eメールアドレス',
        value: 'email',
      },
      {
        label: 'URI',
        value: 'uri',
      },
      {
        label: 'IPv4アドレス',
        value: 'ipv4',
      },
      {
        label: 'IPv6アドレス',
        value: 'ipv6',
      },
    ],
  },
  {
    label: '会社',
    options: [
      {
        label: '会社名',
        value: 'companyName',
      },
      {
        label: '会社カテゴリ',
        value: 'companyCategory',
      },
      {
        label: '会社メールアドレス',
        value: 'companyEmail',
      },
    ],
  },
  {
    label: 'その他',
    options: [
      {
        label: '絵文字',
        value: 'emoji',
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

export const addressOptions = [
  {
    label: 'フル',
    value: 'full',
  },
  {
    label: '県',
    value: 'prefecture',
  },
  {
    label: '市区町村',
    value: 'city',
  },
  {
    label: '丁目',
    value: 'chome',
  },
  {
    label: '番',
    value: 'ban',
  },
  {
    label: '号',
    value: 'gou',
  },
] as const;
