import type { FieldConfig, Preset } from '@/app/dummy/types';

export const PRESETS: Preset[] = [
  {
    key: 'user',
    label: 'ユーザー一覧',
    fields: [
      { name: 'id', type: 'autoincrement', start: 1 },
      { name: '氏名', type: 'name' },
      { name: '氏名(カナ)', type: 'name_kana' },
      { name: 'メールアドレス', type: 'email' },
      { name: '電話番号', type: 'phone' },
      { name: '性別', type: 'gender' },
      { name: '生年月日', type: 'birthdate' },
    ],
  },
  {
    key: 'address_book',
    label: '住所録',
    fields: [
      { name: 'id', type: 'autoincrement', start: 1 },
      { name: '氏名', type: 'name' },
      { name: '郵便番号', type: 'zipcode' },
      { name: '都道府県', type: 'prefecture' },
      { name: '住所', type: 'address' },
      { name: '電話番号', type: 'phone' },
    ],
  },
  {
    key: 'employee',
    label: '社員名簿',
    fields: [
      { name: 'id', type: 'autoincrement', start: 1 },
      { name: '氏名', type: 'name' },
      { name: '会社名', type: 'company' },
      { name: '部署', type: 'department' },
      { name: '役職', type: 'job_title' },
      { name: 'メールアドレス', type: 'email' },
    ],
  },
  {
    key: 'product',
    label: '商品リスト',
    fields: [
      { name: 'id', type: 'autoincrement', start: 1 },
      { name: '商品名', type: 'product' },
      { name: '価格', type: 'price', min: 100, max: 10000 },
      { name: 'カラーコード', type: 'color' },
      { name: '在庫数', type: 'integer', min: 0, max: 999 },
    ],
  },
  {
    key: 'account',
    label: 'アカウント',
    fields: [
      { name: 'id', type: 'uuid' },
      { name: 'ユーザー名', type: 'username' },
      { name: 'メールアドレス', type: 'email' },
      { name: 'パスワード', type: 'password', length: 12 },
      { name: 'IPアドレス', type: 'ip' },
      { name: '登録日', type: 'date', from: '2020-01-01', to: '2025-12-31' },
    ],
  },
];

export const getPreset = (key: string): Preset | undefined =>
  PRESETS.find((p) => p.key === key);

// 列定義の同一性判定用シグネチャ。数値/文字列の差は String() で吸収する。
const normValue = (v: unknown): string => (v === undefined || v === null ? '' : String(v));

const fieldsSignature = (fields: FieldConfig[]): string =>
  JSON.stringify(
    (fields ?? []).map((f) => [
      normValue(f.name),
      normValue(f.type),
      normValue(f.min),
      normValue(f.max),
      normValue(f.length),
      normValue(f.from),
      normValue(f.to),
      normValue(f.values),
      normValue(f.value),
      normValue(f.start),
    ]),
  );

// 既定の初期スキーマ or いずれかのプリセットと完全一致するか（= ユーザーの独自入力が無いか）。
export const isKnownSchema = (fields: FieldConfig[], defaultFields: FieldConfig[]): boolean => {
  const known = new Set([defaultFields, ...PRESETS.map((p) => p.fields)].map(fieldsSignature));
  return known.has(fieldsSignature(fields));
};
