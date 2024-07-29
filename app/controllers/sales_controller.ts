import Product from '#models/product'
import Sale from '#models/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  async store({ request, response, auth }: HttpContext) {
    const { clientId, productId, quantity } = request.body()
    await auth.authenticate()

    const product = await Product.find(productId)

    if (product === null) {
      return response.status(404).json({ message: 'Product not found.' })
    }

    if (product.quantity < quantity) {
      return response.status(200).json({ message: 'out of stock' })
    }

    const totalPrice = product.price * quantity

    await Sale.create({
      client_id: clientId,
      product_id: productId,
      quantity,
      unit_price: product.price,
      total_price: totalPrice,
    })

    return response.status(201)
  }
}
