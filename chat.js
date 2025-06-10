(function(){const TEXTOS={iniciarChat:"Iniciar Chat",whatsapp:"WhatsApp",correo:"Correo electrónico",llamada:"Llamar por teléfono",escribirMensaje:"Escribe tu mensaje aqui...",atencionCliente:"Atención al Cliente",error:"Error:",hola:"Hola 👋, ¿Cómo podemos ayudarte?",emojis:"Emojis",noDisponible:"Lo sentimos, en este momento no podemos atender por chat. Por favor, intenta más tarde o utiliza otro canal de comunicación."};const defaultConfig={branding:{logo:"",name:"",welcomeText:"",responseTimeText:"",poweredBy:{text:"",link:"#"}},style:{primaryColor:"",secondaryColor:"",position:"right",backgroundColor:"#ffffff",fontColor:"#333333",animation:"fadeInScale",animationDuration:"0.5s",animationDelay:"0s",iconSize:"60px",darkMode:{enabled:false}},contact:{chat:{enabled:true,webhook:{url:"",route:""}},whatsapp:{enabled:false,number:""},email:{enabled:false,address:""},phone:{enabled:false,number:""}}};const config=window.ChatConfig?{branding:{...defaultConfig.branding,...window.ChatConfig.branding},style:{...defaultConfig.style,...window.ChatConfig.style},contact:{chat:{enabled:window.ChatConfig.contact?.chat?.enabled??defaultConfig.contact.chat.enabled,webhook:{...defaultConfig.contact.chat.webhook,...window.ChatConfig.contact?.chat?.webhook}},whatsapp:{...defaultConfig.contact.whatsapp,...window.ChatConfig.contact?.whatsapp},email:{...defaultConfig.contact.email,...window.ChatConfig.contact?.email},phone:{...defaultConfig.contact.phone,...window.ChatConfig.contact?.phone}}}:defaultConfig;const styles=`
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, ${config.style.primaryColor});
            --chat--color-secondary: var(--n8n-chat-secondary-color, ${config.style.secondaryColor});
            --chat--color-background: var(--n8n-chat-background-color, ${config.style.backgroundColor});
            --chat--color-font: var(--n8n-chat-font-color, ${config.style.fontColor});
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .n8n-chat-widget.dark-mode {
            --chat--color-primary: ${config.style.darkMode?.primaryColor||"#a67fff"};
            --chat--color-secondary: ${config.style.darkMode?.secondaryColor||"#8b5fe6"};
            --chat--color-background: ${config.style.darkMode?.backgroundColor||"#1a1a1a"};
            --chat--color-font: ${config.style.darkMode?.fontColor||"#ffffff"};
        }

        .n8n-chat-widget.dark-mode .chat-container {
            background-color: ${config.style.darkMode?.backgroundColor||"#1a1a1a"};
            border-color: rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .brand-header {
            border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .chat-message.bot {
            background-color: #2a2a2a;
            color: ${config.style.darkMode?.fontColor||"#ffffff"};
        }

        .n8n-chat-widget.dark-mode .chat-input {
            background-color: ${config.style.darkMode?.backgroundColor||"#1a1a1a"};
            border-top-color: rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .chat-input textarea {
            background-color: #2a2a2a;
            color: ${config.style.darkMode?.fontColor||"#ffffff"};
            border-color: rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .n8n-chat-widget.dark-mode .theme-toggle {
            color: ${config.style.darkMode?.fontColor||"#ffffff"};
        }

        /* Sobrescribir colores hardcodeados en modo oscuro */
        .n8n-chat-widget.dark-mode .chat-container {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .brand-header {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .n8n-chat-widget.dark-mode .new-chat-btn {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .n8n-chat-widget.dark-mode .new-chat-btn:hover {
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }

        .n8n-chat-widget.dark-mode .chat-message.user {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .n8n-chat-widget.dark-mode .chat-message.bot {
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .n8n-chat-widget.dark-mode .chat-loader {
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        /* Estilos para la barra de scroll en modo oscuro */
        .n8n-chat-widget.dark-mode .chat-messages::-webkit-scrollbar {
            width: 8px;
        }

        .n8n-chat-widget.dark-mode .chat-messages::-webkit-scrollbar-track {
            background: ${config.style.darkMode?.backgroundColor||"#1a1a1a"};
        }

        .n8n-chat-widget.dark-mode .chat-messages::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 4px;
        }

        .n8n-chat-widget.dark-mode .chat-messages::-webkit-scrollbar-thumb:hover {
            background: #444;
        }

        /* Estilos para la barra de scroll en modo claro */
        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 8px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: #f0f0f0;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb:hover {
            background: #999;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 99999;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            font-family: inherit;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            transform: translateY(20px);
            visibility: hidden;
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
        }
        
        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 300px;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s, box-shadow 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(133, 79, 255, 0.4);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            border-radius: 16px;
            border: none;
        }

        .n8n-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 16px;
        }

        .n8n-chat-widget .chat-loader {
            display: none;
            align-self: flex-start;
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .chat-loader.active {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .n8n-chat-widget .chat-loader-dots {
            display: flex;
            gap: 4px;
        }

        .n8n-chat-widget .chat-loader-dot {
            width: 8px;
            height: 8px;
            background: var(--chat--color-primary);
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out;
        }

        .n8n-chat-widget .chat-loader-dot:nth-child(1) { animation-delay: -0.32s; }
        .n8n-chat-widget .chat-loader-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input-buttons {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 12px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            outline: none;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            border-color: var(--chat--color-primary);
            box-shadow: 0 2px 8px rgba(133, 79, 255, 0.15);
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .emoji-button {
            background: none;
            color: var(--chat--color-primary);
            border: none;
            border-radius: 12px;
            padding: 0;
            cursor: pointer;
            transition: transform 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
        }

        .n8n-chat-widget .emoji-button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-input button {
            background: none;
            color: var(--chat--color-primary);
            border: none;
            border-radius: 12px;
            padding: 0;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            font-family: inherit;
            font-weight: 500;
            box-shadow: none;
            display: none;
        }

        .n8n-chat-widget .send-icon {
            width: 24px;
            height: 24px;
            fill: var(--chat--color-primary);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: var(--chat-icon-size, 60px);
            height: var(--chat-icon-size, 60px);
            border-radius: calc(var(--chat-icon-size, 60px) / 2);
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            z-index: 99998;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            animation: var(--chat-toggle-animation) var(--chat-toggle-animation-duration) var(--chat-toggle-animation-delay) ease-out forwards;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        @keyframes fadeInScale {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes slideInRight {
            0% {
                opacity: 0;
                transform: translateX(100px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInLeft {
            0% {
                opacity: 0;
                transform: translateX(-100px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 0.9;
                transform: scale(1.1);
            }
            80% {
                opacity: 1;
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes rotateIn {
            0% {
                opacity: 0;
                transform: rotate(-180deg) scale(0.3);
            }
            100% {
                opacity: 1;
                transform: rotate(0) scale(1);
            }
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .chat-container {
                width: 100%;
                height: 100%;
                bottom: 0;
                right: 0;
                left: 0;
                top: 0;
                border-radius: 0;
            }

            .n8n-chat-widget .chat-toggle {
                bottom: 10px;
                right: 10px;
                width: calc(var(--chat-icon-size, 60px) * 0.8);
                height: calc(var(--chat-icon-size, 60px) * 0.8);
                border-radius: calc(var(--chat-icon-size, 60px) * 0.4);
            }
            
            .n8n-chat-widget .emoji-button {
                display: none !important; /* Ocultar botón de emojis en dispositivos móviles */
            }
        }

        .n8n-chat-widget .emoji-panel {
            position: absolute;
            bottom: 80px;
            left: 0;
            right: 0;
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 0;
            display: none;
            flex-direction: column;
            width: 100%;
            max-height: 300px;
            z-index: 100000;
            transform-origin: bottom center;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            transform: translateY(20px) scale(0.95);
            opacity: 0;
        }

        .n8n-chat-widget .emoji-panel.active {
            display: flex;
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        @keyframes emojiPanelIn {
            0% {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes emojiPanelOut {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
        }

        .n8n-chat-widget .emoji-panel.active {
            display: flex;
            animation: emojiPanelIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .n8n-chat-widget .emoji-panel.closing {
            display: flex;
            animation: emojiPanelOut 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .n8n-chat-widget .emoji-content {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
            gap: 4px;
            padding: 12px;
            overflow-y: auto;
            overflow-x: hidden;
            max-height: 220px;
            order: 1;
        }

        .n8n-chat-widget .emoji-categories {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            padding: 8px;
            background: rgba(133, 79, 255, 0.05);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            border-radius: 0 0 12px 12px;
            position: sticky;
            bottom: 0;
            z-index: 2;
            order: 2;
            justify-content: center;
            overflow-x: hidden;
        }

        .n8n-chat-widget .emoji-category {
            cursor: pointer;
            padding: 6px;
            border-radius: 6px;
            transition: all 0.2s;
            font-size: 16px;
        }

        .n8n-chat-widget .emoji-category:hover {
            background-color: rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .emoji-category.active {
            background-color: rgba(133, 79, 255, 0.2);
            transform: scale(1.1);
        }

        .n8n-chat-widget .emoji-item {
            cursor: pointer;
            font-size: 18px;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            transition: background-color 0.2s;
            padding: 4px;
            min-width: 32px;
            min-height: 32px;
        }

        .n8n-chat-widget .emoji-item:hover {
            background-color: rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .emoji-content::-webkit-scrollbar {
            width: 6px;
        }

        .n8n-chat-widget .emoji-content::-webkit-scrollbar-track {
            background: transparent;
        }

        .n8n-chat-widget .emoji-content::-webkit-scrollbar-thumb {
            background: rgba(133, 79, 255, 0.2);
            border-radius: 3px;
        }

        .n8n-chat-widget .contact-buttons-row {
            display: flex;
            gap: 8px;
            margin-top: 12px;
            justify-content: center;
        }

        .n8n-chat-widget .contact-button {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            cursor: pointer;
            border: none;
            color: white;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .n8n-chat-widget .contact-button:hover {
            transform: translateY(-2px);
        }

        .n8n-chat-widget .contact-button.whatsapp {
            background: #128C7E;
        }

        .n8n-chat-widget .contact-button.email {
            background: #D44638;
        }

        .n8n-chat-widget .contact-button.phone {
            background: #4CAF50;
        }

        .n8n-chat-widget .contact-button svg {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .theme-toggle {
            position: absolute;
            right: 50px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 20px;
            opacity: 0.8;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            z-index: 100000;
        }

        .n8n-chat-widget .theme-toggle:hover {
            opacity: 1;
            background: rgba(133, 79, 255, 0.1);
            transform: translateY(-50%) scale(1.1);
        }

        .n8n-chat-widget .theme-icon {
            width: 20px;
            height: 20px;
            transition: transform 0.3s ease;
        }

        .n8n-chat-widget.dark-mode .theme-icon {
            fill: ${config.style.darkMode?.fontColor||"#ffffff"};
        }

        .n8n-chat-widget .theme-toggle:hover .theme-icon {
            transform: rotate(180deg);
        }

        .n8n-chat-widget .theme-icon.light {
            display: block;
        }

        .n8n-chat-widget .theme-icon.dark {
            display: none;
        }

        .n8n-chat-widget.dark-mode .theme-icon.light {
            display: none;
        }

        .n8n-chat-widget.dark-mode .theme-icon.dark {
            display: block;
        }

        .n8n-chat-widget .resize-button {
            position: absolute;
            right: 90px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: nwse-resize;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 20px;
            opacity: 0.8;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            z-index: 1001;
        }

        .n8n-chat-widget .resize-button:hover {
            opacity: 1;
            background: rgba(133, 79, 255, 0.1);
            transform: translateY(-50%) scale(1.1);
        }

        .n8n-chat-widget .resize-button svg {
            width: 16px;
            height: 16px;
        }

        .n8n-chat-widget.dark-mode .resize-button {
            color: ${config.style.darkMode?.fontColor||"#ffffff"};
        }

        @media (max-width: 768px) {
            .n8n-chat-widget .resize-button {
                display: none;
            }
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::-webkit-scrollbar {
            width: 8px;
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::-webkit-scrollbar-track {
            background: #2a2a2a;
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::-webkit-scrollbar-thumb {
            background: #444;
            border-radius: 4px;
        }

        .n8n-chat-widget.dark-mode .chat-input textarea::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        .n8n-chat-widget .chat-input textarea::-webkit-scrollbar {
            width: 8px;
        }

        .n8n-chat-widget .chat-input textarea::-webkit-scrollbar-track {
            background: #f0f0f0;
        }

        .n8n-chat-widget .chat-input textarea::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
        }

        .n8n-chat-widget .chat-input textarea::-webkit-scrollbar-thumb:hover {
            background: #999;
        }
    `;const fontLink=document.createElement("link");fontLink.rel="stylesheet";fontLink.href="https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css";document.head.appendChild(fontLink);const styleSheet=document.createElement("style");styleSheet.textContent=styles;document.head.appendChild(styleSheet);if(window.N8NChatWidgetInitialized)return;window.N8NChatWidgetInitialized=true;let currentSessionId="";let chatHistory=[];function saveChatHistory(){localStorage.setItem("chatHistory",JSON.stringify(chatHistory));localStorage.setItem("currentSessionId",currentSessionId)}function loadChatHistory(){const savedHistory=localStorage.getItem("chatHistory");const savedSessionId=localStorage.getItem("currentSessionId");if(savedHistory&&savedSessionId){chatHistory=JSON.parse(savedHistory);currentSessionId=savedSessionId;return true}return false}function clearChatHistory(){chatHistory=[];localStorage.removeItem("chatHistory");localStorage.removeItem("currentSessionId")}function generateUUID(){return crypto.randomUUID()}function startNewConversation(newChat=false){if(newChat){clearChatHistory();currentSessionId=generateUUID()}else if(!loadChatHistory()){currentSessionId=generateUUID()}const data=[{action:"loadPreviousSession",sessionId:currentSessionId,route:config.contact.chat.webhook.route,metadata:{userId:""}}];const brandHeader=chatContainer.querySelector(".brand-header");const newConversation=chatContainer.querySelector(".new-conversation");brandHeader.classList.add("fade-out");newConversation.classList.add("fade-out");setTimeout(()=>{brandHeader.style.display="none";newConversation.style.display="none";chatInterface.classList.add("fade-in");chatInterface.classList.add("active");if(chatHistory.length>0&&!newChat){chatHistory.forEach(msg=>{const messageDiv=document.createElement("div");messageDiv.className=`chat-message ${msg.type}`;messageDiv.innerHTML=msg.content;messagesContainer.appendChild(messageDiv)});messagesContainer.scrollTop=messagesContainer.scrollHeight}else{fetch(config.contact.chat.webhook.url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}).then(response=>{if(!response.ok){throw new Error("Error en la respuesta de la API")}return response.json()}).then(responseData=>{const botMessageDiv=document.createElement("div");botMessageDiv.className="chat-message bot";botMessageDiv.innerHTML=`
                    <div style="display: flex; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                        </svg>
                        <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${TEXTOS.atencionCliente}</strong>
                    </div>
                    <span>${Array.isArray(responseData)?responseData[0].output:responseData.output}</span>
                    <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                        <span>${(new Date).toLocaleDateString([],{year:"2-digit",month:"2-digit",day:"2-digit"})} · ${(new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                    </div>
                `;messagesContainer.appendChild(botMessageDiv);messagesContainer.scrollTop=messagesContainer.scrollHeight;chatHistory.push({type:"bot",content:botMessageDiv.innerHTML});saveChatHistory()}).catch(error=>{console.error("Error:",error);const errorMessageDiv=document.createElement("div");errorMessageDiv.className="chat-message bot";errorMessageDiv.innerHTML=`
                    <div style="display: flex; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                        </svg>
                        <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${TEXTOS.atencionCliente}</strong>
                    </div>
                    <span>${TEXTOS.noDisponible}</span>
                    <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                        <span>${(new Date).toLocaleDateString([],{year:"2-digit",month:"2-digit",day:"2-digit"})} · ${(new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                    </div>
                `;messagesContainer.appendChild(errorMessageDiv);messagesContainer.scrollTop=messagesContainer.scrollHeight;chatHistory.push({type:"bot",content:errorMessageDiv.innerHTML});saveChatHistory()})}},300)}function generateContactButtonsHTML(){let mainButtonHTML="";let contactButtonsHTML="";if(config.contact.chat.enabled){mainButtonHTML=`
            <button class="new-chat-btn chat-button">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                ${TEXTOS.iniciarChat}
            </button>
            <p class="response-text">${config.branding.responseTimeText}</p>`}contactButtonsHTML='<div class="contact-buttons-row">';if(config.contact.whatsapp.enabled&&config.contact.whatsapp.number){contactButtonsHTML+=`
            <button class="contact-button whatsapp" onclick="window.open('https://wa.me/${config.contact.whatsapp.number}', '_blank')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
            </button>`}if(config.contact.email.enabled&&config.contact.email.address){contactButtonsHTML+=`
            <button class="contact-button email" onclick="window.open('mailto:${config.contact.email.address}', '_blank')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                </svg>
            </button>`}if(config.contact.phone.enabled&&config.contact.phone.number){contactButtonsHTML+=`
            <button class="contact-button phone" onclick="window.open('tel:${config.contact.phone.number}', '_blank')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                </svg>
            </button>`}contactButtonsHTML+="</div>";const hasContactButtons=config.contact.whatsapp.enabled||config.contact.email.enabled||config.contact.phone.enabled;return mainButtonHTML+(hasContactButtons?contactButtonsHTML:"")}const widgetContainer=document.createElement("div");widgetContainer.className="n8n-chat-widget";widgetContainer.style.setProperty("--n8n-chat-primary-color",config.style.primaryColor);widgetContainer.style.setProperty("--n8n-chat-secondary-color",config.style.secondaryColor);widgetContainer.style.setProperty("--n8n-chat-background-color",config.style.backgroundColor);widgetContainer.style.setProperty("--n8n-chat-font-color",config.style.fontColor);widgetContainer.style.setProperty("--chat-toggle-animation",config.style.animation);widgetContainer.style.setProperty("--chat-toggle-animation-duration",config.style.animationDuration);widgetContainer.style.setProperty("--chat-toggle-animation-delay",config.style.animationDelay);widgetContainer.style.setProperty("--chat-icon-size",config.style.iconSize);const chatContainer=document.createElement("div");chatContainer.className=`chat-container${config.style.position==="left"?" position-left":""}`;const newConversationHTML=`
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <span>${config.branding.name}</span>
            <button class="theme-toggle" title="Cambiar tema">
                <svg class="theme-icon light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                    </svg>
                    <svg class="theme-icon dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                    </svg>
                </button>
                <button class="resize-button" title="Redimensionar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>
                    </svg>
                </button>
                <button class="close-button">&times;</button>
            </div>
            <div class="new-conversation">
                <h2 class="welcome-text">${TEXTOS.hola}</h2>
                ${generateContactButtonsHTML()}
            </div>
        </div>
    `;const chatInterfaceHTML=`
        <div class="chat-interface">
            <div class="brand-header">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <span>${config.branding.name}</span>
                <button class="theme-toggle" title="Cambiar tema">
                    <svg class="theme-icon light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                    </svg>
                    <svg class="theme-icon dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                    </svg>
                </button>
                <button class="resize-button" title="Redimensionar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>
                    </svg>
                </button>
                <button class="close-button">&times;</button>
            </div>
            <div class="chat-messages">
                <div class="chat-loader">
                    <div class="chat-loader-dots">
                        <div class="chat-loader-dot"></div>
                        <div class="chat-loader-dot"></div>
                        <div class="chat-loader-dot"></div>
                    </div>
                </div>
            </div>
            <div class="emoji-panel">
                <div class="emoji-categories">
                    <div class="emoji-category active" data-category="frequent">😀</div>
                    <div class="emoji-category" data-category="smileys">😊</div>
                    <div class="emoji-category" data-category="people">👍</div>
                    <div class="emoji-category" data-category="animals">🐱</div>
                    <div class="emoji-category" data-category="food">🍔</div>
                    <div class="emoji-category" data-category="travel">✈️</div>
                    <div class="emoji-category" data-category="activities">⚽</div>
                    <div class="emoji-category" data-category="objects">💡</div>
                    <div class="emoji-category" data-category="symbols">❤️</div>
                    <div class="emoji-category" data-category="flags">🏁</div>
                </div>
                <div class="emoji-content"></div>
            </div>
            <div class="chat-input">
                <div class="chat-input-buttons">
                    <button type="button" class="emoji-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="send-icon">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7zm9-2c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-8 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
                        </svg>
                    </button>
                </div>
                <textarea placeholder="${TEXTOS.escribirMensaje}" rows="1"></textarea>
                <div class="chat-input-buttons">
                    <button type="submit" class="send-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="send-icon">
                            <path fill="currentColor" d="M2.01 21l20.99-9L2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;chatContainer.innerHTML=newConversationHTML+chatInterfaceHTML;const toggleButton=document.createElement("button");toggleButton.className=`chat-toggle${config.style.position==="left"?" position-left":""}`;toggleButton.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>`;widgetContainer.appendChild(chatContainer);widgetContainer.appendChild(toggleButton);document.body.appendChild(widgetContainer);const chatInterface=chatContainer.querySelector(".chat-interface");const messagesContainer=chatContainer.querySelector(".chat-messages");const textarea=chatContainer.querySelector("textarea");const sendButton=chatContainer.querySelector('button[type="submit"]');const emojiButton=chatContainer.querySelector(".emoji-button");const emojiPanel=chatContainer.querySelector(".emoji-panel");const emojiCategories=chatContainer.querySelectorAll(".emoji-category");const emojiContent=chatContainer.querySelector(".emoji-content");const closeButtons=chatContainer.querySelectorAll(".close-button");closeButtons.forEach(button=>{button.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
        `;button.addEventListener("click",()=>{chatContainer.classList.remove("open");setTimeout(()=>{chatContainer.style.visibility="hidden"},500)})});toggleButton.addEventListener("click",()=>{if(chatContainer.classList.contains("open")){chatContainer.classList.remove("open");setTimeout(()=>{chatContainer.style.visibility="hidden"},500)}else{chatContainer.style.visibility="visible";chatContainer.classList.add("open");if(loadChatHistory()&&chatHistory.length>0){if(!chatInterface.classList.contains("active")){const brandHeader=chatContainer.querySelector(".brand-header");const newConversation=chatContainer.querySelector(".new-conversation");brandHeader.style.display="none";newConversation.style.display="none";chatInterface.classList.add("active");const messagesContainer=chatContainer.querySelector(".chat-messages");messagesContainer.innerHTML="";chatHistory.forEach(msg=>{const messageDiv=document.createElement("div");messageDiv.className=`chat-message ${msg.type}`;messageDiv.innerHTML=msg.content;messagesContainer.appendChild(messageDiv)});messagesContainer.scrollTop=messagesContainer.scrollHeight}}}});sendButton.addEventListener("click",()=>{const message=textarea.value.trim();if(message){sendMessage(message);textarea.value=""}});textarea.addEventListener("keypress",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();const message=textarea.value.trim();if(message){sendMessage(message);textarea.value=""}}});textarea.addEventListener("input",()=>{if(textarea.value.trim()){sendButton.style.display="block";emojiButton.style.display="flex"}else{sendButton.style.display="none";emojiButton.style.display="none"}});const emojisByCategory={frequent:["😀","😊","👍","❤️","👋","🙏","😂","🎉","👏","🤔","😍"],smileys:["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🤩","🥳"],people:["👍","👎","👌","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","👇","☝️","👋","🤚","🖐️","✋","🖖","👏","🙌","👐","🤲","🤝","🙏","✍️"],animals:["🐱","🐶","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐦","🐤","🦆","🦅","🦉","🦇","🐺","🐗"],food:["🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🥬","🥒","🌶️","🌽","🥕","🧄","🧅","🥔","🍠","🥐","🥯","🍞","🥖","🥨","🧀","🥚","🍳","🧈","🥞","🧇","🥓","🥩","🍗","🍖","🦴","🌭","🍔","🍟","🍕","🥪","🥙","🧆","🌮","🌯","🥗","🥘","🥫","🍝","🍜","🍲","🍛","🍣","🍱","🥟","🦪","🍤","🍙","🍚","🍘","🍥","🥠","🥮","🍢","🍡","🍧","🍨","🍦","🥧","🧁","🍰","🎂","🍮","🍭","🍬","🍫","🍿","🍩","🍪","🌰","🥜","🍯","🥛","🍼","☕","🍵","🧃","🥤","🍶","🍺","🍻","🥂","🍷","🥃","🍸","🍹","🧉","🍾","🧊"],travel:["✈️","🚀","🚁","🚂","🚃","🚄","🚅","🚆","🚇","🚈","🚉","🚊","🚝","🚞","🚋","🚌","🚍","🚎","🚐","🚑","🚒","🚓","🚔","🚕","🚖","🚗","🚘","🚙","🚚","🚛","🚜","🏎️","🏍️","🛵","🦽","🦼","🛺","🚲","🛴","🛹","🚏","🛣️","🛤️","🛢️","⛽","🚨","🚥","🚦","🛑","🚧"],activities:["⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱","🪀","🏓","🏸","🏒","🏑","🥍","🏏","🥅","⛳","🪁","🎣","🤿","🎽","🎿","🛷","🥌","🎯","🪂","🎮","🕹️","🎲","🎭","🎨","🧩"],objects:["💡","🔦","🕯️","🧯","🛒","🚬","⚰️","⚱️","🏺","🔮","📿","🧿","💈","⚗️","🔭","🔬","🕳️","💊","💉","🩸","🩹","🩺","🔪","🗡️","⚔️","🛡️","🚪","🪑","🛏️","🛋️","🪒","🧴","🧷","🧹","🧺","🧻","🧼","🧽","🧯","🛒"],symbols:["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟","☮️","✝️","☪️","🕉️","☸️","✡️","🔯","🕎","☯️","☦️","🛐","⛎","♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","🆔","⚛️"],flags:["🏁","🚩","🎌","🏴","🏳️","🏳️‍🌈","🏴‍☠️"]};function loadEmojisForCategory(category){emojiContent.innerHTML="";const emojis=emojisByCategory[category];emojis.forEach(emoji=>{const emojiElement=document.createElement("div");emojiElement.className="emoji-item";emojiElement.textContent=emoji;emojiElement.addEventListener("click",()=>{insertEmoji(emoji)});emojiContent.appendChild(emojiElement)})}function insertEmoji(emoji){const cursorPos=textarea.selectionStart;const textBefore=textarea.value.substring(0,cursorPos);const textAfter=textarea.value.substring(cursorPos);textarea.value=textBefore+emoji+textAfter;textarea.selectionStart=cursorPos+emoji.length;textarea.selectionEnd=cursorPos+emoji.length;textarea.focus();sendButton.style.display="block";emojiPanel.classList.remove("active")}loadEmojisForCategory("frequent");emojiCategories.forEach(category=>{category.addEventListener("click",()=>{emojiCategories.forEach(cat=>cat.classList.remove("active"));category.classList.add("active");loadEmojisForCategory(category.dataset.category)})});emojiButton.addEventListener("click",()=>{emojiPanel.classList.toggle("active");if(emojiPanel.classList.contains("active")){loadEmojisForCategory("frequent")}});document.addEventListener("click",event=>{if(!emojiPanel.contains(event.target)&&!emojiButton.contains(event.target)){emojiPanel.classList.remove("active")}});function initializeResize(){const resizeButtons=document.querySelectorAll(".resize-button");const chatContainer=document.querySelector(".chat-container");if(!resizeButtons.length||!chatContainer)return;const normalSize={width:"380px",height:"600px"};const largeSize={width:"600px",height:"800px"};let isLarge=false;function getMaxSize(){const windowWidth=window.innerWidth;const windowHeight=window.innerHeight;const maxWidth=Math.floor(windowWidth*.8);const maxHeight=Math.floor(windowHeight*.8);return{width:maxWidth,height:maxHeight}}function toggleSize(){if(window.innerWidth<=768){return}const maxSize=getMaxSize();if(isLarge){chatContainer.style.width=normalSize.width;chatContainer.style.height=normalSize.height}else{const width=Math.min(parseInt(largeSize.width),maxSize.width);const height=Math.min(parseInt(largeSize.height),maxSize.height);chatContainer.style.width=width+"px";chatContainer.style.height=height+"px"}isLarge=!isLarge;resizeButtons.forEach(button=>{const icon=button.querySelector("svg");icon.innerHTML='<path fill="currentColor" d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>'})}window.addEventListener("resize",()=>{if(window.innerWidth<=768){chatContainer.style.width="100%";chatContainer.style.height="100%";isLarge=false}else if(isLarge){const maxSize=getMaxSize();const width=Math.min(parseInt(largeSize.width),maxSize.width);const height=Math.min(parseInt(largeSize.height),maxSize.height);chatContainer.style.width=width+"px";chatContainer.style.height=height+"px"}else{chatContainer.style.width=normalSize.width;chatContainer.style.height=normalSize.height}});resizeButtons.forEach(button=>{button.addEventListener("click",toggleSize)})}initializeResize();const chatButton=chatContainer.querySelector(".chat-button");if(chatButton){chatButton.addEventListener("click",()=>{setTimeout(initializeResize,100)})}async function sendMessage(message){const messagesContainer=chatContainer.querySelector(".chat-messages");const messageData={message:message,chatInput:message,sessionId:currentSessionId,timestamp:(new Date).toISOString()};const userMessageDiv=document.createElement("div");userMessageDiv.className="chat-message user";userMessageDiv.innerHTML=`
            <span>${message}</span>
            <div style="font-size: 12px; color: rgba(255, 255, 255, 0.8); text-align: right; margin-top: 4px;">
                <span>${(new Date).toLocaleDateString([],{year:"2-digit",month:"2-digit",day:"2-digit"})} · ${(new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
            </div>
        `;messagesContainer.appendChild(userMessageDiv);messagesContainer.scrollTop=messagesContainer.scrollHeight;chatHistory.push({type:"user",content:userMessageDiv.innerHTML});saveChatHistory();const loader=document.createElement("div");loader.className="chat-message bot";loader.innerHTML=`
            <div style="display: flex; align-items: center;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
                <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${TEXTOS.atencionCliente}</strong>
            </div>
            <div style="display: flex; align-items: center; margin-top: 8px;">
                <div class="chat-loader-dots" style="display: flex;">
                    <div class="chat-loader-dot" style="width: 8px; height: 8px; background: var(--chat--color-primary); border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; margin-right: 4px;"></div>
                    <div class="chat-loader-dot" style="width: 8px; height: 8px; background: var(--chat--color-primary); border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; animation-delay: -0.16s; margin-right: 4px;"></div>
                    <div class="chat-loader-dot" style="width: 8px; height: 8px; background: var(--chat--color-primary); border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; animation-delay: -0.32s;"></div>
                </div>
            </div>
        `;messagesContainer.appendChild(loader);messagesContainer.scrollTop=messagesContainer.scrollHeight;try{const response=await fetch(config.contact.chat.webhook.url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(messageData)});const data=await response.json();loader.remove();const botMessageDiv=document.createElement("div");botMessageDiv.className="chat-message bot";botMessageDiv.innerHTML=`
                <div style="display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                    </svg>
                    <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${TEXTOS.atencionCliente}</strong>
                </div>
                <span>${Array.isArray(data)?data[0].output:data.output}</span>
                <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                    <span>${(new Date).toLocaleDateString([],{year:"2-digit",month:"2-digit",day:"2-digit"})} · ${(new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                </div>
            `;messagesContainer.appendChild(botMessageDiv);messagesContainer.scrollTop=messagesContainer.scrollHeight;chatHistory.push({type:"bot",content:botMessageDiv.innerHTML});saveChatHistory()}catch(error){loader.remove();console.error("Error:",error);const errorMessageDiv=document.createElement("div");errorMessageDiv.className="chat-message bot";errorMessageDiv.innerHTML=`
                <div style="display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px; fill: var(--chat--color-primary);">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                    </svg>
                    <strong style="margin-right: 8px; font-size: 16px; color: var(--chat--color-primary);">${TEXTOS.atencionCliente}</strong>
                </div>
                <span>${TEXTOS.noDisponible}</span>
                <div style="font-size: 12px; color: #999; text-align: right; margin-top: 4px;">
                    <span>${(new Date).toLocaleDateString([],{year:"2-digit",month:"2-digit",day:"2-digit"})} · ${(new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                </div>
            `;messagesContainer.appendChild(errorMessageDiv);messagesContainer.scrollTop=messagesContainer.scrollHeight;chatHistory.push({type:"bot",content:errorMessageDiv.innerHTML});saveChatHistory()}}function initializeDarkMode(){const darkModeConfig=config.style.darkMode;if(darkModeConfig){const themeToggles=chatContainer.querySelectorAll(".theme-toggle");const chatWidget=document.querySelector(".n8n-chat-widget");function updateDarkMode(isDark){if(isDark){chatWidget.classList.add("dark-mode");localStorage.setItem("chatTheme","dark")}else{chatWidget.classList.remove("dark-mode");localStorage.setItem("chatTheme","light")}}themeToggles.forEach(toggle=>{toggle.innerHTML=`
                    <svg class="theme-icon light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                    </svg>
                    <svg class="theme-icon dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                    </svg>
                `;toggle.addEventListener("click",()=>{const isDark=chatWidget.classList.contains("dark-mode");updateDarkMode(!isDark)})});const savedTheme=localStorage.getItem("chatTheme");if(savedTheme){updateDarkMode(savedTheme==="dark")}else{updateDarkMode(false)}}}initializeDarkMode();if(config.contact.chat.enabled){const chatButton=chatContainer.querySelector(".chat-button");if(chatButton){chatButton.addEventListener("click",()=>startNewConversation(false));chatButton.addEventListener("click",()=>{setTimeout(initializeResize,100)})}}initializeResize();const linkCardStyleElement=document.createElement("style");linkCardStyleElement.textContent=`
    /* Estilos para las tarjetas de enlace estilo GitHub */
    .link-card {
        display: flex;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        margin: 12px 0;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        background-color: var(--chat--color-background, #fff);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        max-width: 100%;
        height: 96px;
    }

    .link-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-color: var(--chat--color-primary, #854fff);
    }

    .link-card-content {
        padding: 14px 12px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
        overflow: hidden;
        gap: 6px;
    }

    .link-card-title {
        font-weight: 600;
        margin: 0;
        color: var(--chat--color-primary, #854fff);
        font-size: 14px;
        line-height: 1.3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .link-card-description {
        font-size: 12px;
        color: #666;
        margin: 0;
        line-height: 1.3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .link-card-domain {
        font-size: 11px;
        color: #888;
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 0;
    }

    .link-card-favicon {
        width: 16px;
        height: 16px;
        border-radius: 2px;
    }
    
    .link-card-image {
        width: 96px;
        height: 96px;
        object-fit: cover;
        flex-shrink: 0;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    }

    .link-card-loading {
        opacity: 0.7;
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0% { opacity: 0.7; }
        50% { opacity: 1; }
        100% { opacity: 0.7; }
    }

    /* Estilos para modo oscuro */
    .n8n-chat-widget.dark-mode .link-card {
        background-color: #2a2a2a;
        border-color: rgba(255, 255, 255, 0.1);
    }

    .n8n-chat-widget.dark-mode .link-card-title {
        color: var(--chat--color-primary, #a67fff);
    }

    .n8n-chat-widget.dark-mode .link-card-description {
        color: #aaa;
    }

    .n8n-chat-widget.dark-mode .link-card-domain {
        color: #aaa;
    }

    /* Estilos responsivos */
    @media (max-width: 480px) {
        .link-card-image {
            width: 60px;
            height: 60px;
        }
        
        .link-card-content {
            padding: 10px;
        }
        
        .link-card {
            height: auto;
            min-height: 60px;
        }
        
        .link-card-title {
            white-space: normal;
            overflow: visible;
            text-overflow: unset;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            max-height: calc(1.3em * 2);
        }
        
        .link-card-description {
            white-space: normal;
            overflow: visible;
            text-overflow: unset;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            max-height: calc(1.3em * 2);
        }
    }
    `;document.head.appendChild(linkCardStyleElement);const metadataCache=new Map;const previewServices=[{name:"LinkPreview",url:"https://api.linkpreview.net",headers:{"X-Linkpreview-Api-Key":"YOUR_API_KEY"},parse:data=>({title:data.title,description:data.description,image:data.image,url:data.url})},{name:"URLMeta",url:"https://api.urlmeta.org",parse:data=>({title:data.meta?.title||data.result?.title,description:data.meta?.description||data.result?.description,image:data.meta?.image||data.result?.image,url:data.result?.url||data.url})},{name:"Microlink",url:"https://api.microlink.io",parse:data=>({title:data.data?.title,description:data.data?.description,image:data.data?.image?.url,url:data.data?.url})}];async function getMetadata(url){if(metadataCache.has(url)){return metadataCache.get(url)}for(const service of previewServices){try{console.log(`Intentando extraer metadatos con ${service.name} para:`,url);let apiUrl;let options={method:"GET",headers:{Accept:"application/json",...service.headers}};if(service.name==="URLMeta"){apiUrl=`${service.url}/?url=${encodeURIComponent(url)}`}else if(service.name==="Microlink"){apiUrl=`${service.url}?url=${encodeURIComponent(url)}`}else{apiUrl=`${service.url}/?key=YOUR_API_KEY&q=${encodeURIComponent(url)}`}const response=await fetch(apiUrl,options);if(!response.ok){console.warn(`${service.name} failed:`,response.status);continue}const data=await response.json();console.log(`${service.name} response:`,data);const metadata=service.parse(data);if(metadata.title&&metadata.image){console.log(`✅ Metadatos obtenidos con ${service.name}:`,metadata);metadataCache.set(url,metadata);return metadata}}catch(error){console.warn(`Error con ${service.name}:`,error);continue}}try{const metadata=await extractMetadataDirectly(url);if(metadata){metadataCache.set(url,metadata);return metadata}}catch(error){console.warn("Error extrayendo metadatos directamente:",error)}const fallbackMetadata=getFallbackMetadata(url);if(fallbackMetadata){metadataCache.set(url,fallbackMetadata);return fallbackMetadata}return null}async function extractMetadataDirectly(url){try{const proxyUrl=`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;const response=await fetch(proxyUrl);if(!response.ok){throw new Error(`HTTP ${response.status}`)}const data=await response.json();const html=data.contents;const parser=new DOMParser;const doc=parser.parseFromString(html,"text/html");const title=doc.querySelector('meta[property="og:title"]')?.content||doc.querySelector('meta[name="twitter:title"]')?.content||doc.querySelector("title")?.textContent||"";const description=doc.querySelector('meta[property="og:description"]')?.content||doc.querySelector('meta[name="twitter:description"]')?.content||doc.querySelector('meta[name="description"]')?.content||"";let image=doc.querySelector('meta[property="og:image"]')?.content||doc.querySelector('meta[name="twitter:image"]')?.content||doc.querySelector('meta[name="twitter:image:src"]')?.content;if(image&&!image.startsWith("http")){const urlObj=new URL(url);if(image.startsWith("/")){image=urlObj.origin+image}else{image=urlObj.origin+"/"+image}}if(title&&image){return{title:title.trim(),description:description.trim(),image:image,url:url}}}catch(error){console.warn("Error en extracción directa:",error)}return null}function getFallbackMetadata(url){const fallbacks={"gasel2000.com/producto/hebilla-15mm-oro-7115":{title:"Hebilla 15mm oro 7115",description:"Hebilla metálica dorada de 15mm para complementos y bisutería",image:"https://gasel2000.com/wp-content/uploads/2025/05/Picsart_25-05-28_13-21-24-709.jpg",url:url},"gasel2000.com/producto/cinta-adhesiva-doble-cara":{title:"Cinta Adhesiva Doble Cara",description:"Cinta adhesiva de doble cara para manualidades y proyectos",image:"https://gasel2000.com/wp-content/uploads/2024/11/imagen_2024-11-13_174346796.png",url:url}};for(const[pattern,metadata]of Object.entries(fallbacks)){if(url.includes(pattern)){return metadata}}return null}function processMessageLinks(messageNode){if(!messageNode||!messageNode.querySelector)return;const messageSpan=messageNode.querySelector("span");if(!messageSpan)return;const links=messageSpan.querySelectorAll("a");links.forEach(link=>{if(link.classList.contains("link-card")||link.closest(".link-card"))return;const url=link.getAttribute("href");const text=link.textContent;if(!url||!text)return;try{const card=createBasicLinkCard(url,text);link.parentNode.replaceChild(card,link);loadMetadataForCard(card,url)}catch(error){console.warn("Error creando tarjeta de enlace:",error)}})}function createBasicLinkCard(url,text){let domain="";try{domain=new URL(url).hostname}catch(e){domain=url}const faviconUrl=`https://www.google.com/s2/favicons?domain=${domain}&sz=64`;const linkCard=document.createElement("a");linkCard.href=url;linkCard.className="link-card link-card-loading";linkCard.target="_blank";linkCard.rel="noopener noreferrer";const content=document.createElement("div");content.className="link-card-content";const title=document.createElement("div");title.className="link-card-title";title.textContent=text;const description=document.createElement("div");description.className="link-card-description";description.textContent="Cargando información...";const domainDiv=document.createElement("div");domainDiv.className="link-card-domain";const favicon=document.createElement("img");favicon.src=faviconUrl;favicon.alt=domain;favicon.className="link-card-favicon";const domainText=document.createElement("span");domainText.textContent=domain;domainDiv.appendChild(favicon);domainDiv.appendChild(domainText);const imageContainer=document.createElement("div");imageContainer.className="link-card-image";imageContainer.textContent="🔗";content.appendChild(title);content.appendChild(description);content.appendChild(domainDiv);linkCard.appendChild(content);linkCard.appendChild(imageContainer);return linkCard}async function loadMetadataForCard(card,url){try{console.log("Cargando metadatos para:",url);const metadata=await getMetadata(url);if(metadata){console.log("✅ Metadatos cargados:",metadata);updateCardWithMetadata(card,metadata,url)}else{console.log("❌ No se pudieron cargar metadatos para:",url);updateCardWithFallback(card,url)}}catch(error){console.error("Error cargando metadatos:",error);updateCardWithFallback(card,url)}}function updateCardWithMetadata(card,metadata,originalUrl){card.classList.remove("link-card-loading");const titleElement=card.querySelector(".link-card-title");if(titleElement&&metadata.title){titleElement.textContent=metadata.title}const descriptionElement=card.querySelector(".link-card-description");if(descriptionElement){if(metadata.description){descriptionElement.textContent=metadata.description}else{descriptionElement.style.display="none"}}const imageContainer=card.querySelector(".link-card-image");if(imageContainer){if(metadata.image){const img=document.createElement("img");img.src=metadata.image;img.alt="Vista previa";img.className="link-card-image";img.style.width="100%";img.style.height="100%";img.style.objectFit="cover";img.onload=function(){imageContainer.innerHTML="";imageContainer.appendChild(img)};img.onerror=function(){console.warn("Error cargando imagen:",metadata.image);showFaviconFallback(imageContainer,originalUrl)}}else{showFaviconFallback(imageContainer,originalUrl)}}}function updateCardWithFallback(card,url){card.classList.remove("link-card-loading");const descriptionElement=card.querySelector(".link-card-description");if(descriptionElement){descriptionElement.textContent="Haz clic para ver el contenido"}const imageContainer=card.querySelector(".link-card-image");if(imageContainer){showFaviconFallback(imageContainer,url)}}function showFaviconFallback(imageContainer,url){try{const domain=new URL(url).hostname;const faviconUrl=`https://www.google.com/s2/favicons?domain=${domain}&sz=128`;const img=document.createElement("img");img.src=faviconUrl;img.alt="Favicon";img.style.width="32px";img.style.height="32px";img.style.borderRadius="4px";imageContainer.innerHTML="";imageContainer.style.backgroundColor="#f5f5f5";imageContainer.style.display="flex";imageContainer.style.alignItems="center";imageContainer.style.justifyContent="center";imageContainer.appendChild(img);img.onerror=function(){imageContainer.innerHTML="";imageContainer.style.backgroundColor="var(--chat--color-primary)";imageContainer.style.color="white";imageContainer.textContent="🔗"}}catch(error){imageContainer.style.backgroundColor="var(--chat--color-primary)";imageContainer.style.color="white";imageContainer.textContent="🔗"}}function setupLinkCardObserver(){const observer=new MutationObserver(mutations=>{mutations.forEach(mutation=>{if(mutation.type==="childList"&&mutation.addedNodes.length>0){mutation.addedNodes.forEach(node=>{if(node.nodeType===1&&node.classList&&node.classList.contains("chat-message")&&node.classList.contains("bot")){setTimeout(()=>processMessageLinks(node),100)}})}})});document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{const messagesContainer=document.querySelector(".chat-messages");if(messagesContainer){observer.observe(messagesContainer,{childList:true,subtree:true});console.log("Link Card Observer iniciado correctamente");const botMessages=messagesContainer.querySelectorAll(".chat-message.bot");botMessages.forEach(message=>processMessageLinks(message))}},1e3)});if(document.readyState==="complete"||document.readyState==="interactive"){setTimeout(()=>{const messagesContainer=document.querySelector(".chat-messages");if(messagesContainer){observer.observe(messagesContainer,{childList:true,subtree:true});console.log("Link Card Observer iniciado (página ya cargada)");const botMessages=messagesContainer.querySelectorAll(".chat-message.bot");botMessages.forEach(message=>processMessageLinks(message))}},1e3)}}setupLinkCardObserver()})();document.addEventListener("DOMContentLoaded",()=>{if(window.ChatWidgetConfig){const widgetContainer=document.createElement("div");widgetContainer.className="n8n-chat-widget";widgetContainer.style.setProperty("--n8n-chat-primary-color",window.ChatWidgetConfig.style.primaryColor);widgetContainer.style.setProperty("--n8n-chat-secondary-color",window.ChatWidgetConfig.style.secondaryColor);widgetContainer.style.setProperty("--n8n-chat-background-color",window.ChatWidgetConfig.style.backgroundColor);widgetContainer.style.setProperty("--n8n-chat-font-color",window.ChatWidgetConfig.style.fontColor);widgetContainer.style.setProperty("--chat-toggle-animation",window.ChatWidgetConfig.style.animation);widgetContainer.style.setProperty("--chat-toggle-animation-duration",window.ChatWidgetConfig.style.animationDuration);widgetContainer.style.setProperty("--chat-toggle-animation-delay",window.ChatWidgetConfig.style.animationDelay);widgetContainer.style.setProperty("--chat-icon-size",window.ChatWidgetConfig.style.iconSize);document.body.appendChild(widgetContainer);window.ChatWidget=new ChatWidget(window.ChatWidgetConfig)}else{console.error("La configuración del chat no está disponible")}});
