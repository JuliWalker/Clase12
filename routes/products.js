const { Router } = require('express')
const router = Router()
const Container = require('../contenedor')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'routes/public/files')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
router.use(multer({
    storage
}).single('thumbnail'))


const file = './products.txt';
const container = new Container(file);


router.post('/', (req, res) => {
    const  body  = req.body;
    const photo = req.file
    const baseImgRoute = "../routes/public/files/"
    body.thumbnail = baseImgRoute.concat(photo.filename)
    console.log(body)
    if (body.title !== undefined && body.price !== undefined && body.thumbnail !== undefined) {
        if (body.title.length > 0 && body.price > 0) {
            const ID = container.saveNew(body)
            res.redirect('/')
        } else
            res.json(`no puedes crear un objecto con campos vacios`)
    } else {
        res.json(`tu producto no tiene el formato correcto`)
    }
})

router.get('/', (req, res) => {
    let allProductos = container.getAll()
    res.render('mostrarProducto', {allProductos});
})

/* router.get('/:id', (req, res) => {
    const id = req.params
    console.log(id.id)
    productoSeleccionado = container.getById(id.id)
    console.log(productoSeleccionado)
    const prodStr = JSON.stringify(productoSeleccionado)
    if (productoSeleccionado !== null) {
        res.json(`El producto seleccionado es: ${prodStr} `)
    } else {
        res.json(`No existe ningun producto con el ID seleccionado`)
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params
    console.log(id.id)
    container.deleteById(id.id)
    // me esta faltando verificar que ese producto exista y que lo estoy eliminando realmente - Por ahora funciona bien, pero podes poner cualquier fruta en lugar del ID y te tira el mismo mensaje
    res.json(`El producto con el ID: ${id.id} fue elinado con exito`)
})

router.put('/:id', (req, res) => {
    const id = req.params
    console.log(id.id)
    const nuevoProducto = req.body
    // aca tambien me falta verificar que el ID este dentro del rango de mi arreglo de productos. Sino me tira el mensaje de exito cuando en realidad no reemplaza nada.
    if (nuevoProducto.title !== undefined && nuevoProducto.price !== undefined && nuevoProducto.thumbnail !== undefined) {
        if (nuevoProducto.title.length > 0 && nuevoProducto.price > 0 && nuevoProducto.thumbnail.length > 0) {
            container.replaceById(id.id,nuevoProducto)
            res.json(`El producto con el ID: ${id.id} fue reemplazado con exito`)
        } else
            res.json(`no puedes crear un objecto con campos vacios`)
    } else {
        res.json(`tu producto no tiene el formato correcto`)
    }
}) */

module.exports = router