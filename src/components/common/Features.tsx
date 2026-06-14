import {
  BgColorsOutlined,
  ClockCircleOutlined,
  EditOutlined,
  OrderedListOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import React from 'react';

export type FeatureItemType = {
  key: string;
  title: string;
  shortTitle?: string;
  path: string;
  icon?: string;
  description?: React.ReactNode;
};

type FeatureGroupType = {
  title: string;
  icon?: React.ReactElement;
  key?: string;
  items?: FeatureItemType[];
};

export const features: FeatureGroupType[] = [
  {
    title: 'エンコード',
    icon: <OrderedListOutlined />,
    key: '1',
    items: [
      {
        key: 'punycode',
        title: 'Punycodeエンコード',
        shortTitle: 'Punycode',
        path: '/punycode',
        description: '文字列をpunycodeエンコードします',
      },
      {
        key: 'base64',
        title: 'Base64エンコード',
        shortTitle: 'Base64',
        path: '/base64',
        description: '文字列をBase64エンコードします',
      },
      {
        key: 'urlencode',
        title: 'URLエンコード',
        shortTitle: 'URL',
        path: '/urlencode',
        description: '文字列をURLエンコードします',
      },
    ],
  },
  {
    title: 'テキストツール',
    icon: <EditOutlined />,
    key: '2',
    items: [
      {
        key: 'character_count',
        title: '文字数カウント',
        path: '/character_count',
        description: '文字数や行数をカウントします',
      },
      {
        key: 'character_replace',
        title: '文字列置換',
        path: '/character_replace',
      },
      {
        key: 'diff',
        title: 'テキスト差分',
        path: '/diff',
      },
      {
        key: 'json_formatter',
        title: 'JSONフォーマット',
        path: '/json_formatter',
      },
      {
        key: 'json_view',
        title: 'JSONビューアー',
        path: '/json_view',
      },
    ],
  },
  {
    title: '数値ツール',
    icon: <OrderedListOutlined />,
    key: '3',
    items: [
      {
        key: 'number_comma',
        title: '数字カンマ区切り',
        path: '/number_comma',
      },
      {
        key: 'radix_converter',
        title: '基数変換',
        path: '/radix_converter',
        description: '2進数・8進数・10進数・16進数を相互変換します',
      },
    ],
  },
  {
    title: 'カラーツール',
    icon: <BgColorsOutlined />,
    key: 'color',
    items: [
      {
        key: 'color_converter',
        title: 'カラーコード変換',
        shortTitle: 'カラーコード',
        path: '/color_converter',
        description: 'HEX・RGB・HSLを相互変換します',
      },
    ],
  },
  {
    title: '時間ツール',
    icon: <ClockCircleOutlined />,
    key: '4',
    items: [
      {
        key: 'datetime_converter',
        title: '日時->日時変換',
        path: '/datetime_converter',
        description: '日時を変換します',
      },
      {
        key: 'unixtime_converter',
        title: 'UnixTime->日時変換',
        path: '/unixtime_converter',
        description: 'Unixtimeを変換します',
      },
      {
        key: 'date_diff',
        title: '日数計算',
        path: '/date_diff',
        description: '2つの時間から差分の時間を計算します',
      },
    ],
  },
  {
    title: '生成ツール',
    icon: <RiseOutlined />,
    key: '5',
    items: [
      {
        key: 'hash',
        title: 'Hash',
        path: '/hash',
        description: '文字列からハッシュを生成します',
      },
      // {
      //   key: 'dummy',
      //   title: 'ダミーデータ',
      //   path: '/dummy',
      // },
      {
        key: 'uuid',
        title: 'UUID',
        path: '/uuid',
        description: '複数のUUIDを生成します',
      },
      {
        key: 'image_generator',
        title: '画像生成',
        path: '/image_generator',
        description: 'ダミー用の画像を生成します',
      },
    ],
  },
];

export type FeatureKeys = (typeof features)[number]['key'];
