import React from 'react';
import styles from '@/styles/components/PageTitle.module.scss';

type Props = {
  title: string;
};

export const PageTitle: React.VFC<Props> = ({ title }) => {
  return <h2 className={styles.title}>{title}</h2>;
};
