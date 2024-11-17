import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import useBaseUrl, { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import Heading from "@theme/Heading";
import Tweet from "@site/src/components/Tweet";
import React, { useState } from "react";

import styles from "./index.module.css";
import { Descriptions } from "antd";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  const group = [
    {
      name: "Common",
      description: "Common learning notes",
      items: [
        {
          name: "计算机组成原理",
          link: "/docs/common/计算机组成原理/00%20为什么学习计算机组成原理/",
          description: "掌握计算机体系全貌，学习组成原理在开发中的实际应用。",
        },
      ],
    },
    {
      name: "Front End",
      link: "/front-end",
      description: "Front End learning notes",
      items: [
        {
          name: "JavaScript 核心原理解析",
          link: "/docs/front-end/JavaScript%20核心原理解析/01%20delete%20销毁/",
          description:
            "深度解读 JavaScript 核心技术，语言特性以及原理剖析，构建语言知识结构体系。",
        },
      ],
    },
  ];

  return (
    <Layout title={`${siteConfig.title} home`} description="Code FE">
      <div className={styles.container}>
        <div className={styles.content}>
          <Link to={`/docs/about/`} className={styles.profile}>
            <div className={styles.profileInfo}>
              <h1 className={styles.profileName}>庄生 | Jason</h1>
              <p className={styles.profileDescription}>
                Web全栈开发工程师：拥有近 8 年工作经验。精通前端技术及 React
                框架，熟悉服务端开发（Node） 及数据库，擅长运用 AI
                工具提升效率。
              </p>
              <p className={styles.profileDescription}>
                Web full-stack development engineer: With nearly 8 years of
                working experience. Proficient in front-end technologies and the
                React framework, familiar with server-side development (Node)
                and databases, and skilled in using AI tools to improve
                efficiency.
              </p>
            </div>
            <img src="./img/author.jpg" alt="Joson" className={styles.avatar} />
          </Link>

          {group.map((item) => (
            <div className={styles.group} key={item.name}>
              <h1 className={styles.groupTitle}>{item.name}</h1>
              <div className={styles.cards}>
                {item.items.map((item) => (
                  <Link to={item.link} key={item.link} className={styles.card}>
                    <h2 className={styles.cardTitle}>{item.name}</h2>
                    <p className={styles.cardDescription}>{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
