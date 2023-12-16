// 参考
// https://www.comnico.jp/we-love-social/social-media-image-sizes-guide
export const PRESET_SIZES = [
  {
    label: '基本サイズ',
    options: [
      {
        label: '100x100',
        value: {
          width: 100,
          height: 100,
        },
      },
      {
        label: '256x256',
        value: {
          width: 256,
          height: 256,
        },
      },
    ],
  },
  {
    label: 'X（Twitter）',
    options: [
      {
        label: 'プロフィールアイコン画像 400×400',
        value: {
          width: 400,
          height: 400,
        },
      },
      {
        label: '投稿画像 900×1200',
        value: {
          width: 900,
          height: 1200,
        },
      },
      {
        label: '投稿画像 1200×675',
        value: {
          width: 1200,
          height: 675,
        },
      },
      {
        label: '投稿画像 1200×1200',
        value: {
          width: 1200,
          height: 1200,
        },
      },
      {
        label: '投稿画像 1200×1350',
        value: {
          width: 1200,
          height: 1350,
        },
      },
      {
        label: ' ヘッダー画像 1500×500',
        value: {
          width: 1500,
          height: 500,
        },
      },
    ],
  },
  {
    label: 'Instagram',
    options: [
      {
        label: 'アイコン・プロフィール画像 320×320',
        value: {
          width: 320,
          height: 320,
        },
      },
      {
        label: 'ハイライトアイコン画像 320×320',
        value: {
          width: 320,
          height: 320,
        },
      },
      {
        label: 'フィード投稿(1:1) 1080×1080',
        value: {
          width: 1080,
          height: 1080,
        },
      },
      {
        label: 'ストーリーズ・リール 1080×1920',
        value: {
          width: 1080,
          height: 1920,
        },
      },
    ],
  },
  {
    label: 'Facebook',
    options: [
      {
        label: 'プロフィールアイコン画像 320x320',
        value: {
          width: 320,
          height: 320,
        },
      },
      {
        label: 'プロフィールアイコン画像 960x960',
        value: {
          width: 960,
          height: 960,
        },
      },
      {
        label: 'Facebookカバー画像 851×315',
        value: {
          width: 851,
          height: 315,
        },
      },
      {
        label: 'リンク投稿 1200×630',
        value: {
          width: 1200,
          height: 630,
        },
      },
    ],
  },
  {
    label: 'TikTok',
    options: [
      {
        label: 'プロフィールアイコン画像 90x90',
        value: {
          width: 90,
          height: 90,
        },
      },
    ],
  },
];

export const PRESET_SIZE_OPTIONS = PRESET_SIZES.map(({ label, options }) => ({
  label,
  options: options.map(({ label }) => ({
    label,
    value: label,
  })),
}));

export const getPresetSize = (selectedValue: string) => {
  let v = {
    width: 0,
    height: 0,
  };
  PRESET_SIZES.forEach(({ options }) =>
    options.forEach(({ label, value }) => {
      if (label === selectedValue) {
        v = value;
      }
    }),
  );
  return v;
};
