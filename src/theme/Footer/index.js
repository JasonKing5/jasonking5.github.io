import React from 'react';
import OriginalFooter from '@theme-original/Footer';
import AnalyticsStats from '../../../src/components/AnalyticsStats';
import styles from './styles.module.css';

export default function FooterWrapper(props) {
  return (
    <div className={styles.footerWrapper}>
      <OriginalFooter {...props} />
      <div className={styles.analyticsContainer}>
        <AnalyticsStats />
      </div>
    </div>
  );
}
