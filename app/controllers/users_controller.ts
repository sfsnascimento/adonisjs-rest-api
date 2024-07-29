import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async signup({ request }: HttpContext) {
    const { email, password } = request.body()

    await User.create({
      email,
      password,
    })
  }
}
