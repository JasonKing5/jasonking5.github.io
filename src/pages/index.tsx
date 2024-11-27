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
        {
          name: "编译原理",
          link: "/docs/common/编译原理/Closure%20闭包/",
          description: "编译原理知识分享。",
        },
        {
          name: "Linux 操作系统",
          link: "/docs/common/Linux%20操作系统/00%20学习Linux路径/",
          description: "操作系统入门学习。",
        },
        {
          name: "网络协议",
          link: "/docs/common/网络协议/01%20网络协议概览/",
          description: "网络协议入门基础。",
        },
        {
          name: "HTTP 协议",
          link: "/docs/common/HTTP%20协议/01%20HTTP%20history/",
          description: "深入理解 HTTP 协议本质与应用。",
        },
      ],
    },
    {
      name: "Front End",
      link: "/front-end",
      description: "Front End learning notes",
      items: [
        {
          name: "Internet",
          link: "/docs/front-end/internet/00%20Overview/",
          description: "System understanding of Internet.",
        },
        {
          name: "Javascript 进阶实战",
          link: "/docs/front-end/Javascript%20进阶实战/00%20JavaScript进阶之路/",
          description: "系统掌握 JavaScript 知识网络。",
        },
        {
          name: "JavaScript 核心原理解析",
          link: "/docs/front-end/JavaScript%20核心原理解析/01%20delete%20销毁/",
          description:
            "深度解读 JavaScript 核心技术，语言特性以及原理剖析，构建语言知识结构体系。",
        },
        {
          name: "浏览器工作原理",
          link: "/docs/front-end/浏览器工作原理/概览/00%20浏览器概览/",
          description: "浏览器工作原理知识分享。",
        },
        {
          name: "图解 Google V8",
          link: "/docs/front-end/图解%20Google%20V8/宏观视角/00%20如何学习谷歌高性能%20JavaScript%20引擎%20V8/",
          description: "彻底搞懂 JavaScript 执行逻辑。",
        },
        {
          name: "React 实战",
          link: "/docs/front-end/React%20实战/01%20React介绍/",
          description:
            "全面学习 React 常用技术栈，深入理解 React 设计模式，常见场景下的编程实战指南，掌握用 React 开发大型项目的能力。",
        },
        {
          name: "现代 React Web 开发实战",
          link: "/docs/front-end/现代%20React%20Web%20开发实战/00%20开篇/",
          description: "新版React使用函数组件Hooks进行高效进阶开发。",
        },
        {
          name: "React 技术剖析",
          link: "/docs/front-end/React%20技术剖析/01%20Hook/",
          description: "深入理解 React 设计模式，常见场景下的编程实战指南。",
        },
        {
          name: "依赖库",
          link: "/docs/front-end/依赖库/Formik/",
          description: "web开发常用依赖库介绍。",
        },
        {
          name: "WEB3",
          link: "/docs/front-end/WEB3/The%20Architecture%20of%20a%20Web%203.0%20application/",
          description: "WEB 3.0 相关技术研究。",
        },
      ],
    },
    {
      name: "Back End",
      link: "/back-end",
      description: "Back End learning notes",
      items: [
        {
          name: "Node.js 开发实战",
          link: "/docs/back-end/Node.js%20开发实战/01%20Node.js%20是什么/",
          description: "从零开发一个完整的 Node.js 项目。",
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
