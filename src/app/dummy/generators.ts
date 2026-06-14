import { Faker, base, en, ja } from '@faker-js/faker';
import { FIELD_TYPES } from '@/app/dummy/fieldTypes';
import type { FieldConfig, Locale } from '@/app/dummy/types';

// ロケール別 Faker。ja に存在しない項目（役職・キャッチフレーズ等）は en→base に
// フォールバックさせたいので、locale 配列で明示的にフォールバック連鎖を組む。
const fakerJa = new Faker({ locale: [ja, en, base] });
const fakerEn = new Faker({ locale: [en, base] });

// 氏名(カナ) は faker の ja ロケールに読み仮名データが無いため、独自リストから組み立てる。
const KANA_SEI = [
  'サトウ', 'スズキ', 'タカハシ', 'タナカ', 'ワタナベ', 'イトウ', 'ヤマモト', 'ナカムラ',
  'コバヤシ', 'カトウ', 'ヨシダ', 'ヤマダ', 'ササキ', 'ヤマグチ', 'マツモト', 'イノウエ',
];
const KANA_MEI = [
  'タロウ', 'ジロウ', 'イチロウ', 'ハルト', 'ソウタ', 'ユウト', 'ミナト', 'ハナコ',
  'ユイ', 'アオイ', 'ヒマリ', 'ミオ', 'サクラ', 'ユウナ', 'リク', 'ケンタ',
];

const DEPARTMENTS_JA = [
  '営業部', '開発部', '人事部', '総務部', '経理部', 'マーケティング部',
  'カスタマーサポート部', '法務部', '広報部', '情報システム部',
];
const DEPARTMENTS_EN = [
  'Sales', 'Engineering', 'Human Resources', 'Finance', 'Marketing',
  'Customer Support', 'Legal', 'Public Relations', 'IT', 'Operations',
];

const pad2 = (n: number): string => String(n).padStart(2, '0');

