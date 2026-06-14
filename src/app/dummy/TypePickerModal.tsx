'use client';
import styled from '@emotion/styled';
import { Input, Modal, Tabs } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { FIELD_GROUPS, FIELD_TYPES, getTypeSamples, type Locale } from '@/app/dummy/dummyLib';

type Props = {
  open: boolean;
  locale: Locale;
  currentType?: string;
  onSelect: (typeKey: string) => void;
  onClose: () => void;
};

const truncate = (s: string): string => (s.length > 28 ? `${s.slice(0, 28)}…` : s);

export const TypePickerModal: FC<Props> = ({ open, locale, currentType, onSelect, onClose }) => {
  const [activeGroup, setActiveGroup] = useState<string>(FIELD_GROUPS[0]);
  const [search, setSearch] = useState('');

  // 閉じたら検索条件をリセットする。
  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  // ロケールごとに各型のサンプル値を用意（開くたびに最新の例を表示）。
  const samples = useMemo(() => (open ? getTypeSamples(locale) : {}), [open, locale]);

  const q = search.trim().toLowerCase();
  // 検索中はカテゴリ横断で絞り込み（ラベルだけでなく key も対象にして英語/ローマ字でも当てる）。
  const visibleTypes = q
    ? FIELD_TYPES.filter((t) => t.label.toLowerCase().includes(q) || t.key.toLowerCase().includes(q))
    : FIELD_TYPES.filter((t) => t.group === activeGroup);

  const handleSelect = (key: string) => {
    onSelect(key);
    setSearch('');
  };

  return (
    <Modal title="列の型を選択" open={open} onCancel={onClose} footer={null} width={680}>
      <Input.Search
        placeholder="型名で検索（例: 電話 / phone / uuid / 日時）"
        allowClear
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      {!q && (
        <Tabs
          activeKey={activeGroup}
          onChange={setActiveGroup}
          items={FIELD_GROUPS.map((g) => ({ key: g, label: g }))}
        />
      )}
      <Grid>
        {visibleTypes.map((t) => (
          <TypeItem
            key={t.key}
            type="button"
            $selected={t.key === currentType}
            onClick={() => handleSelect(t.key)}
          >
            <span className="label">{t.label}</span>
            <span className="sample">{truncate(samples[t.key] ?? '')}</span>
          </TypeItem>
        ))}
        {visibleTypes.length === 0 && <Empty>該当する型がありません</Empty>}
      </Grid>
    </Modal>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  max-height: 50vh;
  overflow-y: auto;
  padding: 4px;
`;

const TypeItem = styled.button<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid
    ${({ $selected }) => ($selected ? 'var(--rs-primary-500, #3498ff)' : 'transparent')};
  background: rgba(255, 255, 255, 0.04);
  color: inherit;
  cursor: pointer;
  text-align: left;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  .label {
    font-size: 14px;
  }
  .sample {
    font-size: 12px;
    opacity: 0.6;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Empty = styled.div`
  grid-column: 1 / -1;
  padding: 24px;
  text-align: center;
  opacity: 0.6;
`;
