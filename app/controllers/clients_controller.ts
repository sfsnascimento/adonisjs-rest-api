import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class ClientsController {
  async index({ auth }: HttpContext) {
    await auth.authenticate()

    const Clients = await db.from('clients').select('id', 'name', 'cpf').orderBy('id', 'asc')

    return Clients
  }

  async store({ request, auth }: HttpContext) {
    const { name, cpf } = request.body()
    const user = await auth.authenticate()

    await Client.create({
      name,
      cpf,
      user_id: user.id,
    })
  }

  async show({ request, auth }: HttpContext) {
    const { id, year, month } = request.params()

    await auth.authenticate()

    const clientSales = await db
      .from('clients')
      .join('sales', 'clients.id', '=', 'sales.client_id')
      .select('clients.id', 'clients.name', 'clients.cpf')
      .select(
        'sales.id',
        'sales.product_id',
        'sales.quantity',
        'sales.unit_price',
        'sales.total_price',
        'sales.created_at'
      )
      .where('clients.id', id)
      .orderBy('sales.created_at', 'desc')

    const clientFilteredSales = clientSales.filter((sale) => {
      const saleDate = DateTime.fromJSDate(sale.created_at)

      return saleDate.year === Number(year) && saleDate.month === Number(month)
    })

    return year && month ? clientFilteredSales : clientSales
  }

  async update({ request, response, auth }: HttpContext) {
    const clientId = request.param('id')
    const { name, cpf } = request.body()

    await auth.authenticate()

    const client = await Client.find(clientId)

    if (client) {
      await client.merge({ name, cpf }).save()
      return response.status(200)
    }

    return response.status(404).json({ message: 'Client not found.' })
  }
}
