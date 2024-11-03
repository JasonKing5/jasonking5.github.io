import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import useBaseUrl, {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import Tweet from '@site/src/components/Tweet';
import React, { useState } from 'react'

import styles from './index.module.css';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className="hero__title">
//           {/* <img
//             alt={'Docusaurus with Keytar'}
//             className={styles.heroLogo}
//             src={useBaseUrl('/img/index_title.png')}
//             width="200"
//             height="200"
//           /> */}
//           <span className={styles.heroTitleTextHtml} >Code FE</span>
//           <br />
//         </Heading>
//         <p className="hero__subtitle">视频教程配套学习交流网站</p>
//         {/* <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro">
//             Docusaurus 课程 - 5min ⏱️
//           </Link>
//         </div> */}
//       </div>
//     </header>
//   );
// }

// function imageContent({src, alt = '', width = '200', height = '200'}) {
//   const [imageActive, setImageActive] = useState(false)
//   return (
//     <div 
//       // onClick={() => {
//       //   setImageActive(!imageActive)
//       // }}
//       className={imageActive ? 'image-content-active' : 'image-content'}
//       style={{position: 'relative'}}
//       key={src}
//     >
//       <img
//         alt={alt}
//         className={styles.imageContentImg}
//         style={{position: imageActive ? 'absolute' : 'relative', }}
//         src={useBaseUrl(src)}
//         width={imageActive ? '500' : width}
//         height={imageActive ? '500' : height}
//       />
//     </div>
//   )
// }

// const VideoContainer = () => {
//   // const [qqIndex, setQQIndex] = React.useState(0)


//   // AGCServer.Auth.getCurrentUser((code ,res) => {
//   //   console.log('getCurrentUser():', code, res)
//   // })
  
//   // const code = await AGCServer.Auth.isLogin()
//   // console.log('isLogin():', code)
//   return (
//     <div className="container text--center margin-top--xl">
//       <div className="row">
//         <div className="col">
//           <Heading as="h2">
//             免费在线观看全部教学视频
//           </Heading>
//           <div className="video-container" style={{
//                 marginTop: '30px',
//                 // marginBottom: '20px',
//           }}>
//             <iframe src="//player.bilibili.com/player.html?aid=620886009&bvid=BV1pb4y1g75m&cid=1332523295&p=1" scrolling="no" className={styles.videoIframe}> </iframe>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function TweetsSection() {
//   const tweetColumns = [
//     [
//       {
//         avatar: '/img/index_fans_0.png', 
//         name: '尚硅谷', 
//         content: '不吹不黑，讲的真细致，快更新，评论区小伙伴们都等不及了！👍', 
//         date: '2024-01-25 14:01', 
//         url: 'https://space.bilibili.com/302417610',
//       },
    
      
//       {
//         avatar: '/img/index_fans_7.png', 
//         name: 'kerwin', 
//         content: '列位，这个视频很细~', 
//         date: '2023-11-27 12:03', 
//         url: 'https://space.bilibili.com/697549960',
//       },
     
//       {
//         avatar: '/img/index_fans_4.png', 
//         name: '天000明', 
//         content: '讲的很细，虽然自己已经官网学过一遍了，但看UP主的视频总是能给我查缺补漏的感觉，赞！话说第二季什么时候更新，哈哈', 
//         date: '2023-11-25 10:06', 
//         url: 'https://space.bilibili.com/440388771',
//       },
//     ],
//     [
//       {
//         avatar: '/img/index_fans_1.png', 
//         name: '黑马pink讲前端', 
//         content: '不错不错，更新很快哈~加油~。看你视频，感觉咱俩风格很像哈，但是你声音更好听，而且很有诗意~~ 真的不错，加油加油~~有点意思哈~~。一起加油哈😊', 
//         date: '2023-11-23 16:06', 
//         url: 'https://space.bilibili.com/415434293',
//       },
//       {
//         avatar: '/img/index_fans_8.png', 
//         name: '连志安', 
//         content: '挺好的，👍👍转起来', 
//         date: '2023-11-26 19:53', 
//         url: 'https://space.bilibili.com/35532080',
//       },

//       {
//         avatar: '/img/index_fans_3.png', 
//         name: '真实z', 
//         content: '鸿蒙真的慢慢推向主流了阿，我软件专业以往移动应用开发交的都是安卓，就我这一届开始教鸿蒙了，现在学的就是鸿蒙4.0', 
//         date: '2023-11-28 11:05', 
//         url: 'https://space.bilibili.com/277000816',
//       },

//     ],
//     [
     
//       {
//         avatar: '/img/index_fans_5.png', 
//         name: 'zachariahkk', 
//         content: '讲的挺细，不错。看了俩月鸿蒙了，之前做iOS，现在在西安找鸿蒙的岗位，几乎都只要前端和安卓的😂', 
//         date: '2023-11-23 23:33', 
//         url: 'https://space.bilibili.com/19061903',
//       },
//       {
//         avatar: '/img/index_fans_2.png', 
//         name: '鸿蒙钊哥', 
//         content: '据说这个很受小白欢迎', 
//         date: '2023-11-23 23:33', 
//         url: 'https://space.bilibili.com/455592866',
//       },
//       {
//         avatar: '/img/index_fans_6.png', 
//         name: 'sun2night', 
//         content: 'B站学过这么多视频，这个视频是最通俗易懂的。UP主，坚持下去，你讲的是真的非常好。我年过40的人，居然都几乎不用看第二次就学会了。这教学水平真的一流啊。我的理解是，UP主对于自己所教学的东西理解很透彻，所以才能教得行云流水！感谢！', 
//         date: '2023-11-16 23:25', 
//         url: 'https://space.bilibili.com/660880513',
//       },
     
//     ]
//   ];

//   return (
//     <div className={clsx(styles.section, styles.sectionAlt)}>
//       <div className="container">
//         <Heading as="h2" className={clsx('margin-bottom--lg', 'text--center')}>
//           好心网友溢美之词&业界大佬梦幻联动
//         </Heading>
//         <div className={clsx('row', styles.tweetsSection)}>
//           {tweetColumns.map((tweetItems, i) => (
//             <div className="col col--4" key={i}>
//               {tweetItems.map((tweet) => (
//                 <Tweet {...tweet} key={tweet.name} />
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Resources() {
  
//   const [activeQQTab, setActiveQQTab] = useState(0);

//   const changeQQTab = (index) => {
//     setActiveQQTab(index);
//   };
//   const [activeWechatTab, setActiveWechatTab] = useState(0);

//   const changeWechatTab = (index) => {
//     setActiveWechatTab(index);
//   };


//   const buttonStyle = {
//     height: "30px",
//     border: "1px solid rgb(229 229 229 / 50%)",
//     // borderRadius: "4px",
//     fontSize: '1.125rem',
//     padding: '2px 10px',
//     backgroundColor: "rgb(233 236 241 / 30%)",
//     cursor: 'pointer',
//   }
//   const buttonSelectedStyle = {
//     backgroundColor: '#2c78e5',
//     color: "white",
//   }
//   const buttonStl = (type, index) => {
//     if (type === 'qq') {
//       return activeQQTab == index ? {...buttonStyle, ...buttonSelectedStyle} : buttonStyle
//     } else {
//       return activeWechatTab == index ? {...buttonStyle, ...buttonSelectedStyle} : buttonStyle
//     }
//   }
  
//   const wechats = [
//     { id: 0, name: '英雄哥', img: '/img/index_chat_1.jpg', },
//     { id: 1, name: '7大哥', img: '/img/index_chat_2.jpg', },
//     { id: 2, name: '小孙同学', img: '/img/index_chat_3.jpg', },
//     { id: 3, name: '荒天帝', img: '/img/index_chat_4.jpg', },
//   ]
//   const qqs = [
//     { id: 0, name: '3 群', img: '/img/index_qq_3.jpg', },
//     { id: 1, name: '2 群', img: '/img/index_qq_2.jpg', },
//     { id: 2, name: '1 群', img: '/img/index_qq_1.jpg', },
//   ]

//   return (
//     <div className={clsx(styles.resourceContainer)}>
//       <div style={{padding: '0 14%'}}>
//         <Heading as="h2" className={clsx('margin-bottom--lg', 'text--center')}>
//           配套资料及学习交流群
//         </Heading>
//         <div style={{textAlign: 'center'}}>文档资料：<Link to={'https://www.hmosxy.com/docs/learn/intro'}>访问资料库</Link></div>
//         <div style={{textAlign: 'center'}}>代码地址：<Link to={'https://gitee.com//mayuanwei/harmonyOS_bilibili'}>访问 Gitee 代码库</Link></div>
//         <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '10px', flexWrap: 'wrap'}}>
//           <div className={clsx('col col--6')}>
//             <div style={{display:"flex", flexDirection:"column",alignItems:"center",marginBottom:"20px"}}>
//               <div className="tab-header">
//                 <strong style={{marginRight: '5px', fontSize: '1.2rem'}}>微信群助手</strong>
//                 {wechats.map(wechat => (
//                   <button key={wechat.id} style={buttonStl('wechat', wechat.id)} onClick={() => changeWechatTab(wechat.id)}>{wechat.name}</button>
//                 ))}
//               </div>
//               <div className="tab-content">
//                 {wechats.map(wechat => {
//                   return activeWechatTab === wechat.id && <div>{imageContent({src: wechat.img, })}</div>
//                 })}
//               </div>
//             </div>
//           </div>
//           <div className={clsx('col col--6')}>
//             <div style={ {display:"flex", flexDirection:"column",alignItems:"center",marginBottom:"20px"} }>
//               <div className="tab-header">
//                 <strong style={{marginRight: '5px', fontSize: '1.2rem'}}>QQ群</strong>
//                 {qqs.map(qq => (
//                   <button key={qq.id} style={buttonStl('qq', qq.id)} onClick={() => changeQQTab(qq.id)}>{qq.name}</button>
//                 ))}
//               </div>
//               <div className="tab-content">
//                 {qqs.map(qq => {
//                   return activeQQTab === qq.id && <div>{imageContent({src: qq.img, })}</div>
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <div className={clsx('row', styles.tweetsSection)}>
//           {wechats.map((wechat, i) => (
//             <div className="col col--6" key={i}>
//               {tweetItems.map((tweet) => (
//                 <Tweet {...tweet} key={tweet.name} />
//               ))}
//             </div>
//           ))}
//         </div> */}
//       </div>
//     </div>
//   );
// }


export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  // React.useEffect(() => {
  //   const logInOutDom = document.getElementById('logInOut');
  //   if (hasToken()) {
  //     logInOutDom.innerHTML = '退出'
  //     logInOutDom.addEventListener('click', function() {
  //       logOut()
  //       console.log('hello')
  //     })
  //     // logInOutDom.parentElement.attributes['href'] = '/login'
  //   } else {
  //     logInOutDom.innerHTML = '登录'
  //   }
  // })
  return (
    <Layout
      title={`${siteConfig.title} home`}
      description="Code FE">
      {/* <HomepageHeader /> */}
      <main>
        {/* <HomepageFeatures />
        <VideoContainer />
        <TweetsSection />
        <Resources /> */}
        <div>hello home</div>
      </main>
    </Layout>
  );
}
