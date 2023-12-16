export const PRESET_SIZE = [
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
] as const satisfies {
  label: string;
  value: {
    width: number;
    height: number;
  };
}[];

export const PRESET_SIZE_OPTIONS = PRESET_SIZE.map(({ label }) => ({
  label,
  value: label,
}));
