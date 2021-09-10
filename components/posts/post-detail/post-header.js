import Image from 'next/image'
import classes from './post-header.module.css'

function PostHeader(props) {
    const { title, image } = props

    const imagePath = `/images/posts/getting-started-nextjs.png`

    return <header className={classes.header}>
        <h1>{title}</h1>
        <Image
            src={imagePath}
            alt={title}
            height={150}
            width={200} >
        </Image>
    </header>
}

export default PostHeader