import {
  BgColorsOutlined,
  GlobalOutlined,
  CodeOutlined,
  LinkOutlined,
  SafetyCertificateOutlined,
  FontSizeOutlined,
  SwapOutlined,
  DiffOutlined,
  AlignLeftOutlined,
  ApartmentOutlined,
  NumberOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  ScheduleOutlined,
  SafetyOutlined,
  DatabaseOutlined,
  KeyOutlined,
  PictureOutlined,

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
  icon?: React.ReactElement;
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
        icon: <GlobalOutlined />,
        description: '文字列をPunycodeに変換',
      },
      {
        key: 'base64',
        title: 'Base64エンコード',
        shortTitle: 'Base64',
        path: '/base64',
        icon: <CodeOutlined />,
        description: '文字列をBase64に変換',
      },
      {
        key: 'urlencode',
        title: 'URLエンコード',
        shortTitle: 'URL',
        path: '/urlencode',
        icon: <LinkOutlined />,
        description: '文字列をURLエンコード',
      },
      {
        key: 'jwt_decoder',
        title: 'JWTデコーダー',
        shortTitle: 'JWT',
        path: '/jwt_decoder',
        icon: <SafetyCertificateOutlined />,
        description: 'JWTの内容を表示',
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
        icon: <FontSizeOutlined />,
        description: '文字数・行数を集計',
      },
      {
        key: 'character_replace',
        title: '文字列置換',
        path: '/character_replace',
        icon: <SwapOutlined />,
        description: '複数の文字列を一括置換',
      },
      {
        key: 'diff',
        title: 'テキスト差分',
        path: '/diff',
        icon: <DiffOutlined />,
        description: 'テキストの差分を比較',
      },
      {
        key: 'json_formatter',
        title: 'JSONフォーマット',
        path: '/json_formatter',
        icon: <AlignLeftOutlined />,
        description: 'JSONを整形',
      },
      {
        key: 'json_view',
        title: 'JSONビューアー',
        path: '/json_view',
        icon: <ApartmentOutlined />,
        description: 'JSONをツリー表示',
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
        icon: <NumberOutlined />,
        description: '数値を3桁ごとに区切る',
      },
      {
        key: 'radix_converter',
        title: '基数変換',
        path: '/radix_converter',
        icon: <CalculatorOutlined />,
        description: '2・8・10・16進数を変換',
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
        icon: <BgColorsOutlined />,
        description: 'HEX・RGB・HSLを変換',
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
        icon: <CalendarOutlined />,
        description: '日時の書式・時差を変換',
      },
      {
        key: 'unixtime_converter',
        title: 'UnixTime->日時変換',
        path: '/unixtime_converter',
        icon: <FieldTimeOutlined />,
        description: 'UnixTimeを日時に変換',
      },
      {
        key: 'date_diff',
        title: '日数計算',
        path: '/date_diff',
        icon: <ScheduleOutlined />,
        description: '2つの日時の差を計算',
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
        icon: <SafetyOutlined />,
        description: '文字列からハッシュを生成',
      },
      {
        key: 'dummy',
        title: 'ダミーデータ',
        path: '/dummy',
        icon: <DatabaseOutlined />,
        description: 'テスト用データを生成',
      },
      {
        key: 'uuid',
        title: 'UUID',
        path: '/uuid',
        icon: <KeyOutlined />,
        description: 'UUIDを一括生成',
      },
      {
        key: 'image_generator',
        title: '画像生成',
        path: '/image_generator',
        icon: <PictureOutlined />,
        description: 'ダミー画像を生成',
      },
    ],
  },
];

export type FeatureKeys = (typeof features)[number]['key'];
