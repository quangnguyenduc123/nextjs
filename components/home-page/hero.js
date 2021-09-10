import Image from 'next/image'
import classes from './hero.module.css'

function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/myImage.jpg"
                    alt="My image"
                    width={300}
                    height={300} />
            </div>
            <h1>Hi, I'm Quang</h1>
            <p>I'm a web developer. My stack is Reactjs, Nodejs, AWS</p>
        </section>
    )
}

export default Hero