import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useAsync } from 'react-async';
import Grid from '@material-ui/core/Grid';
import Article from './Article';
import SectionTitle from '../../common/SectionTitle';
import { getArticles } from '../../../services/article';

function Blogs() {
  const { t } = useTranslation();
  // const { data: posts } = useAsync({ promiseFn: getArticles });
  // console.log("posts", posts);

  var posts = [{
    title: "Express server設定SSL，使用https建立安全連線",
    slug: "ExpressSslHttps",
    date: "2019-06-17T04:02:48.000Z",
    updated: "2019-6-17T12:34:49.271Z",
    comments: true,
    path: "api/articles/setting-up-drone-for-gitlab-integration.json",
    excerpt: null,
    keywords: null,
    cover: "https://user-images.githubusercontent.com/6461602/77222797-9dcb5580-6b91-11ea-833b-43a76b934892.png",
    content: null,
    raw: null,
    url: "https://blog.verityfolio.site/2019/06/17/ExpressSslHttps/"
  }]
  return posts ? (
    <Grid id="articles" container alignContent="stretch" direction="column" justify="center" spacing={0}>
      <SectionTitle title={t('content.blog')} />
      <Grid direction="row" alignContent="stretch"  justify="space-between" xs={12} item spacing={0} container>
        {posts.map((post, index) => (
          <Article
            key={index}
            image={post.cover}
            title={post.title}
            day={moment(post.date).format('DD')}
            month={moment(post.date).format('MMM')}
            url={post.url}
          />
        ))}
      </Grid>
    </Grid>
  ) : null
}

export default Blogs;
