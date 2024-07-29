import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ProductsController {
  async index({ auth }: HttpContext) {
    await auth.authenticate()

    const products = await db
      .from('products')
      .select('id', 'name', 'price', 'quantity')
      .where('active', true)
      .orderBy('name', 'asc')

    return products
  }

  async store({ request, auth }: HttpContext) {
    const { name, price, quantity, active } = request.body()
    const user = await auth.authenticate()

    await Product.create({
      user_id: user.id,
      name,
      price,
      quantity,
      active,
    })
  }

  async show({ request, auth }: HttpContext) {
    const productId = request.param('id')
    await auth.authenticate()

    const product = await Product.find(productId)

    return product
  }

  async update({ request, response, auth }: HttpContext) {
    const productId = request.param('id')
    const { name, price, quantity } = request.body()

    await auth.authenticate()

    const product = await Product.find(productId)

    if (product) {
      await product.merge({ name, price, quantity }).save()
      return response.status(200)
    }

    return response.status(404).json({ message: 'Product not found.' })
  }

  async delete({ request, response, auth }: HttpContext) {
    const productId = request.param('id')
    const { active } = request.body()

    await auth.authenticate()

    const product = await Product.find(productId)

    if (product) {
      await product.merge({ active }).save()
      return response.status(200)
    }

    return response.status(404).json({ message: 'Product not found.' })
  }
}
