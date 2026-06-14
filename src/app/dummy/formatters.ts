import { generateRows } from '@/app/dummy/generators';
import type { FieldConfig, FormatOptions, Locale, OutputFormat } from '@/app/dummy/types';

const escapeCsv = (v: unknown): string => {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const toCsv = (rows: Record<string, unknown>[]): string => {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.map(escapeCsv).join(',')];
  for (const row of rows) {
    lines.push(headers.map((h) => escapeCsv(row[h])).join(','));
  }
  return lines.join('\n');
};

// Markdown のテーブルセルでは | が区切り扱いになり改行も使えないため両方を退避する。
const escapeMarkdown = (v: unknown): string => {
  const s = v === null || v === undefined ? '' : String(v);
  return s.replace(/\|/g, '\\|').replace(/\n/g, '<br>');
};

const toMarkdown = (rows: Record<string, unknown>[]): string => {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = [
    `| ${headers.map(escapeMarkdown).join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
  ];
  for (const row of rows) {
    lines.push(`| ${headers.map((h) => escapeMarkdown(row[h])).join(' | ')} |`);
  }
  return lines.join('\n');
};

// SQL の識別子（テーブル名・列名）は MySQL 形式のバッククォートで囲む。日本語の列名にも対応する。
const quoteSqlIdent = (name: string): string => `\`${String(name).replace(/`/g, '``')}\``;

const sqlValue = (v: unknown): string => {
  if (v === null || v === undefined) return 'NULL';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  return `'${String(v).replace(/'/g, "''")}'`;
};

const toSql = (rows: Record<string, unknown>[], tableName?: string): string => {
  if (rows.length === 0) return '';
  const table = quoteSqlIdent(tableName && tableName.trim() ? tableName.trim() : 'dummy_data');
  const headers = Object.keys(rows[0]);
  const cols = headers.map(quoteSqlIdent).join(', ');
  return rows
    .map(
      (row) =>
        `INSERT INTO ${table} (${cols}) VALUES (${headers.map((h) => sqlValue(row[h])).join(', ')});`,
    )
    .join('\n');
};

export const formatOutput = (
  rows: Record<string, unknown>[],
  format: OutputFormat,
  options?: FormatOptions,
): string => {
  switch (format) {
    case 'json':
      return JSON.stringify(rows, null, 2);
    case 'markdown':
      return toMarkdown(rows);
    case 'insert':
      return toSql(rows, options?.tableName);
    case 'csv':
    default:
      return toCsv(rows);
  }
};

export const generateDummy = (
  fields: FieldConfig[],
  count: number,
  locale: Locale,
  format: OutputFormat,
  options?: FormatOptions,
): string => formatOutput(generateRows(fields, count, locale), format, options);
