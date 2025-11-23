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

    // Smart AI Logic with Enhanced Knowledge Base
    function getSmartAIResponse(input, context) {
        const lowerInput = input.toLowerCase();

        // Expanded Knowledge Base
        const knowledgeBase = [
            // Saudações e Boas-vindas
            {
                keywords: ['olá', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'alô'],
                response: 'Olá! 😊 Que bom te ver aqui! Estou pronta para te ajudar com qualquer dúvida sobre tecnologia. Pode perguntar sobre:<br><br>📱 <strong>WhatsApp</strong> (mensagens, áudios, chamadas)<br>🔒 <strong>Segurança</strong> (senhas, golpes, proteção)<br>🏛️ <strong>Gov.br e INSS</strong><br>💰 <strong>Pix e Internet Banking</strong><br>📧 <strong>E-mail</strong><br><br>O que você gostaria de aprender?',
                suggestions: ['Como criar uma senha forte?', 'Como usar o WhatsApp?', 'O que é Pix?']
            },

            // Segurança - Senhas
            {
                keywords: ['senha', 'forte', 'segura', 'criar senha', 'trocar senha'],
                response: '🔐 <strong>Como criar uma senha MUITO segura:</strong><br><br><strong>1.</strong> Use pelo menos 8 caracteres<br><strong>2.</strong> Misture letras maiúsculas (A, B, C)<br><strong>3.</strong> Letras minúsculas (a, b, c)<br><strong>4.</strong> Números (1, 2, 3)<br><strong>5.</strong> Símbolos (@, #, !, $)<br><br>❌ <strong>Evite:</strong><br>• Datas de aniversário<br>• Nomes de familiares<br>• Sequências (123456, abcdef)<br>• Palavras óbvias (senha123)<br><br>✅ <strong>Exemplo de senha forte:</strong> Maria@2024#Segura<br><br>💡 <strong>Dica importante:</strong> Anote suas senhas em um caderno que você guarda em local seguro. Nunca as compartilhe com ninguém!',
                suggestions: ['Como evitar golpes?', 'O que é verificação em duas etapas?', 'Onde guardar minhas senhas?']
            },

            // Segurança - Golpes
            {
                keywords: ['golpe', 'perigo', 'fraude', 'roubo', 'estranho', 'suspeito', 'falso'],
                response: '⚠️ <strong>ALERTA DE SEGURANÇA - Como se proteger de golpes:</strong><br><br>🚨 <strong>Sinais de GOLPE:</strong><br>• Mensagens pedindo dinheiro urgente<br>• Links suspeitos (ex: "clique aqui para ganhar")<br>• Pessoas se passando por banco ou governo<br>• Ofertas "boas demais para ser verdade"<br>• Pedidos de senha ou código do banco<br><br>✅ <strong>Como se proteger:</strong><br><strong>1.</strong> NUNCA envie dinheiro sem confirmar com a pessoa por telefone<br><strong>2.</strong> NUNCA clique em links de desconhecidos<br><strong>3.</strong> Bancos NUNCA pedem senha por mensagem<br><strong>4.</strong> Desconfie de urgência ("pague agora ou perde")<br><strong>5.</strong> Se tiver dúvida, peça ajuda a um familiar<br><br>📞 <strong>Em caso de golpe:</strong> Ligue imediatamente para seu banco e registre um boletim de ocorrência.',
                suggestions: ['Como identificar mensagem falsa?', 'O que fazer se clicar em link suspeito?', 'Como proteger meu WhatsApp?']
            },

            // Segurança - Verificação em Duas Etapas
            {
                keywords: ['verificação', 'duas etapas', 'autenticação', 'código', 'segurança whatsapp'],
                response: '🔐 <strong>Verificação em Duas Etapas do WhatsApp:</strong><br><br>Isso adiciona uma camada extra de segurança ao seu WhatsApp!<br><br><strong>Como ativar:</strong><br><strong>1.</strong> Abra o WhatsApp<br><strong>2.</strong> Toque nos 3 pontinhos (canto superior direito)<br><strong>3.</strong> Vá em "Configurações"<br><strong>4.</strong> Toque em "Conta"<br><strong>5.</strong> Escolha "Confirmação em duas etapas"<br><strong>6.</strong> Toque em "Ativar"<br><strong>7.</strong> Crie um PIN de 6 dígitos (que você vai lembrar!)<br><strong>8.</strong> Adicione seu e-mail (para recuperação)<br><br>✅ <strong>Benefício:</strong> Mesmo que alguém tente usar seu número, vai precisar do PIN!<br><br>💡 <strong>Dica:</strong> Escolha um PIN fácil de lembrar, mas difícil de adivinhar.',
                suggestions: ['Como criar uma senha segura?', 'O que fazer se esquecer o PIN?', 'Como proteger o celular?']
            },

            // WhatsApp - Básico
            {
                keywords: ['whatsapp', 'zap', 'mensagem', 'começar whatsapp', 'usar whatsapp'],
                response: '💬 <strong>Guia Completo do WhatsApp:</strong><br><br><strong>Funções Principais:</strong><br><br>📝 <strong>Enviar mensagens:</strong> Digite no campo inferior e toque no avião de papel<br>🎤 <strong>Áudios:</strong> Segure o microfone verde, fale e solte<br>📸 <strong>Fotos:</strong> Toque na câmera e escolha tirar foto ou enviar da galeria<br>📹 <strong>Vídeo chamada:</strong> Toque no ícone de câmera no topo<br>📞 <strong>Ligação:</strong> Toque no ícone de telefone<br>📍 <strong>Localização:</strong> Toque no clipe → Localização<br><br>💡 <strong>Quer aprender algo específico?</strong> Me pergunte sobre qualquer função!',
                suggestions: ['Como enviar áudio?', 'Como fazer chamada de vídeo?', 'Como criar um grupo?']
            },

            // WhatsApp - Áudios
            {
                keywords: ['áudio', 'audio', 'falar', 'gravar', 'microfone', 'voz'],
                response: '🎤 <strong>Como enviar áudios no WhatsApp:</strong><br><br><strong>Passo a passo detalhado:</strong><br><br><strong>1.</strong> Abra a conversa com a pessoa<br><strong>2.</strong> Encontre o ícone do <strong>microfone verde</strong> (canto inferior direito)<br><strong>3.</strong> <strong>Segure</strong> o microfone enquanto fala<br><strong>4.</strong> Fale sua mensagem com calma<br><strong>5.</strong> <strong>Solte o dedo</strong> para enviar<br><br>🔄 <strong>Cancelar áudio:</strong><br>Se não gostou do áudio, <strong>deslize o dedo para a esquerda</strong> antes de soltar!<br><br>🔒 <strong>Bloquear gravação (mãos livres):</strong><br>Enquanto segura o microfone, deslize para cima. Assim você pode gravar sem segurar!<br><br>💡 <strong>Dica:</strong> Fale perto do microfone e em ambiente silencioso para melhor qualidade.',
                suggestions: ['Como fazer chamada de vídeo?', 'Como enviar fotos?', 'Como criar grupo no WhatsApp?']
            },

            // WhatsApp - Chamadas de Vídeo
            {
                keywords: ['vídeo', 'video', 'chamada', 'videochamada', 'ver pessoa', 'ligar vídeo'],
                response: '📹 <strong>Como fazer Chamada de Vídeo no WhatsApp:</strong><br><br><strong>Passo a passo:</strong><br><br><strong>1.</strong> Abra a conversa com a pessoa<br><strong>2.</strong> Procure o ícone da <strong>câmera</strong> no topo da tela (ao lado do nome)<br><strong>3.</strong> Toque no ícone<br><strong>4.</strong> Aguarde a pessoa atender<br><br>📱 <strong>Durante a chamada:</strong><br>• Para <strong>desligar a câmera</strong>: toque no ícone da câmera<br>• Para <strong>desligar o microfone</strong>: toque no ícone do microfone<br>• Para <strong>encerrar</strong>: toque no botão vermelho<br><br>📶 <strong>Importante sobre Internet:</strong><br>✅ Use <strong>Wi-Fi</strong> sempre que possível<br>❌ Chamadas de vídeo gastam MUITA internet móvel (4G/5G)<br><br>💡 <strong>Dica:</strong> Se a imagem estiver travando, desligue a câmera e continue só no áudio!',
                suggestions: ['Como economizar internet?', 'Como enviar áudio?', 'Como compartilhar tela?']
            },

            // WhatsApp - Grupos
            {
                keywords: ['grupo', 'família', 'criar grupo', 'adicionar pessoa', 'grupo whatsapp'],
                response: '👥 <strong>Como criar um Grupo no WhatsApp:</strong><br><br><strong>Criar o grupo:</strong><br><strong>1.</strong> Toque nos <strong>3 pontinhos</strong> (canto superior direito)<br><strong>2.</strong> Escolha "<strong>Novo grupo</strong>"<br><strong>3.</strong> Selecione os <strong>contatos</strong> que quer adicionar<br><strong>4.</strong> Toque na <strong>seta verde</strong><br><strong>5.</strong> Dê um <strong>nome ao grupo</strong> (ex: Família Silva)<br><strong>6.</strong> Se quiser, adicione uma <strong>foto</strong><br><strong>7.</strong> Toque no ✓ (confirmar)<br><br>➕ <strong>Adicionar mais pessoas depois:</strong><br><strong>1.</strong> Abra o grupo<br><strong>2.</strong> Toque no nome do grupo (no topo)<br><strong>3.</strong> Role para baixo e toque em "Adicionar participantes"<br><br>⚙️ <strong>Configurações úteis:</strong><br>• Você pode escolher quem pode enviar mensagens<br>• Pode deixar apenas administradores enviarem mensagens<br>• Pode ativar mensagens temporárias<br><br>💡 <strong>Dica:</strong> Grupos são ótimos para organizar a família!',
                suggestions: ['Como sair de um grupo?', 'Como silenciar um grupo?', 'Como enviar mensagem para todos?']
            },

            // WhatsApp - Localização
            {
                keywords: ['localização', 'onde estou', 'endereço', 'mapa', 'local'],
                response: '📍 <strong>Como enviar sua Localização no WhatsApp:</strong><br><br><strong>Passo a passo:</strong><br><br><strong>1.</strong> Abra a conversa<br><strong>2.</strong> Toque no ícone do <strong>clipe de papel 📎</strong> (ao lado do campo de mensagem)<br><strong>3.</strong> Escolha "<strong>Localização</strong>"<br><strong>4.</strong> Você verá duas opções:<br><br>   📌 <strong>Localização em tempo real:</strong><br>   • A pessoa vê onde você está por 15min, 1h ou 8h<br>   • Útil quando está a caminho de algum lugar<br><br>   📍 <strong>Enviar sua localização atual:</strong><br>   • Envia apenas onde você está AGORA<br>   • A pessoa não acompanha se você se mover<br><br><strong>5.</strong> Toque em "Enviar"<br><br>💡 <strong>Uso prático:</strong> Excelente para avisar a família onde você está ou para marcar um ponto de encontro!<br><br>🔒 <strong>Segurança:</strong> Só compartilhe sua localização com pessoas de confiança.',
                suggestions: ['Como usar o Google Maps?', 'Como salvar um endereço?', 'Como chamar um Uber?']
            },

            // WhatsApp - Fotos e Vídeos
            {
                keywords: ['foto', 'imagem', 'enviar foto', 'galeria', 'câmera', 'tirar foto'],
                response: '📸 <strong>Como enviar Fotos e Vídeos no WhatsApp:</strong><br><br><strong>Método 1 - Tirar foto na hora:</strong><br><strong>1.</strong> Abra a conversa<br><strong>2.</strong> Toque no ícone da <strong>câmera</strong><br><strong>3.</strong> Tire a foto<br><strong>4.</strong> Toque em ✓ para enviar<br><br><strong>Método 2 - Enviar foto da galeria:</strong><br><strong>1.</strong> Toque no ícone da <strong>galeria</strong> (ao lado da câmera)<br><strong>2.</strong> Escolha a foto que quer enviar<br><strong>3.</strong> Você pode adicionar legenda, emoji ou desenhar<br><strong>4.</strong> Toque em enviar<br><br>📹 <strong>Para vídeos:</strong> O processo é o mesmo!<br><br>✨ <strong>Recursos extras:</strong><br>• <strong>Editar antes de enviar:</strong> Adicione texto, emoji, desenhos<br>• <strong>Várias fotos:</strong> Selecione múltiplas fotos de uma vez<br>• <strong>Qualidade:</strong> Toque em "qualidade HD" para melhor imagem<br><br>💡 <strong>Dica:</strong> Fotos em HD gastam mais internet!',
                suggestions: ['Como fazer backup das fotos?', 'Como baixar foto recebida?', 'Como enviar documento?']
            },

            // Gov.br e INSS
            {
                keywords: ['gov', 'inss', 'aposentadoria', 'governo', 'gov.br', 'cpf', 'identidade digital'],
                response: '🏛️ <strong>Guia Completo do Gov.br:</strong><br><br><strong>O que é o Gov.br?</strong><br>É sua <strong>identidade digital</strong> para acessar TODOS os serviços do governo pela internet!<br><br><strong>O que você pode fazer:</strong><br>✅ Consultar INSS e aposentadoria<br>✅ Ver seu CPF<br>✅ Acessar Carteira de Trabalho Digital<br>✅ Consultar título de eleitor<br>✅ Ver vacinas (Conecte SUS)<br>✅ Consultar FGTS<br>✅ Muito mais!<br><br>📝 <strong>Como criar sua conta Gov.br:</strong><br><strong>1.</strong> Acesse: <strong>gov.br/pt-br</strong><br><strong>2.</strong> Clique em "Entrar com gov.br"<br><strong>3.</strong> Escolha "Criar conta"<br><strong>4.</strong> Digite seu CPF<br><strong>5.</strong> Preencha os dados pedidos<br><strong>6.</strong> Crie uma senha forte<br><strong>7.</strong> Confirme seu e-mail ou telefone<br><br>🔑 <strong>Níveis de segurança:</strong><br>• Bronze (básico)<br>• Prata (intermediário)<br>• Ouro (máximo - permite mais serviços)<br><br>💡 <strong>Dica:</strong> Anote sua senha em local seguro!',
                suggestions: ['Como recuperar senha do Gov.br?', 'Como consultar INSS?', 'Como aumentar nível da conta?']
            },

            // INSS - Específico
            {
                keywords: ['extrato inss', 'benefício', 'consultar inss', 'meu inss', 'aposentado'],
                response: '💰 <strong>Como consultar seu INSS pelo celular:</strong><br><br><strong>Pelo aplicativo Meu INSS:</strong><br><br><strong>1.</strong> Baixe o app "<strong>Meu INSS</strong>" na loja do seu celular<br><strong>2.</strong> Abra o aplicativo<br><strong>3.</strong> Toque em "Entrar com gov.br"<br><strong>4.</strong> Digite seu CPF e senha do gov.br<br><strong>5.</strong> Pronto! Você terá acesso a:<br><br>📊 <strong>Serviços disponíveis:</strong><br>• Extrato de pagamento<br>• Carta de concessão<br>• Extrair imposto de renda<br>• Atualizar dados cadastrais<br>• Agendar perícia médica<br>• Simular aposentadoria<br>• Solicitar benefícios<br><br>📅 <strong>Ver quando cai o pagamento:</strong><br>Toque em "Extrato de Pagamento"<br><br>💡 <strong>Importante:</strong> Para fazer login, você PRECISA ter uma conta no Gov.br (é gratuito!).',
                suggestions: ['Como criar conta Gov.br?', 'Como emitir comprovante de pagamento?', 'Como fazer prova de vida?']
            },

            // Pix
            {
                keywords: ['pix', 'transferência', 'enviar dinheiro', 'banco', 'pagar'],
                response: '💰 <strong>Guia Completo do PIX:</strong><br><br><strong>O que é Pix?</strong><br>É uma forma de transferir dinheiro na HORA, qualquer dia e horário - até fim de semana e feriados!<br><br>📱 <strong>Como fazer um Pix:</strong><br><br><strong>1.</strong> Abra o aplicativo do seu <strong>banco</strong><br><strong>2.</strong> Procure por "<strong>Pix</strong>" ou "<strong>Transferir</strong>"<br><strong>3.</strong> Escolha "<strong>Enviar</strong>" ou "<strong>Transferir</strong>"<br><strong>4.</strong> Escolha como quer pagar:<br>   • Por <strong>CPF</strong> da pessoa<br>   • Por <strong>telefone</strong><br>   • Por <strong>e-mail</strong><br>   • Por <strong>chave aleatória</strong><br>   • Ou digitalizar <strong>QR Code</strong><br><strong>5.</strong> Digite o <strong>valor</strong><br><strong>6.</strong> ⚠️ <strong>MUITO IMPORTANTE:</strong> Confira o <strong>NOME</strong> de quem vai receber!<br><strong>7.</strong> Confirme com sua senha<br><br>🚨 <strong>DICAS DE SEGURANÇA:</strong><br>❌ NUNCA faça Pix para desconhecidos<br>❌ SEMPRE confira o nome antes de confirmar<br>❌ Desconfie de pessoas pedindo dinheiro urgente<br>✅ Se tiver dúvida, LIGUE para a pessoa e confirme<br><br>💡 Pix é instantâneo e NÃO TEM COMO DESFAZER!',
                suggestions: ['Como criar chave Pix?', 'O que fazer se cair em golpe?', 'Como receber Pix?']
            },

            // Pix - Chaves
            {
                keywords: ['chave pix', 'cadastrar pix', 'registrar pix', 'criar pix'],
                response: '🔑 <strong>Como cadastrar sua Chave Pix:</strong><br><br><strong>O que é chave Pix?</strong><br>É como um "apelido" para sua conta. Ao invés de passar agência e conta, você passa só sua chave (CPF, telefone, etc)<br><br><strong>Tipos de chave:</strong><br>📱 <strong>Telefone</strong> - seu número de celular<br>📧 <strong>E-mail</strong> - seu endereço de e-mail<br>🆔 <strong>CPF</strong> - seu CPF<br>🎲 <strong>Aleatória</strong> - uma sequência de números e letras gerada pelo banco<br><br>📝 <strong>Como cadastrar:</strong><br><strong>1.</strong> Abra o app do seu banco<br><strong>2.</strong> Vá em "<strong>Pix</strong>"<br><strong>3.</strong> Procure "<strong>Minhas chaves</strong>" ou "<strong>Cadastrar chave</strong>"<br><strong>4.</strong> Escolha qual tipo de chave quer usar<br><strong>5.</strong> Confirme com sua senha<br><br>💡 <strong>Dica:</strong> Você pode ter várias chaves! Eu recomendo cadastrar seu CPF para facilitar.',
                suggestions: ['Como fazer um Pix?', 'Como receber Pix?', 'Pix tem limite?']
            },

            // E-mail
            {
                keywords: ['email', 'e-mail', 'gmail', 'criar email', 'mensagem eletrônica'],
                response: '📧 <strong>Guia do E-mail para Iniciantes:</strong><br><br><strong>O que é e-mail?</strong><br>É como enviar uma carta, mas pela internet! Você pode enviar mensagens, fotos e documentos.<br><br>📝 <strong>Como criar um Gmail (Google):</strong><br><br><strong>1.</strong> Abra o navegador (Chrome, Safari, etc)<br><strong>2.</strong> Acesse: <strong>gmail.com</strong><br><strong>3.</strong> Toque em "<strong>Criar conta</strong>"<br><strong>4.</strong> Preencha:<br>   • Seu nome<br>   • Nome de usuário (será seu @gmail.com)<br>   • Senha forte<br><strong>5.</strong> Adicione seu telefone(importante para recuperação)<br><strong>6.</strong> Complete o cadastro<br><br>✉️ <strong>Como enviar um e-mail:</strong><br><strong>1.</strong> Clique em "<strong>Escrever</strong>" ou "+"<br><strong>2.</strong> No campo "<strong>Para</strong>": digite o e-mail da pessoa<br><strong>3.</strong> No "<strong>Assunto</strong>": escreva do que se trata<br><strong>4.</strong> Na área grande: escreva sua mensagem<br><strong>5.</strong> Clique em "<strong>Enviar</strong>"<br><br>📎 <strong>Anexar arquivo:</strong> Clique no ícone do clipe de papel<br><br>💡 <strong>Dica:</strong> Sempre confira o endereço do destinatário antes de enviar!',
                suggestions: ['Como anexar foto no e-mail?', 'Como ver e-mails recebidos?', 'O que é spam?']
            },

            // Internet Banking
            {
                keywords: ['banco', 'conta', 'saldo', 'extrato', 'aplicativo banco', 'internet banking'],
                response: '🏦 <strong>Como usar o Aplicativo do Banco:</strong><br><br><strong>Primeiro acesso:</strong><br><strong>1.</strong> Baixe o app do seu banco (Banco do Brasil, Caixa, Bradesco, etc)<br><strong>2.</strong> Abra o aplicativo<br><strong>3.</strong> Toque em "<strong>Primeiro acesso</strong>" ou "<strong>Não sou cliente</strong>" se já tem conta<br><strong>4.</strong> Digite sua <strong>agência</strong> e <strong>conta</strong><br><strong>5.</strong> Digite seu <strong>CPF</strong><br><strong>6.</strong> Crie uma <strong>senha</strong> para o app<br><strong>7.</strong> Siga as instruções de segurança<br><br>💼 <strong>O que você pode fazer:</strong><br>✅ Ver saldo e extrato<br>✅ Fazer Pix<br>✅ Pagar contas<br>✅ Fazer transferências<br>✅ Ver cartão de crédito<br>✅ Pegar empréstimo<br>✅ Investir dinheiro<br><br>🔒 <strong>Segurança:</strong><br>• NUNCA compartilhe sua senha<br>• Use biometria (digital) se tiver<br>• Desconfie de ligações pedindo dados<br>• Bancos NUNCA pedem senha por telefone<br><br>💡 <strong>Dica:</strong> Anote sua senha em local seguro em casa.',
                suggestions: ['Como fazer Pix?', 'Como pagar boleto?', 'Como ver extrato?']
            },

            // YouTube
            {
                keywords: ['youtube', 'vídeo youtube', 'assistir', 'ver vídeo'],
                response: '📺 <strong>Como usar o YouTube:</strong><br><br><strong>O que é?</strong><br>É o maior site de vídeos do mundo! Você pode assistir sobre QUALQUER assunto: receitas, músicas, tutoriais, filmes, etc.<br><br>▶️ <strong>Como assistir vídeos:</strong><br><br><strong>1.</strong> Abra o aplicativo <strong>YouTube</strong> (ícone vermelho com ▶️)<br><strong>2.</strong> Use a <strong>lupa 🔍</strong> para pesquisar (ex: "bolo de cenoura")<br><strong>3.</strong> Toque no vídeo que quer assistir<br><strong>4.</strong> Toque na tela para pausar ou continuar<br><br>🎬 <strong>Comandos úteis:</strong><br>• <strong>Pausar:</strong> toque na tela<br>• <strong>Avançar:</strong> arraste a barrinha na parte inferior<br>• <strong>Volume:</strong> use os botões laterais do celular<br>• <strong>Tela cheia:</strong> vire o celular de lado<br><br>💾 <strong>Salvar vídeo para ver depois:</strong><br>Toque em "<strong>Salvar</strong>" abaixo do vídeo<br><br>⚙️ <strong>Ajustar qualidade do vídeo:</strong><br>Toque nos 3 pontinhos → Qualidade → escolha a qualidade<br><br>💡 <strong>Dica:</strong> Use qualidade menor (360p) para economizar internet!',
                suggestions: ['Como inscrever em um canal?', 'Como baixar vídeo?', 'YouTube tem golpes?']
            },

            // Google/Pesquisar
            {
                keywords: ['google', 'pesquisar', 'buscar', 'procurar', 'internet', 'navegar'],
                response: '🔍 <strong>Como pesquisar no Google:</strong><br><br><strong>Passo a passo:</strong><br><br><strong>1.</strong> Abra o navegador (Chrome, Safari, Firefox)<br><strong>2.</strong> Na barra superior, digite o que quer procurar<br><strong>3.</strong> Toque em "Buscar" ou "Enter"<br><strong>4.</strong> Role para ver os resultados<br><strong>5.</strong> Toque no link azul do site que quer acessar<br><br>💡 <strong>Dicas para pesquisar melhor:</strong><br><br>✅ Seja específico: ao invés de "bolo", escreva "receita de bolo de chocolate"<br>✅ Use aspas para busca exata: "como fazer Pix"<br>✅ Adicione sua cidade: "médico cardiologista em São Paulo"<br><br>🎤 <strong>Pesquisa por voz:</strong><br>Toque no ícone do <strong>microfone</strong> e fale o que quer procurar<br><br>🖼️ <strong>Pesquisa por imagem:</strong><br>Toque no ícone da <strong>câmera</strong> para pesquisar usando uma foto<br><br>⚠️ <strong>Segurança:</strong><br>Cuidado com os primeiros resultados marcados como "Anúncio" - eles são pagos!',
                suggestions: ['Como saber se site é seguro?', 'O que é navegador?', 'Como limpar histórico?']
            },

            // Agradecimentos
            {
                keywords: ['obrigado', 'obrigada', 'valeu', 'agradeço', 'muito obrigado', 'thanks'],
                response: 'De nada! 😊 Fico muito feliz em ajudar você!<br><br>Lembre-se: não existe pergunta boba quando se trata de aprender. Estou sempre aqui, 24 horas por dia, pronta para tirar suas dúvidas quantas vezes precisar!<br><br>💬 Tem mais alguma dúvida?',
                suggestions: ['Como usar o WhatsApp?', 'Dicas de segurança', 'Como acessar o Gov.br?']
            },

            // Clara/Ajuda
            {
                keywords: ['ajuda', 'me ajuda', 'não sei', 'não entendi', 'tá difícil'],
                response: 'Claro que vou te ajudar! 😊 Estou aqui exatamente para isso!<br><br>Pode ficar tranquilo(a) e me contar: qual é sua dúvida ou dificuldade? <br><br>💡 <strong>Assuntos em que posso ajudar:</strong><br><br>📱 <strong>WhatsApp:</strong> mensagens, áudios, chamadas, grupos<br>🔒 <strong>Segurança:</strong> senhas, golpes, proteção<br>🏛️ <strong>Gov.br e INSS:</strong> como acessar e usar<br>💰 <strong>Pix:</strong> como enviar e receber dinheiro<br>📧 <strong>E-mail:</strong> criar e usar<br>🏦 <strong>Banco:</strong> app do banco, extrato, pagamentos<br>📺 <strong>YouTube:</strong> assistir vídeos<br>🔍 <strong>Google:</strong> pesquisar informações<br><br>É só me perguntar! Vou explicar com calma e paciência. 💙',
                suggestions: ['Como criar senha forte?', 'Como enviar áudio no WhatsApp?', 'Como fazer Pix?']
            }
        ];

        // Context-aware boost
        if (context === 'seguranca' && (lowerInput.includes('ajuda') || lowerInput.includes('dica') || lowerInput.includes('não sei'))) {
            return '🔒 <strong>Dicas Essenciais de Segurança:</strong><br><br><strong>1. Senhas:</strong> Use senhas fortes e diferentes para cada serviço<br><strong>2. Golpes:</strong> Nunca clique em links suspeitos ou envie dinheiro para desconhecidos<br><strong>3. Dados pessoais:</strong> Não compartilhe CPF, senhas ou dados bancários por mensagem<br><strong>4. Verificação em duas etapas:</strong> Ative no WhatsApp e e-mail<br><strong>5. Dúvidas:</strong> Quando receber algo estranho, peça ajuda a um familiar antes de agir<br><br>💡 Quer que eu explique algum desses tópicos em detalhes?';
        }

        if (context === 'whatsapp' && (lowerInput.includes('ajuda') || lowerInput.includes('começar') || lowerInput.includes('aprender'))) {
            return '💬 <strong>Principais funções do WhatsApp:</strong><br><br>🎤 <strong>Áudios:</strong> Segure o microfone e fale<br>📹 <strong>Vídeo chamada:</strong> Toque no ícone da câmera<br>📸 <strong>Fotos:</strong> Toque na câmera para tirar ou enviar da galeria<br>👥 <strong>Grupos:</strong> Reúna a família em um só lugar<br>📍 <strong>Localização:</strong> Mostre onde você está<br><br>💡 Sobre qual dessas funções você quer aprender mais?';
        }

        if (context === 'gov' && (lowerInput.includes('ajuda') || lowerInput.includes('começar') || lowerInput.includes('o que fazer'))) {
            return '🏛️ <strong>Primeiros passos no Gov.br:</strong><br><br><strong>1.</strong> Criar sua conta no site gov.br<br><strong>2.</strong> Confirmar seu e-mail e telefone<br><strong>3.</strong> Aumentar o nível de confiança da conta (Bronze → Prata → Ouro)<br><strong>4.</strong> Baixar o app "Meu INSS" se precisar consultar benefícios<br><br>Com a conta criada, você pode:<br>✅ Consultar CPF<br>✅ Ver carteira de trabalho<br>✅ Acessar Conecte SUS (vacinas)<br>✅ Consultar INSS<br>✅ E muito mais!<br><br>💡 Quer que eu explique como criar sua conta passo a passo?';
        }

        // Search for best match with scoring
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
            let response = bestMatch.response;

            // Add suggestions if available
            if (bestMatch.suggestions && bestMatch.suggestions.length > 0) {
                response += '<br><br>❓ <strong>Você também pode perguntar:</strong><br>';
                response += bestMatch.suggestions.map(s => `• ${s}`).join('<br>');
            }

            return response;
        }

        // Enhanced fallback with suggestions
        return '🤔 Hmm, ainda estou aprendendo sobre isso...<br><br>Mas posso te ajudar com vários assuntos! Tente perguntar sobre:<br><br>📱 <strong>WhatsApp:</strong><br>• "Como enviar áudio?"<br>• "Como fazer chamada de vídeo?"<br>• "Como criar um grupo?"<br><br>🔒 <strong>Segurança:</strong><br>• "Como criar senha forte?"<br>• "Como evitar golpes?"<br>• "O que é verificação em duas etapas?"<br><br>🏛️ <strong>Gov.br e INSS:</strong><br>• "Como criar conta no Gov.br?"<br>• "Como consultar INSS?"<br><br>💰 <strong>Pix e Banco:</strong><br>• "Como fazer Pix?"<br>• "Como usar app do banco?"<br><br>📧 <strong>Outros:</strong><br>• "Como criar e-mail?"<br>• "Como pesquisar no Google?"<br>• "Como usar YouTube?"<br><br>💡 É só digitar sua pergunta!';
    }
});
