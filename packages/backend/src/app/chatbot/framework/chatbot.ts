
import { ApEmbeddings } from '../embedings'
import { APLLM } from './llm'


type ChatbotAnswerContext = {
    settings: {
        prompt: string
    }
    input: string
    llm: APLLM
    embeddings: ApEmbeddings
}

class IChatbot {
    constructor(
        public readonly name: string,
        public readonly run: (ctx: ChatbotAnswerContext) => Promise<string>,
    ) { }
}

export const createChatbot = (request: {
    name: string
    run: (ctx: ChatbotAnswerContext) => Promise<string>
}) => {
    return new IChatbot(
        request.name,
        request.run,
    )
}
