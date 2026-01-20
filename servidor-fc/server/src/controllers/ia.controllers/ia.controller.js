const ChatbotService = require('../../services/ia.services/chatbot.service');
const KnowledgeService = require('../../services/ia.services/knowledge.service');

const chatService = new ChatbotService();
const docService = new KnowledgeService();

const chat = async (req, res) => {
    try {
        const { mensaje, sessionId } = req.body;
        // Si hay token de usuario (personal interno), lo extraemos
        const usuarioId = req.user ? req.user.id_usuario : null; 

        const respuesta = await chatService.procesarPregunta(mensaje, sessionId, usuarioId);
        res.json({ success: true, data: respuesta });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const uploadDoc = async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('Falta PDF');
        const { titulo } = req.body;
        
        await docService.ingerirDocumento(req.file, titulo);
        res.json({ success: true, message: 'Documento aprendido exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { chat, uploadDoc };