import {
  FIELD_TYPES,
  PRESETS,
  formatOutput,
  generateDummy,
  generateRows,
  getFieldType,
  getPreset,
  getTypeSamples,
  isKnownSchema,
  seedFakers,
  type FieldConfig,
} from '@/app/dummy/dummyLib';

beforeEach(() => {
  seedFakers(123);
});

describe('generateRows', () => {
  it('指定した件数と列名で生成する', () => {
    const fields: FieldConfig[] = [
      { name: 'id', type: 'autoincrement', start: 1 },
      { name: 'name', type: 'name' },
    ];
    const rows = generateRows(fields, 5, 'ja');
    expect(rows).toHaveLength(5);
    expect(Object.keys(rows[0])).toEqual(['id', 'name']);
  });

  it('連番は開始値からインクリメントする', () => {
    const rows = generateRows([{ name: 'id', type: 'autoincrement', start: 100 }], 3, 'ja');
    expect(rows.map((r) => r.id)).toEqual([100, 101, 102]);
  });

  it('連番の開始値が未指定なら1から始まる', () => {
    const rows = generateRows([{ name: 'id', type: 'autoincrement' }], 2, 'ja');
    expect(rows.map((r) => r.id)).toEqual([1, 2]);
  });

  it('固定値はすべての行で同じ値になる', () => {
    const rows = generateRows([{ name: 'k', type: 'fixed', value: 'X' }], 4, 'ja');
    expect(rows.every((r) => r.k === 'X')).toBe(true);
  });

  it('整数は指定範囲内に収まる', () => {
    const rows = generateRows([{ name: 'n', type: 'integer', min: 1, max: 3 }], 50, 'en');
    expect(rows.every((r) => Number(r.n) >= 1 && Number(r.n) <= 3)).toBe(true);
  });

  it('年齢は指定範囲内の整数になる', () => {
    const rows = generateRows([{ name: 'age', type: 'age', min: 20, max: 25 }], 50, 'ja');
    expect(rows.every((r) => Number.isInteger(r.age) && (r.age as number) >= 20 && (r.age as number) <= 25)).toBe(true);
  });

  it('年齢は範囲未指定なら既定範囲(18-80)になる', () => {
    const rows = generateRows([{ name: 'age', type: 'age' }], 50, 'ja');
    expect(rows.every((r) => (r.age as number) >= 18 && (r.age as number) <= 80)).toBe(true);
  });

  it('リストから選択は候補の中から選ばれる', () => {
    const rows = generateRows([{ name: 'c', type: 'list_pick', values: 'a, b, c' }], 30, 'en');
    expect(rows.every((r) => ['a', 'b', 'c'].includes(r.c as string))).toBe(true);
  });

  it('名前と型が空の列は無視される', () => {
    const fields: FieldConfig[] = [
      { name: 'id', type: 'autoincrement' },
      { name: '', type: 'name' },
      { name: 'x', type: '' },
    ];
    const rows = generateRows(fields, 1, 'ja');
    expect(Object.keys(rows[0])).toEqual(['id']);
  });

  it('日本語ロケールでは氏名が日本語になる', () => {
    const rows = generateRows([{ name: 'name', type: 'name' }], 1, 'ja');
    expect(rows[0].name).toMatch(/[぀-ヿ一-龯]/);
  });

  it('携帯電話番号は070/080/090で始まる形式になる', () => {
    const rows = generateRows([{ name: 'tel', type: 'phone_mobile' }], 30, 'ja');
    expect(rows.every((r) => /^0[789]0-\d{4}-\d{4}$/.test(r.tel as string))).toBe(true);
  });

  it('固定電話番号は市外局番形式になる', () => {
    const rows = generateRows([{ name: 'tel', type: 'phone_landline' }], 30, 'ja');
    expect(rows.every((r) => /^0\d{1,3}-\d{3,4}-\d{4}$/.test(r.tel as string))).toBe(true);
  });

  it('日時は「YYYY-MM-DD HH:mm:ss」形式になる', () => {
    const rows = generateRows([{ name: 'dt', type: 'datetime' }], 5, 'ja');
    expect(rows.every((r) => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(r.dt as string))).toBe(true);
  });

  it('時刻は「HH:mm:ss」形式になる', () => {
    const rows = generateRows([{ name: 't', type: 'time' }], 5, 'ja');
    expect(rows.every((r) => /^\d{2}:\d{2}:\d{2}$/.test(r.t as string))).toBe(true);
  });

  it('UNIXタイムスタンプは整数を返す', () => {
    const rows = generateRows([{ name: 'ts', type: 'timestamp' }], 5, 'ja');
    expect(rows.every((r) => Number.isInteger(r.ts))).toBe(true);
  });

  it('ナンバープレート(ja)は地域名とひらがなを含む', () => {
    const rows = generateRows([{ name: 'p', type: 'license_plate' }], 10, 'ja');
    expect(
      rows.every(
        (r) =>
          /(品川|練馬|足立|横浜|名古屋|大阪|神戸|京都|札幌|福岡|仙台|広島)/.test(r.p as string) &&
          /[ぁ-ん]/.test(r.p as string),
      ),
    ).toBe(true);
  });

  it('件数が0以下ならエラー', () => {
    expect(() => generateRows([{ name: 'a', type: 'name' }], 0, 'ja')).toThrow('件数が不正です。');
  });

  it('件数が上限を超えるとエラー', () => {
    expect(() => generateRows([{ name: 'a', type: 'name' }], 10001, 'ja')).toThrow();
  });

  it('有効な列が無いとエラー', () => {
    expect(() => generateRows([], 5, 'ja')).toThrow();
  });
});

