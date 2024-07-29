import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')

// Rotas usuario
router.post('signup', [UsersController, 'signup'])
router.post('login', [AuthController, 'store'])
