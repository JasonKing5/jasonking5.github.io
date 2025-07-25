/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import useBaseUrl, {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

function WebsiteLink({to, children}: {to: string; children?: ReactNode}) {
  return (
    <Link to={to}>
      {children ?? (
        <Translate id="team.profile.websiteLinkLabel">website</Translate>
      )}
    </Link>
  );
}

type ProfileProps = {
  className?: string;
  name: string;
  children: ReactNode;
  bilibiliUrl: string;
  giteeUrl?: string;
  avatarUrl?: string;
  wechatUrl?: string;
};

function TeamProfileCard({
  className,
  name,
  children,
  bilibiliUrl,
  giteeUrl,
  avatarUrl,
  wechatUrl,
}: ProfileProps) {
  return (
    <div className={className}>
      <div className="card card--full-height">
        <div className="card__header">
          <div className="avatar avatar--vertical">
            <img
              className="avatar__photo avatar__photo--xl"
              src={`${avatarUrl}`}
              alt={`${name}`}
            />
            <div className="avatar__intro">
              <Heading as="h3" className="avatar__name">
                {name}
              </Heading>
            </div>
          </div>
        </div>
        <div className="card__body">{children}</div>
        <div className="card__footer">
          <div className="button-group button-group--block">
            {bilibiliUrl && (
              <Link className="button button--secondary" href={bilibiliUrl}>
                Bilibili
              </Link>
            )}
            {giteeUrl && (
              <Link className="button button--secondary" href={giteeUrl}>
                Gitee
              </Link>
            )}
            {wechatUrl && (
              <Link className="button button--secondary" href={wechatUrl}>
                公众号
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamProfileCardCol(props: ProfileProps) {
  return (
    <TeamProfileCard {...props} className="col col--6 margin-bottom--lg" />
  );
}

export function ActiveTeamRow(): JSX.Element {
  return (
    <div className="row">
      <TeamProfileCardCol
        name="帝心"
        giteeUrl="https://gitee.com/mayuanwei"
        avatarUrl='https://foruda.gitee.com/avatar/1680571445959229147/9556293_mayuanwei_1680571445.png!avatar200'
        wechatUrl="https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&__biz=MzI0NDQ4MjE4MQ==&scene=1&album_id=3212803851943116806"
        bilibiliUrl="https://space.bilibili.com/110937561">
        <div>
          喜欢吟诗，擅写故事，公众号里写尽人生百态。
          <br />
          略懂技术，偶写代码，IT教育中坚持开源精神。
        
        </div>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="漆海标"
        bilibiliUrl="https://space.bilibili.com/349810785"
        // avatarUrl="https://ai1123.com/wp-content/uploads/2024/01/%E6%B5%B7%E5%AD%90%E8%87%AA%E6%8B%9F%E5%A4%B4%E5%83%8F2.jpg"
        avatarUrl="https://img.zcool.cn/community/01a6575afe768ea801218cf4a57892.jpg@1280w_1l_2o_100sh.jpg"
      >
        <div>
          喜欢哲学，前瞻未来。对自组织有所研究，与共开放社区发起人。在B站学鸿蒙课，结识为爱发电的帝心老师。与各位一起打造易交易平台。为数字时代探索经济模型而奋斗。
        </div>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="庄生"
        bilibiliUrl="https://space.bilibili.com/286327785"
        avatarUrl="https://foruda.gitee.com/avatar/1676974431817687676/1529009_josoncoder_1578953753.png!avatar200"
        giteeUrl="https://gitee.com/jasonking5">
        <div>
          Web全栈开发工程师 🧐 钟爱 React 技术栈，对底层技术和浏览器原理略有研究 👋 喜欢钻研新技术 🔥 
        </div>
      </TeamProfileCardCol>
    </div>
  );
}

export function HonoraryAlumniTeamRow(): JSX.Element {
  return (
    <div className="row">
      <TeamProfileCardCol
        name="张三"
        bilibiliUrl=""
        giteeUrl="">
        <div>
          hello 张三
        </div>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="李四"
        bilibiliUrl=""
        giteeUrl="">
        <div>
          hello 李四
        </div>
      </TeamProfileCardCol>
    </div>
  );
}

export function StudentFellowsTeamRow(): JSX.Element {
  return (
    <div className="row">
      <TeamProfileCardCol
        name="Anshul Goyal"
        bilibiliUrl="https://github.com/anshulrgoyal"
        giteeUrl="https://twitter.com/ar_goyal">
        <Translate
          id="team.profile.Anshul Goyal.body"
          values={{
            websiteLink: (
              <Link href="https://anshulgoyal.dev/">
                <Translate id="team.profile.Anshul Goyal.body.websiteLink.label">
                  website
                </Translate>
              </Link>
            ),
          }}>
          {
            'Fullstack developer who loves to code and try new technologies. In his free time, he contributes to open source, writes blog posts on his {websiteLink} and watches Anime.'
          }
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Drew Alexander"
        bilibiliUrl="https://github.com/drewbi">
        <Translate id="team.profile.Drew Alexander.body">
          Developer and Creative, trying to gain the skills to build whatever he
          can think of.
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Fanny Vieira"
        bilibiliUrl="https://github.com/fanny"
        giteeUrl="https://twitter.com/fannyvieiira">
        <Translate
          id="team.profile.Fanny Vieira.body"
          values={{
            blogLink: (
              <Link href="https://dev.to/fannyvieira">
                <Translate id="team.profile.Fanny Vieira.body.blogLink.label">
                  her blog
                </Translate>
              </Link>
            ),
            spotifyLink: (
              <Link href="https://open.spotify.com/user/anotherfanny">
                <Translate id="team.profile.Fanny Vieira.body.spotifyLink.label">
                  Spotify playlists
                </Translate>
              </Link>
            ),
          }}>
          {
            'Fanny got started with web development in high school, building a project for the school kitchen. In her free time she loves contributing to Open Source, occasionally writing on {blogLink} about her experiences, cooking, and creating {spotifyLink}.'
          }
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Sam Zhou"
        bilibiliUrl="https://github.com/SamChou19815"
        giteeUrl="https://twitter.com/SamChou19815">
        <Translate
          id="team.profile.Sam Zhou.body"
          values={{
            websiteLink: (
              <Link href="https://developersam.com">
                <Translate id="team.profile.Anshul Goyal.body.websiteLink.label">
                  website
                </Translate>
              </Link>
            ),
            samLangLink: (
              <Link href="https://samlang.developersam.com/">
                <Translate id="team.profile.Sam Zhou.body.samLangLink.label">
                  programming language
                </Translate>
              </Link>
            ),
            miniReactLink: (
              <Link href="https://github.com/SamChou19815/mini-react">
                <Translate id="team.profile.Sam Zhou.body.miniReactLink.label">
                  mini React
                </Translate>
              </Link>
            ),
          }}>
          {
            'Sam started programming in 2011 and built his {websiteLink} in 2015. He is interested in programming languages, dev infra and web development, and has built his own {samLangLink} and {miniReactLink}.'
          }
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Tan Teik Jun"
        bilibiliUrl="https://github.com/teikjun"
        giteeUrl="https://twitter.com/teik_jun">
        <Translate id="team.profile.Tan Teik Jun.body">
          Open-source enthusiast who aims to become as awesome as the other
          humans on this page. Working on Docusaurus brought him closer to his
          goal. 🌱
        </Translate>
      </TeamProfileCardCol>
      <TeamProfileCardCol
        name="Nisarag Bhatt"
        bilibiliUrl="https://github.com/FocalChord"
        giteeUrl="https://twitter.com/focalchord_">
        <Translate id="team.profile.Nisarag Bhatt.body">
          Fullstack web developer who loves learning new technologies and
          applying them! Loves contributing to open source as well as writing
          content articles and learns.
        </Translate>
      </TeamProfileCardCol>
    </div>
  );
}
