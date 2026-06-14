export type Locale = 'ja' | 'en';
export type OutputFormat = 'json' | 'csv' | 'markdown' | 'insert';

export type FormatOptions = { tableName?: string };

export type FieldGroup =
  | '個人・連絡先'
  | '企業・仕事'
  | 'ネット・ID系'
  | 'コマース・金融'
  | '乗り物'
  | '数値・日付・その他';

// 各データ型が追加で受け取るオプションの種類。UI 側の入力欄出し分けにも使う。
export type FieldOptionKind = 'minmax' | 'length' | 'dateRange' | 'list' | 'fixed' | 'start';

export type FieldTypeDef = {
  key: string;
  label: string;
  group: FieldGroup;
  option?: FieldOptionKind;
};

// スキーマの 1 列分の設定。option 系の値は型によって使うものだけ参照される。
export type FieldConfig = {
  name: string;
  type: string;
  min?: number | string;
  max?: number | string;
  length?: number | string;
  from?: string;
  to?: string;
  values?: string;
  value?: string;
  start?: number | string;
};

// よくある用途のスキーマ雛形。選ぶと列定義をまるごと置き換える。
export type Preset = {
  key: string;
  label: string;
  fields: FieldConfig[];
};