const formatDate = (d: Date): string => {
  const y = d.getFullYear();
  return `${y}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const formatDateTime = (d: Date): string =>
  `${formatDate(d)} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;

const formatTime = (d: Date): string =>
  `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;

// 空文字・null・undefined・非数値はフォールバックに寄せる。
const numOr = (v: unknown, fallback: number): number => {
  if (v === '' || v === null || v === undefined) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const clampLen = (v: unknown, fallback: number): number => {
  const n = numOr(v, fallback);
  if (n < 1) return fallback;
  return Math.min(Math.floor(n), 1000);
};

const parseList = (v?: string): string[] =>
  v
    ? v
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

// 日本の電話番号生成。携帯は 070/080/090、固定は代表的な市外局番を使う。
const MOBILE_PREFIXES = ['070', '080', '090'];
// 市外局番ごとに [市内局番の桁数, 加入者番号の桁数] を持ち、合計10桁になるよう調整する。
const LANDLINE_AREA: { code: string; rest: [number, number] }[] = [
  { code: '03', rest: [4, 4] }, // 東京
  { code: '06', rest: [4, 4] }, // 大阪
  { code: '052', rest: [3, 4] }, // 名古屋
  { code: '045', rest: [3, 4] }, // 横浜
  { code: '075', rest: [3, 4] }, // 京都
  { code: '011', rest: [3, 4] }, // 札幌
  { code: '092', rest: [3, 4] }, // 福岡
  { code: '022', rest: [3, 4] }, // 仙台
];

const phoneNumeric = (faker: Faker, length: number): string =>
  faker.string.numeric({ length, allowLeadingZeros: true });

const mobileNumber = (faker: Faker): string =>
  `${faker.helpers.arrayElement(MOBILE_PREFIXES)}-${phoneNumeric(faker, 4)}-${phoneNumeric(faker, 4)}`;

const landlineNumber = (faker: Faker): string => {
  const area = faker.helpers.arrayElement(LANDLINE_AREA);
  return `${area.code}-${phoneNumeric(faker, area.rest[0])}-${phoneNumeric(faker, area.rest[1])}`;
};

// 日本のナンバープレート（地域名 分類番号 ひらがな 一連指定番号）。
const PLATE_REGIONS = [
  '品川', '練馬', '足立', '横浜', '名古屋', '大阪', '神戸', '京都', '札幌', '福岡', '仙台', '広島',
];
const PLATE_HIRAGANA = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'を'];

const licensePlateJa = (faker: Faker): string =>
  `${faker.helpers.arrayElement(PLATE_REGIONS)} ${phoneNumeric(faker, 3)} ${faker.helpers.arrayElement(PLATE_HIRAGANA)} ${phoneNumeric(faker, 2)}-${phoneNumeric(faker, 2)}`;

type GenContext = {
  faker: Faker;
  locale: Locale;
  field: FieldConfig;
  index: number;
};

const generators: Record<string, (ctx: GenContext) => unknown> = {
  name: ({ faker, locale }) =>
    locale === 'ja' ? `${faker.person.lastName()} ${faker.person.firstName()}` : faker.person.fullName(),
  name_kana: ({ faker }) =>
    `${faker.helpers.arrayElement(KANA_SEI)} ${faker.helpers.arrayElement(KANA_MEI)}`,
  last_name: ({ faker }) => faker.person.lastName(),
  first_name: ({ faker }) => faker.person.firstName(),
  gender: ({ faker }) => faker.person.sex(),
  birthdate: ({ faker }) => formatDate(faker.date.birthdate()),
  age: ({ faker, field }) =>
    faker.number.int({ min: numOr(field.min, 18), max: numOr(field.max, 80) }),
  email: ({ faker }) => faker.internet.email(),
  phone: ({ faker, locale }) =>
    locale === 'ja'
      ? faker.datatype.boolean()
        ? mobileNumber(faker)
        : landlineNumber(faker)
      : faker.phone.number(),
  phone_mobile: ({ faker, locale }) =>
    locale === 'ja' ? mobileNumber(faker) : faker.phone.number(),
  phone_landline: ({ faker, locale }) =>
    locale === 'ja' ? landlineNumber(faker) : faker.phone.number(),
  address: ({ faker, locale }) =>
    locale === 'ja'
      ? `${faker.location.state()}${faker.location.city()}${faker.location.streetAddress()}`
      : `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`,
  zipcode: ({ faker }) => faker.location.zipCode(),
  prefecture: ({ faker }) => faker.location.state(),
  city: ({ faker }) => faker.location.city(),
  country: ({ faker }) => faker.location.country(),
  latitude: ({ faker }) => faker.location.latitude(),
  longitude: ({ faker }) => faker.location.longitude(),
  avatar: ({ faker }) => faker.image.avatar(),

  company: ({ faker }) => faker.company.name(),
  department: ({ faker, locale }) =>
    faker.helpers.arrayElement(locale === 'ja' ? DEPARTMENTS_JA : DEPARTMENTS_EN),
  job_title: ({ faker }) => faker.person.jobTitle(),
  job_type: ({ faker }) => faker.person.jobType(),
  catch_phrase: ({ faker }) => faker.company.catchPhrase(),

  uuid: ({ faker }) => faker.string.uuid(),
  autoincrement: ({ field, index }) => numOr(field.start, 1) + index,
  random_string: ({ faker, field }) => faker.string.alphanumeric(clampLen(field.length, 10)),
  username: ({ faker }) => faker.internet.username(),
  url: ({ faker }) => faker.internet.url(),
  domain: ({ faker }) => faker.internet.domainName(),
  ip: ({ faker }) => faker.internet.ipv4(),
  ipv6: ({ faker }) => faker.internet.ipv6(),
  mac: ({ faker }) => faker.internet.mac(),
  password: ({ faker, field }) => faker.internet.password({ length: clampLen(field.length, 12) }),
  emoji: ({ faker }) => faker.internet.emoji(),
  http_status: ({ faker }) => faker.internet.httpStatusCode(),
  // ja ロケールだと lorem が日本語語彙になりスラッグが崩れるため、スラッグは常に英語で生成する。
  slug: () => fakerEn.lorem.slug(),
  hex: ({ faker, field }) =>
    faker.string.hexadecimal({ length: clampLen(field.length, 8), casing: 'lower', prefix: '' }),
  ulid: ({ faker }) => faker.string.ulid(),
  nanoid: ({ faker }) => faker.string.nanoid(),
  image_url: ({ faker }) => faker.image.url(),

  integer: ({ faker, field }) =>
    faker.number.int({ min: numOr(field.min, 0), max: numOr(field.max, 100) }),
  float: ({ faker, field }) =>
    faker.number.float({ min: numOr(field.min, 0), max: numOr(field.max, 100), fractionDigits: 2 }),
  boolean: ({ faker }) => faker.datatype.boolean(),
  date: ({ faker, field }) =>
    formatDate(
      faker.date.between({ from: field.from || '2000-01-01', to: field.to || '2030-12-31' }),
    ),
  datetime: ({ faker, field }) =>
    formatDateTime(
      faker.date.between({ from: field.from || '2000-01-01', to: field.to || '2030-12-31' }),
    ),
  time: ({ faker }) => formatTime(faker.date.anytime()),
  timestamp: ({ faker, field }) =>
    Math.floor(
      faker.date
        .between({ from: field.from || '2000-01-01', to: field.to || '2030-12-31' })
        .getTime() / 1000,
    ),
  word: ({ faker }) => faker.lorem.word(),
  sentence: ({ faker }) => faker.lorem.sentence(),
  paragraph: ({ faker }) => faker.lorem.paragraph(),
  product: ({ faker }) => faker.commerce.productName(),
  price: ({ faker, field }) =>
    faker.commerce.price({ min: numOr(field.min, 100), max: numOr(field.max, 10000) }),
  product_description: ({ faker }) => faker.commerce.productDescription(),
  product_category: ({ faker }) => faker.commerce.department(),
  amount: ({ faker, field }) =>
    faker.finance.amount({ min: numOr(field.min, 0), max: numOr(field.max, 10000) }),
  currency_code: ({ faker }) => faker.finance.currencyCode(),
  credit_card: ({ faker }) => faker.finance.creditCardNumber(),
  account_number: ({ faker }) => faker.finance.accountNumber(),
  vehicle_manufacturer: ({ faker }) => faker.vehicle.manufacturer(),
  vehicle_model: ({ faker }) => faker.vehicle.model(),
  license_plate: ({ faker, locale }) =>
    locale === 'ja' ? licensePlateJa(faker) : faker.vehicle.vrm(),
  vin: ({ faker }) => faker.vehicle.vin(),
  color: ({ faker }) => faker.color.rgb(),
  list_pick: ({ faker, field }) => {
    const opts = parseList(field.values);
    return opts.length ? faker.helpers.arrayElement(opts) : '';
  },
  fixed: ({ field }) => field.value ?? '',
};

export const MAX_COUNT = 10000;

export const generateRows = (
  fields: FieldConfig[],
  count: number,
  locale: Locale,
): Record<string, unknown>[] => {
  const c = Number(count);
  if (!Number.isInteger(c) || c < 1) {
    throw new Error('件数が不正です。');
  }
  if (c > MAX_COUNT) {
    throw new Error(`件数は${MAX_COUNT}以下にしてください。`);
  }
  const validFields = (fields ?? []).filter((f) => f.name && f.type);
  if (validFields.length === 0) {
    throw new Error('列名と型を設定した列を1つ以上追加してください。');
  }
  const faker = locale === 'ja' ? fakerJa : fakerEn;
  const rows: Record<string, unknown>[] = [];
  for (let i = 0; i < c; i++) {
    const row: Record<string, unknown> = {};
    for (const field of validFields) {
      const gen = generators[field.type];
      row[field.name] = gen ? gen({ faker, locale, field, index: i }) : '';
    }
    rows.push(row);
  }
  return rows;
};

// 型ピッカーで「どんな値が出るか」を見せるためのサンプル値。各型を1件だけ生成する。
export const getTypeSamples = (locale: Locale): Record<string, string> => {
  const samples: Record<string, string> = {};
  FIELD_TYPES.forEach((t) => {
    try {
      const rows = generateRows(
        [
          {
            name: t.key,
            type: t.key,
            min: 1,
            max: 100,
            length: 8,
            from: '2000-01-01',
            to: '2030-12-31',
            values: 'A,B,C',
            value: '例',
            start: 1,
          },
        ],
        1,
        locale,
      );
      samples[t.key] = String(rows[0][t.key] ?? '');
    } catch {
      samples[t.key] = '';
    }
  });
  return samples;
};

// テスト用にシードを固定できるようにしておく。
export const seedFakers = (seed: number): void => {
  fakerJa.seed(seed);
  fakerEn.seed(seed);
};
