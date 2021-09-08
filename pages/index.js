import fs from 'fs'
import path from 'path'

const Home = (props) => {

  const { products } = props

  return (
    <ul>
      {products.map(product =>
        <li key={product.id}>{product.title}</li>
      )}
    </ul>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFileSync(filePath)
  const data = JSON.parse(jsonData)

  return {
    props: {
      products: data.products,
    }
  }
}

export default Home