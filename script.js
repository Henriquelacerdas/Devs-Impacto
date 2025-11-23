document.addEventListener('DOMContentLoaded', () => {
    console.log('IncluIA carregado com sucesso!');

    // Smooth Scrolling
    window.scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Chat Interface Logic
    const chatBody = document.getElementById('chat-body');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    let isTyping = false;

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        // Allow HTML in bot messages for links/formatting
        if (sender === 'bot') {
            messageDiv.innerHTML = `<p>${text}</p>`;
        } else {
            const p = document.createElement('p');
            p.textContent = text;
            messageDiv.appendChild(p);
        }

        chatBody.appendChild(messageDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTypingIndicator() {
        if (isTyping) return;
        isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot', 'typing-indicator');
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        chatBody.appendChild(typingDiv);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.remove();
        }
        isTyping = false;
    }

    // Context-Aware Welcome Message
    const pageTitle = document.title.toLowerCase();
    let welcomeMessage = 'Olá! Eu sou a Clara. Como posso te ajudar a usar a internet hoje?';
    let currentContext = 'geral';

    if (pageTitle.includes('segurança')) {
        welcomeMessage = 'Olá! Sou a Clara. Tem alguma dúvida sobre golpes, senhas ou segurança?';
        currentContext = 'seguranca';
    } else if (pageTitle.includes('whatsapp')) {
        welcomeMessage = 'Oi! Quer ajuda para mandar áudios ou fazer chamadas no WhatsApp?';
        currentContext = 'whatsapp';
    } else if (pageTitle.includes('serviços') || pageTitle.includes('gov')) {
        welcomeMessage = 'Olá! Posso te ajudar a acessar o Gov.br ou outros serviços públicos.';
        currentContext = 'gov';
    }

    // Set initial message
    const initialBotMessage = document.querySelector('.message.bot p');
    if (initialBotMessage) {
        initialBotMessage.textContent = welcomeMessage;
    }

    function handleUserMessage() {
        const text = userInput.value.trim();
        if (text === '') return;

        // Add user message
        addMessage(text, 'user');
        userInput.value = '';

        // Simulate AI thinking
        showTypingIndicator();

        // Simulate network delay based on response length
        setTimeout(() => {
            removeTypingIndicator();
            const response = getSmartAIResponse(text, currentContext);
            addMessage(response, 'bot');
        }, 1500);
    }

    // Event Listeners for Chat
    sendBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Smart AI Logic
    function getSmartAIResponse(input, context) {
        const lowerInput = input.toLowerCase();

        // Knowledge Base
        const knowledgeBase = [
            {
                keywords: ['olá', 'oi', 'bom dia', 'boa tarde', 'boa noite'],
                response: 'Olá! Como posso ajudar você hoje? Se quiser, pode escolher um tema: Segurança, WhatsApp ou Gov.br.'
            },
            {
                keywords: ['senha', 'forte', 'segura'],
                response: 'Para criar uma senha forte, misture letras maiúsculas, minúsculas, números e símbolos (como @, #). Evite usar datas de aniversário ou nomes de familiares. Anote em um caderno seguro se precisar!'
            },
            {
                keywords: ['golpe', 'perigo', 'fraude', 'roubo', 'estranho'],
                response: 'Muito cuidado! Se receber mensagens pedindo dinheiro ou dados pessoais, desconfie. Nunca clique em links que você não conhece. Na dúvida, peça ajuda a alguém de confiança antes de clicar.'
            },
            {
                keywords: ['whatsapp', 'zap', 'mensagem'],
                response: 'O WhatsApp é ótimo! Você pode mandar áudios segurando o microfone, ou fazer chamadas de vídeo tocando no ícone da câmera. Quer que eu explique como criar um grupo?'
            },
            {
                keywords: ['gov', 'inss', 'aposentadoria', 'governo'],
                response: 'O Gov.br é sua identidade digital. Com ele você acessa o INSS e outros serviços. Para criar, você precisa do CPF e seguir os passos na tela. Quer ajuda para recuperar sua senha do Gov?'
            },
            {
                keywords: ['áudio', 'audio', 'falar'],
                response: 'Para mandar áudio no WhatsApp: abra a conversa, segure o botão do microfone (canto inferior direito), fale sua mensagem e solte para enviar. Se não gostar, deslize para a esquerda para cancelar.'
            },
            {
                keywords: ['vídeo', 'video', 'chamada'],
                response: 'Para fazer uma chamada de vídeo: abra a conversa com a pessoa e toque no ícone de câmera lá no topo. Lembre-se de estar conectado no Wi-Fi para não gastar seus dados móveis!'
            },
            {
                keywords: ['localização', 'onde estou'],
                response: 'Você pode enviar sua localização no WhatsApp tocando no clipe de papel (anexo) e depois em "Localização". É muito útil para avisar a família onde você está.'
            },
            {
                keywords: ['grupo', 'família'],
                response: 'Para criar um grupo no WhatsApp: toque nos três pontinhos (menu), escolha "Novo Grupo", selecione as pessoas que quer adicionar e dê um nome ao grupo. É ótimo para reunir a família!'
            },
            {
                keywords: ['pix', 'banco', 'transferência'],
                response: 'O Pix é muito rápido, mas exige atenção. Sempre confira o nome de quem vai receber o dinheiro antes de confirmar. Nunca faça Pix para estranhos que pedem dinheiro por mensagem.'
            },
            {
                keywords: ['facebook', 'instagram', 'rede social'],
                response: 'As redes sociais são divertidas para ver fotos da família. Lembre-se de deixar seu perfil "Privado" para que apenas amigos vejam suas fotos. Quer ajuda para configurar isso?'
            },
            {
                keywords: ['obrigado', 'obrigada', 'valeu'],
                response: 'De nada! Fico muito feliz em ajudar. Se tiver mais dúvidas, é só perguntar. Estou aqui para isso!'
            }
        ];

        // Context Boost
        // If the user is on a specific page, prioritize related keywords slightly or add specific advice
        if (context === 'seguranca' && (lowerInput.includes('ajuda') || lowerInput.includes('dica'))) {
            return 'Como você está na página de Segurança, minha principal dica é: nunca compartilhe suas senhas e ative a verificação em duas etapas no WhatsApp.';
        }

        // Search for best match
        let bestMatch = null;
        let maxMatches = 0;

        for (const item of knowledgeBase) {
            let matches = 0;
            for (const keyword of item.keywords) {
                if (lowerInput.includes(keyword)) {
                    matches++;
                }
            }
            if (matches > maxMatches) {
                maxMatches = matches;
                bestMatch = item;
            }
        }

        if (bestMatch) {
            return bestMatch.response;
        }

        // Fallback
        return 'Desculpe, ainda estou aprendendo e não entendi muito bem. Tente perguntar sobre: <br><br>• <strong>Senhas e Segurança</strong><br>• <strong>WhatsApp e Áudios</strong><br>• <strong>Gov.br e INSS</strong>';
    }
});
