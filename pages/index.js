import fs from 'fs'
import Link from 'next/link'
import path from 'path'

const Home = (props) => {

  const { products } = props

  return (
    <ul>
      {products.map(product =>
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}
          </Link>
        </li>
      )}
    </ul>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFileSync(filePath)
  const data = JSON.parse(jsonData)

  if (data.products.length === 0) {
    return { notFound: true }
  }

  if (!data) {
    return {
      redirect: {
        destination: '/another-route'
      }
    }
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  }
}

export default Home