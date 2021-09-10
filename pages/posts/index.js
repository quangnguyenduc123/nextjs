import AllPosts from '../../components/posts/all-posts'
import { getAllPosts } from '../../lib/posts-util'

function AllPostsPage(props) {
    return (
        <AllPosts posts={props.posts}></AllPosts>
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