import { Fragment } from 'react'
import Head from 'next/head'
import FeaturedPosts from '../components/home-page/featured-posts'
import Hero from '../components/home-page/hero'
import { getFeaturedPosts } from '../lib/posts-util'


function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Quang's blog</title>
        <meta name="description" content="I post about everything" />
      </Head>
      <Hero></Hero>
      <FeaturedPosts posts={props.posts}></FeaturedPosts>
    </Fragment>
  )
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts()
  return {
    props: {
      posts: featuredPosts
    }
  }
}

export default HomePage