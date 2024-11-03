import React, {type ReactNode, type ComponentProps} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Img(): JSX.Element {

  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px'}}>
      <img
        alt={'Docusaurus with Keytar'}
        className={styles.heroLog}
        src={useBaseUrl('/img/team_money_wechat.jpg')}
        width="200"
        height="200"
      />
      <img
        alt={'Docusaurus with Keytar'}
        className={styles.heroLog}
        src={useBaseUrl('/img/team_money_alipay.jpg')}
        width="200"
        height="200"
      />
    </div>
  )
}
