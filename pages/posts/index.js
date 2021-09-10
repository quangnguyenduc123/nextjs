import { Fragment } from 'react'
import Head from 'next/head'
import AllPosts from '../../components/posts/all-posts'
import { getAllPosts } from '../../lib/posts-util'

function AllPostsPage(props) {
    return (
        <Fragment>
            <Head>
                <title>Posts</title>
                <meta name="description" content="List of posts" />
            </Head>
            <AllPosts posts={props.posts}></AllPosts>
        </Fragment>
    )
}

export function getStaticProps() {
    const posts = getAllPosts()
    return {
        props: {
            posts
        }
    }
}
export default AllPostsPage