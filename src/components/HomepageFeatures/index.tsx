import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import useBaseUrl, {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

type FeatureItem = {
  title: string;
  img: any;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '新版本',
    img: '/img/index_intro_1.png',
    description: (
      <>
        新版本 HarmonyOS4.0 教程
      </>
    ),
  },
  {
    title: '零基础',
    img: '/img/index_intro_2.png',
    description: (
      <>
        零基础保姆级教程，新手轻松上手
      </>
    ),
  },
  {
    title: '实战开发',
    img: '/img/index_intro_3.png',
    description: (
      <>
        华为 HarmonyOS 从基础入门到实战开发
      </>
    ),
  },
];

function Feature({title, img, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img
            className={styles.featureSvg} 
            role="img" 
            src={useBaseUrl(img)}
          />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
