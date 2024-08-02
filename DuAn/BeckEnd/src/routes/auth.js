import { Router } from 'express';
import { deleteUser, forgotPassword, getAllUser, getUserById, signIn, signUp, updateUser } from '../controllers/auth.js';
const routerAuth = Router();
routerAuth.post('/signup', signUp)
routerAuth.post('/signin', signIn)
routerAuth.post('/forgot', forgotPassword)
routerAuth.get('/' , getAllUser)
routerAuth.get('/:id' , getUserById)
routerAuth.patch('/:id' , updateUser)
routerAuth.delete('/:id' , deleteUser)
export default routerAuth;