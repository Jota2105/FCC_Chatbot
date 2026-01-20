const InteraccionService = require('../../services/comunidad.services/interaccion.services');
const service = new InteraccionService();


const create = async ( req, res ) => {
    try { 
        const { body, file } = req;
        if (file) {
            // Assuming the 'uploads' directory is served statically at the root
            body.archivo_interaccion = `/uploads/comunidad/interacciones/${file.filename}`;
        }
        const response = await service.create(body);
        res.json({ success: true, data: response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const get = async ( req, res ) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await service.findOne(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id,body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const _delete = async (req, res) => {
    try {
        const { id } = req.params; 
        const response = await service.delete(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getByPersonaId = async (req, res) => {
    try {
        const { idPersona } = req.params;
        const response = await service.findByPersonaId(idPersona);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = {
    create, get, getById, update, _delete, getByPersonaId
};
