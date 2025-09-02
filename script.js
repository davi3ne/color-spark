document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos principais da página
    const paletteContainer = document.getElementById('color-palette-container');
    const generateBtn = document.getElementById('generate-btn');
    const notification = document.getElementById('copy-notification');

    /**
     * Gera uma cor hexadecimal aleatória.
     * @returns {string} Uma string representando a cor, ex: "#1a2b3c".
     */
    function generateRandomHexColor() {
        // Gera um número aleatório e converte para hexadecimal
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        // Garante que a string tenha sempre 6 caracteres, preenchendo com '0' se necessário
        return `#${randomColor.padStart(6, '0')}`;
    }

    /**
     * Determina se o texto sobre uma cor de fundo deve ser preto ou branco para melhor contraste.
     * @param {string} hex - A cor de fundo em formato hexadecimal.
     * @returns {string} Retorna "#000000" (preto) ou "#FFFFFF" (branco).
     */
    function getContrastColor(hex) {
        // Remove o '#' do início
        const cleanHex = hex.replace('#', '');
        
        // Converte hex para RGB
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        
        // Fórmula para calcular a luminosidade percebida
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        
        return (yiq >= 128) ? '#000000' : '#FFFFFF';
    }

    /**
     * Mostra uma notificação na tela por um curto período.
     */
    function showNotification() {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 1500); // A notificação some após 1.5 segundos
    }

    /**
     * Renderiza a paleta de 5 cores na tela.
     */
    function renderPalette() {
        // Limpa o container de cores antes de adicionar novas
        paletteContainer.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            const randomColor = generateRandomHexColor();
            const contrastColor = getContrastColor(randomColor);

            // Cria o elemento da coluna
            const colorColumn = document.createElement('div');
            colorColumn.classList.add('color-column');
            colorColumn.style.backgroundColor = randomColor;

            // Cria o elemento do código HEX
            const hexCode = document.createElement('span');
            hexCode.classList.add('hex-code');
            hexCode.textContent = randomColor.toUpperCase();
            hexCode.style.color = contrastColor;

            // Adiciona o evento de clique para copiar a cor
            hexCode.addEventListener('click', () => {
                navigator.clipboard.writeText(randomColor.toUpperCase()).then(() => {
                    // Sucesso ao copiar
                    showNotification();
                }).catch(err => {
                    // Erro ao copiar
                    console.error('Falha ao copiar a cor: ', err);
                });
            });

            // Adiciona o código HEX à coluna e a coluna ao container
            colorColumn.appendChild(hexCode);
            paletteContainer.appendChild(colorColumn);
        }
    }

    // --- Event Listeners ---

    // Gera uma nova paleta ao clicar no botão
    generateBtn.addEventListener('click', renderPalette);

    // Gera uma nova paleta ao pressionar a barra de espaço
    document.body.addEventListener('keyup', (e) => {
        // Verifica se a tecla pressionada é a barra de espaço e se não estamos digitando em um input
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
            renderPalette();
        }
    });

    // --- Chamada Inicial ---

    // Gera a primeira paleta assim que a página carrega
    renderPalette();
});