/*
Pautas:
- Crea funciones para calcular el total de ventas, encontrar el producto más vendido y el vendedor del mes.
- Utiliza métodos de array como `reduce`, `map`, y `sort`.
*/

const salesData = [
    { date: "2024-03-01", product: "Laptop", amount: 1200, salesperson: "Alice" },
    { date: "2024-03-02", product: "Phone", amount: 800, salesperson: "Bob" },
    { date: "2024-03-02", product: "Laptop", amount: 1200, salesperson: "Alice" },
    { date: "2024-03-03", product: "Tablet", amount: 500, salesperson: "Charlie" },
    { date: "2024-03-04", product: "Phone", amount: 800, salesperson: "Bob" },
    { date: "2024-03-05", product: "Laptop", amount: 1200, salesperson: "Alice" }
]

const calculateTotalSales = (salesData) => {
    let sum = 0
    salesData.forEach((data) => sum += data.amount)
    return sum
}

const starProduct = (salesData) => {
    // VERSIÓN PROPIA
    const productList = []
    const productFrequency = []
    let maxCount = 0
    let mostSelledProduct = null

    salesData.forEach((data) => {
        if(!productList.includes(data.product)){
            productList.push(data.product)
        }
    })

    productList.forEach((product) => {
        productFrequency.push({name: product, count: 1})
    })

    salesData.forEach((data) => {
        productFrequency.forEach((product) => {
            if (product.name === data.product) {
                product.count += 1
            }
            if (product.count > maxCount) {
                maxCount = product.count
                mostSelledProduct = product.name
            }
        })
    })

    return mostSelledProduct

    /* CON AYUDA DEL CHATGPT
    let frequency = {}
    let maxCount = 0
    let mostSelledProduct = null

    salesData.forEach((data) => {
        frequency[data.product] = (frequency[data.product] || 0) + 1

        if (frequency[data.product] > maxCount) {
            maxCount = frequency[data.product]
            mostSelledProduct = data.product
        }
    })
    return mostSelledProduct
    */
}

const starSeller = (salesData) => {
    // VERSIÓN PROPIA
    const salespersonList = []
    const salespersonFrequency = []
    let maxCount = 0
    let bestSalesperson = null

    salesData.forEach((data) => {
        if(!salespersonList.includes(data.salesperson)){
            salespersonList.push(data.salesperson)
        }
    })

    salespersonList.forEach((salesperson) => {
        salespersonFrequency.push({name: salesperson, count: 1})
    })

    salesData.forEach((data) => {
        salespersonFrequency.forEach((salesperson) => {
            if (salesperson.name === data.salesperson) {
                salesperson.count += 1
            }
            if (salesperson.count > maxCount) {
                maxCount = salesperson.count
                bestSalesperson = salesperson.name
            }
        })
    })

    return bestSalesperson

    /* CON AYUDA DEL CHATGPT
    let frequency = {}
    let maxCount = 0
    let bestSalesperson = null

    salesData.forEach((data) => {
        frequency[data.salesperson] = (frequency[data.salesperson] || 0) + 1

        if (frequency[data.salesperson] > maxCount) {
            maxCount = frequency[data.salesperson]
            bestSalesperson = data.salesperson
        }
    })

    return bestSalesperson
    */
}

console.log(`Total de ventas del mes: ${calculateTotalSales(salesData)}`)

console.log(`Producto más vendido: ${starProduct(salesData)}`)

console.log(`Vendedor(a) del mes: ${starSeller(salesData)}`)