import EditIcon from '@rsuite/icons/Edit';
import GrowthIcon from '@rsuite/icons/Growth';
import ListOl from '@rsuite/icons/legacy/ListOl';
import React from 'react';

type FeatureItemType = {
  key: string;
  title: string;
  path: string;
  icon?: string;
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
    icon: <ListOl />,
    key: '1',
    items: [
      {
        key: 'punycode',
        title: 'Punycode',
        path: '/punycode',
      },
      {
        key: 'base64',
        title: 'Base64',
        path: '/base64',
      },
      {
        key: 'urlencode',
        title: 'URL',
        path: '/urlencode',
      },
    ],
  },
  {
    title: 'テキストツール',
    icon: <EditIcon />,
    key: '2',
    items: [
      {
        key: 'character_count',
        title: '文字数カウント',
        path: '/character_count',
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
    ],
  },
  {
    title: '数値ツール',
    icon: <ListOl />,
    key: '3',
    items: [
      {
        key: 'number_comma',
        title: '数字カンマ区切り',
        path: '/number_comma',
      },
      {
        key: 'date_converter',
        title: '日時の変換',
        path: '/date_converter',
      },
      {
        key: 'date_diff',
        title: '日数計算',
        path: '/date_diff',
      },
    ],
  },
  {
    title: '生成ツール',
    icon: <GrowthIcon />,
    key: '4',
    items: [
      {
        key: 'hash',
        title: 'Hash',
        path: '/hash',
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
      },
      {
        key: 'image_generator',
        title: '画像生成',
        path: '/image_generator',
      },
    ],
  },
];

export type FeatureKeys = (typeof features)[number]['key'];