describe('FIELD_TYPES の網羅', () => {
  it('すべての型にジェネレータが存在し、空でない値を返す', () => {
    FIELD_TYPES.forEach((t) => {
      const rows = generateRows(
        [
          {
            name: t.key,
            type: t.key,
            min: 1,
            max: 5,
            length: 6,
            from: '2000-01-01',
            to: '2020-12-31',
            values: 'a,b,c',
            value: 'x',
            start: 1,
          },
        ],
        1,
        'ja',
      );
      const v = rows[0][t.key];
      // boolean の false や数値の 0 は有効値なので、空文字/null/undefined のみ不可とする。
      expect(v === '' || v === null || v === undefined).toBe(false);
    });
  });
});

describe('getTypeSamples', () => {
  it('全型ぶんのサンプルを返す', () => {
    const samples = getTypeSamples('ja');
    expect(Object.keys(samples)).toHaveLength(FIELD_TYPES.length);
    expect(samples.name).not.toBe('');
    expect(samples.email).not.toBe('');
    expect(samples.color).toMatch(/^#/);
  });
});

describe('formatOutput', () => {
  it('JSONはパース可能な配列を返す', () => {
    const rows = generateRows([{ name: 'id', type: 'autoincrement' }], 2, 'ja');
    const json = formatOutput(rows, 'json');
    expect(JSON.parse(json)).toHaveLength(2);
  });

  it('CSVはヘッダー行＋データ行を返す', () => {
    const rows = [
      { a: 1, b: 'x' },
      { a: 2, b: 'y' },
    ];
    const csv = formatOutput(rows, 'csv');
    const lines = csv.split('\n');
    expect(lines[0]).toBe('a,b');
    expect(lines).toHaveLength(3);
  });

  it('CSVはカンマ・引用符・改行をエスケープする', () => {
    const csv = formatOutput([{ a: 'x,y', b: 'he"llo' }], 'csv');
    expect(csv.split('\n')[1]).toBe('"x,y","he""llo"');
  });

  it('空配列のCSVは空文字', () => {
    expect(formatOutput([], 'csv')).toBe('');
  });

  it('Markdownはヘッダー・区切り・データ行を返す', () => {
    const rows = [
      { a: 1, b: 'x' },
      { a: 2, b: 'y' },
    ];
    const lines = formatOutput(rows, 'markdown').split('\n');
    expect(lines[0]).toBe('| a | b |');
    expect(lines[1]).toBe('| --- | --- |');
    expect(lines[2]).toBe('| 1 | x |');
    expect(lines).toHaveLength(4);
  });

  it('Markdownはパイプと改行をエスケープする', () => {
    const md = formatOutput([{ a: 'x|y', b: 'one\ntwo' }], 'markdown');
    expect(md.split('\n')[2]).toBe('| x\\|y | one<br>two |');
  });

  it('空配列のMarkdownは空文字', () => {
    expect(formatOutput([], 'markdown')).toBe('');
  });

  it('SQL INSERTはテーブル名・列・値で構成される', () => {
    const rows = [{ id: 1, name: "O'Brien", active: true, note: null }];
    const sql = formatOutput(rows, 'insert', { tableName: 'users' });
    expect(sql).toBe(
      "INSERT INTO `users` (`id`, `name`, `active`, `note`) VALUES (1, 'O''Brien', TRUE, NULL);",
    );
  });

  it('SQL INSERTはテーブル名未指定なら既定名を使う', () => {
    const sql = formatOutput([{ a: 1 }], 'insert');
    expect(sql.startsWith('INSERT INTO `dummy_data`')).toBe(true);
  });

  it('SQL INSERTは行ごとに1文を生成する', () => {
    const sql = formatOutput([{ a: 1 }, { a: 2 }], 'insert', { tableName: 't' });
    expect(sql.split('\n')).toHaveLength(2);
  });

  it('空配列のSQLは空文字', () => {
    expect(formatOutput([], 'insert')).toBe('');
  });
});

describe('generateDummy', () => {
  it('生成とフォーマットを一括で行う', () => {
    const json = generateDummy([{ name: 'id', type: 'autoincrement' }], 3, 'ja', 'json');
    expect(JSON.parse(json)).toHaveLength(3);
  });
});

describe('getFieldType', () => {
  it('既知のキーから定義を引ける', () => {
    expect(getFieldType('integer')?.option).toBe('minmax');
  });

  it('未知のキーはundefined', () => {
    expect(getFieldType('unknown')).toBeUndefined();
  });
});

describe('PRESETS', () => {
  it('すべてのプリセットの列の型が定義済みである', () => {
    PRESETS.forEach((preset) => {
      preset.fields.forEach((f) => {
        expect(getFieldType(f.type)).toBeDefined();
      });
    });
  });

  it('各プリセットで実際に生成できる', () => {
    PRESETS.forEach((preset) => {
      const rows = generateRows(preset.fields, 2, 'ja');
      expect(rows).toHaveLength(2);
      expect(Object.keys(rows[0])).toEqual(preset.fields.map((f) => f.name));
    });
  });

  it('getPresetでキーから引ける', () => {
    expect(getPreset('user')?.label).toBe('ユーザー一覧');
    expect(getPreset('unknown')).toBeUndefined();
  });
});

describe('isKnownSchema', () => {
  const def: FieldConfig[] = [{ name: 'id', type: 'autoincrement', start: 1 }];

  it('既定スキーマと一致すればtrue', () => {
    expect(isKnownSchema(def, def)).toBe(true);
  });

  it('プリセットと一致すればtrue', () => {
    expect(isKnownSchema(PRESETS[0].fields, def)).toBe(true);
  });

  it('独自入力があればfalse', () => {
    expect(isKnownSchema([{ name: 'custom', type: 'name' }], def)).toBe(false);
  });

  it('数値と文字列の違いは無視する', () => {
    expect(isKnownSchema([{ name: 'id', type: 'autoincrement', start: '1' }], def)).toBe(true);
  });

  it('オプション値を変えた場合はfalse（独自入力とみなす）', () => {
    const edited = PRESETS[3].fields.map((f, i) => (i === 1 ? { ...f, max: 99999 } : f));
    expect(isKnownSchema(edited, def)).toBe(false);
  });
});
