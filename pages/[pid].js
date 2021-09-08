import { Fragment } from "react"
import fs from 'fs'
import path from 'path'


const ProductDetailPage = (props) => {

    return <Fragment>
        <h1>{props.loadedProudct.title}</h1>
    </Fragment>
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData = await fs.readFileSync(filePath)
    const data = await getData()

    return data
}

export async function getStaticProps(context) {
    const { params } = context
    const productId = params.pid

    const product = data.products.find(product => product.id === productId)


    return {
        props: {
            loadedProudct: product
        }
    }
}

export async function getStaticPaths() {
    const data = await getData()

    const ids = data.products.map(product => product.id)
    const pathsWithParams = ids.map(id => ({ params: { pid: id } }))

    return {
        paths: pathsWithParams,
        fallback: 'blocking'
    }
}

export default ProductDetailPage