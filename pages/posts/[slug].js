import PostContent from "../../components/posts/post-detail/post-content"
import { getPostsFiles, getPostData } from '../../lib/posts-util'

function PostDetailPage(props) {
    const post = props.post
    return <PostContent
        title={post.title}
        image={post.image}
        slug={post.slug}
        content={post.content}
    >
    </PostContent>
}

export function getStaticPaths() {
    const postFilenames = getPostsFiles();

    const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: false,
    };
}

export function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;

    const postData = getPostData(slug);

    return {
        props: {
            post: postData,
        },
        revalidate: 600,
    };
}

export default PostDetailPage