const { OpenAI } = require('openai');
const { models } = require('../../libs/sequelize');
const sequelize = require('../../libs/sequelize');
const { v4: uuidv4 } = require('uuid');

class ChatbotService {
    constructor() {
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }

    async procesarPregunta(pregunta, sessionId = null, usuarioId = null) {
        const currentSession = sessionId || uuidv4();

        // 1. Moderación/Filtrado (Requerimiento explícito)
        const moderacion = await this.openai.moderations.create({ input: pregunta });
        if (moderacion.results[0].flagged) {
            throw new Error("Su mensaje infringe nuestras políticas de uso.");
        }

        // 2. Búsqueda de Contexto (RAG)
        // a. Vectorizar pregunta
        const embeddingResp = await this.openai.embeddings.create({
            model: "text-embedding-3-small",
            input: pregunta
        });
        const vectorPregunta = `[${embeddingResp.data[0].embedding.join(',')}]`;

        // b. Buscar en DB por similitud semántica
        const [contextos] = await sequelize.query(`
            SELECT contenido, documento_id 
            FROM fcc_ia.ia_segmentos_vector 
            ORDER BY embedding <-> '${vectorPregunta}' 
            LIMIT 4;
        `);

        const textoContexto = contextos.map(c => c.contenido).join("\n---\n");

        // 3. Generación de Respuesta (OpenAI)
        const systemPrompt = `
            Eres un asistente inteligente de la Fundación Con Cristo (FCC).
            Usa EXCLUSIVAMENTE la siguiente documentación interna para responder.
            Si la respuesta no está en el texto, indica que no tienes información, no inventes.
            
            DOCUMENTACIÓN INTERNA:
            ${textoContexto}
        `;

        const chatCompletion = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: pregunta }
            ],
            temperature: 0.3 // Baja temperatura para fidelidad a los docs
        });

        const respuesta = chatCompletion.choices[0].message.content;

        // 4. Auditoría y Almacenamiento (Requerimiento explícito)
        await models.HistorialIA.create({
            session_id: currentSession,
            input_usuario: pregunta,
            output_ia: respuesta,
            contexto_fuente: JSON.stringify(contextos.map(c => c.documento_id)), // Referencia para auditoría
            usuario_id: usuarioId // Vinculación con personal interno
        });

        return { respuesta, sessionId: currentSession };
    }
}

module.exports = ChatbotService;