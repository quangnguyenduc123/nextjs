import { useEffect, useState } from "react"
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

function LastSalesPage() {
    const [sales, setSales] = useState()
    // const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch('https://webapp-672a1.firebaseio.com/sales.json')
    //         .then(response => response.json())
    //         .then(data => {
    //             const transformedSales = []

    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume
    //                 })
    //             }
    //             setSales(transformedSales)
    //             setIsLoading(false)
    //         })
    // }, [])

    // if (isLoading) {
    //     return <p>Loading....................</p>
    // }

    // if (!sales) {
    //     return <p>No data yet</p>
    // }


    // USING SWR FETCHING DATA INSTEAD OF USEEFFECT
    const { data, error } = useSWR('https://webapp-672a1.firebaseio.com/sales.json', fetcher)

    useEffect(() => {
        const transformedSales = []
        console.log(data)
        for (const key in data) {
            transformedSales.push({
                id: key,
                username: data[key].username,
                volume: data[key].volume
            })
        }
        setSales(transformedSales)
    }, [data])

    if (error) return <p>Error</p>

    if (!data || !sales) return <p>Loading...............</p>

    if (!sales) <p>No Data</p>

    return <ul>
        {sales.map((sale) => (
            <li key={sale.id}>
                {sale.username}-{sale.volume}
            </li>
        ))}
    </ul>
}

export default LastSalesPage