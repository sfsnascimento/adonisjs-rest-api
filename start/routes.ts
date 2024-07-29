import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
const ProductsController = () => import('#controllers/products_controller')

// Rotas usuario
router.post('signup', [UsersController, 'signup'])
router.post('login', [AuthController, 'store'])

//Rotas produtos
router.get('products', [ProductsController, 'index'])
router.post('product', [ProductsController, 'store'])
router.get('product/:id', [ProductsController, 'show'])
router.put('product/:id', [ProductsController, 'update'])
router.delete('product/:id', [ProductsController, 'delete'])
