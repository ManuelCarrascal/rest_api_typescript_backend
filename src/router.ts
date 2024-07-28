import { Router } from 'express';
import { body, param } from 'express-validator';
import {
	createProduct,
	deleteProductById,
	getProductById,
	getProducts,
	updateAvailability,
	updateProduct,
} from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del producto
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre del producto
 *           example: "Producto 1"
 *         price:
 *           type: number
 *           description: Precio del producto
 *           example: 100
 *         availability:
 *           type: boolean
 *           description: Disponibilidad del producto
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags:
 *       - Products
 *     description: Obtiene todos los productos
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts);

router.get(
	'/:id',
	param('id').isInt().withMessage('ID no válido'),
	handleInputErrors,
	getProductById
);

router.post(
	'/', //validación de campos
	body('name').notEmpty().withMessage('El nombre del producto es requerido'),

	body('price')
		.isNumeric()
		.withMessage('El precio del producto debe ser un número')
		.notEmpty()
		.withMessage('El precio del producto es requerido')
		.custom((value) => value > 0)
		.withMessage('Precio no válido'),
	handleInputErrors,

	createProduct
);

router.put(
	'/:id',
	param('id').isInt().withMessage('ID no válido'),
	body('name').notEmpty().withMessage('El nombre del producto es requerido'),

	body('price')
		.isNumeric()
		.withMessage('El precio del producto debe ser un número')
		.notEmpty()
		.withMessage('El precio del producto es requerido')
		.custom((value) => value > 0)
		.withMessage('Precio no válido'),
	body('availability').isBoolean().withMessage('Disponibilidad no válida'),
	handleInputErrors,
	updateProduct
);

router.patch(
	'/:id',
	param('id').isInt().withMessage('ID no válido'),
	handleInputErrors,
	updateAvailability
);

router.delete(
	'/:id',
	param('id').isInt().withMessage('ID no válido'),
	handleInputErrors,
	deleteProductById
);

export default router;
