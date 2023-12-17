import EditIcon from '@rsuite/icons/Edit';
import GrowthIcon from '@rsuite/icons/Growth';
import ListOl from '@rsuite/icons/legacy/ListOl';
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
    icon: <ListOl />,
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
    icon: <EditIcon />,
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
        description: '日付のフォーマットを変換します',
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
    icon: <GrowthIcon />,
    key: '4',
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
