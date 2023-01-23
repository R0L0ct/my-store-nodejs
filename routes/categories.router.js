const express = require('express')
const router = express.Router();


router.get('/', (req, res) => {
	res.json({
		name: 'Mis categorias'
	})
})

module.exports = router;
