// ダミーデータ生成ロジックのバレル。実体は関心ごとに分割した各モジュールにある。
//   types.ts      … 型定義
//   fieldTypes.ts … 型カタログ（FIELD_TYPES / FIELD_GROUPS / getFieldType）
//   generators.ts … 生成エンジン（faker・各型ジェネレータ・generateRows・サンプル）
//   formatters.ts … 出力整形（JSON / CSV / Markdown / SQL）
//   presets.ts    … プリセット & スキーマ判定
export * from '@/app/dummy/types';
export * from '@/app/dummy/fieldTypes';
export * from '@/app/dummy/generators';
export * from '@/app/dummy/formatters';
export * from '@/app/dummy/presets';
