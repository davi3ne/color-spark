document.addEventListener('DOMContentLoaded', () => {
    // Seletores de elementos
    const root = document.documentElement;
    const paletteContainer = document.getElementById('color-palette-container');
    const generateBtn = document.getElementById('generate-btn');
    const notification = document.getElementById('copy-notification');
    const moodButtonsContainer = document.getElementById('mood-buttons-container');
    const imageUploadInput = document.getElementById('image-upload-input'); // NOVO
    const exportCssBtn = document.getElementById('export-css-btn');
    const exportSvgBtn = document.getElementById('export-svg-btn');
    const exportPngBtn = document.getElementById('export-png-btn');
    const savePaletteBtn = document.getElementById('save-palette-btn');
    const paletteNameInput = document.getElementById('palette-name-input');
    const savedPalettesList = document.getElementById('saved-palettes-list');

    // Ícones SVG e Configurações de Moods (sem alteração)
    const unlockedIconSVG = `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/></svg>`;
    const lockedIconSVG = `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/></svg>`;
    const moodIcons = { aleatorio: `<svg class="icon" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v1.586l1.707-1.707a1 1 0 011.414 1.414L12.414 7H14a1 1 0 010 2h-1.586l1.707 1.707a1 1 0 01-1.414 1.414L11 10.414V12a1 1 0 01-2 0v-1.586l-1.707 1.707a1 1 0 01-1.414-1.414L7.586 9H6a1 1 0 010-2h1.586L5.879 5.293a1 1 0 011.414-1.414L9 5.586V4a1 1 0 011-1z"/></svg>`, quente: `<svg class="icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.018a7.002 7.002 0 016.32 4.922 1 1 0 11-1.836.79l-.002-.001a5.002 5.002 0 00-9.962 0l-.002.001a1 1 0 01-1.836-.79A7.002 7.002 0 019 3.018V3a1 1 0 011-1zM2.43 12.062a1 1 0 011.414-1.414l1.414 1.414a1 1 0 01-1.414 1.414l-1.414-1.414zM14.743 12.062a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM4.58 8.12A5.002 5.002 0 0010 17a5.002 5.002 0 005.42-8.88 1 1 0 111.16 1.64A7.002 7.002 0 0110 19a7.002 7.002 0 01-6.58-9.24 1 1 0 011.16-1.64z" clip-rule="evenodd"/></svg>`, frio: `<svg class="icon" fill="currentColor" viewBox="0 0 20 20"><path d="M10 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 4zM8.5 7.25a.75.75 0 01.75-.75h2a.75.75 0 010 1.5h-2a.75.75 0 01-.75-.75zM10 10a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 10zM12.75 12a.75.75 0 01-.75-.75h-2a.75.75 0 010-1.5h2a.75.75 0 01.75.75zM5.793 6.707a.75.75 0 010-1.06l3.5-3.5a.75.75 0 011.06 0l3.5 3.5a.75.75 0 11-1.06 1.06L10 4.06l-3.147 3.147a.75.75 0 01-1.06 0zM6.853 14.207a.75.75 0 011.06 0L10 15.94l2.086-2.086a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 010-1.06z"/></svg>`, praia: `<svg class="icon" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.5 10a.5.5 0 01.5-.5h8a.5.5 0 010 1H6a.5.5 0 01-.5-.5z"/></svg>`, outono: `<svg class="icon" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 5.168A1 1 0 008 6v1a1 1 0 001.555.832l3-1.5a1 1 0 000-1.664l-3-1.5z"/></svg>`, pastel: `<svg class="icon" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm3 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm3 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"/></svg>`, };
    
    // --- CONFIGURAÇÃO E ESTADO INICIAL ---
    const NUM_COLORS = 5;
    let currentMood = 'aleatorio';
    const moodGenerationConfig = { quente: { h: [0, 60], s: [50, 90], l: [40, 75] }, frio: { h: [150, 270], s: [40, 80], l: [40, 70] }, praia: { h: [[25, 50], [180, 220]], s: [60, 100], l: [50, 85] }, outono: { h: [15, 70], s: [40, 70], l: [30, 60] }, pastel: { h: [0, 360], s: [25, 60], l: [75, 95] }};
    const moodDisplayConfig = { aleatorio: { name: 'Aleatório', icon: moodIcons.aleatorio }, quente: { name: 'Quente', icon: moodIcons.quente }, frio: { name: 'Frio', icon: moodIcons.frio }, praia: { name: 'Praia', icon: moodIcons.praia }, outono: { name: 'Outono', icon: moodIcons.outono }, pastel: { name: 'Pastel', icon: moodIcons.pastel }};

    // --- FUNÇÕES AUXILIARES DE COR ---
    function componentToHex(c) { const hex = c.toString(16); return hex.length == 1 ? "0" + hex : hex; }
    function rgbToHex(r, g, b) { return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b); }
    function getContrastColor(hex) { const r = parseInt(hex.substring(1, 3), 16), g = parseInt(hex.substring(3, 5), 16), b = parseInt(hex.substring(5, 7), 16); return (((r * 299) + (g * 587) + (b * 114)) / 1000 >= 128) ? '#000000' : '#FFFFFF'; }
    function hexToRgb(hex) { const r = parseInt(hex.substring(1, 3), 16), g = parseInt(hex.substring(3, 5), 16), b = parseInt(hex.substring(5, 7), 16); return `rgb(${r}, ${g}, ${b})`; }
    function hslToHex(h, s, l) { l /= 100; const a = s * Math.min(l, 1 - l) / 100; const f = n => { const k = (n + h / 30) % 12; const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); return Math.round(255 * color).toString(16).padStart(2, '0'); }; return `#${f(0)}${f(8)}${f(4)}`; }
    function hexToHslString(hex) { const r = parseInt(hex.substring(1, 3), 16) / 255, g = parseInt(hex.substring(3, 5), 16) / 255, b = parseInt(hex.substring(5, 7), 16) / 255; const max = Math.max(r, g, b), min = Math.min(r, g, b); let h = 0, s, l = (max + min) / 2; if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; } h /= 6; } return `hsl(${Math.round(h * 360)}, ${Math.round((s || 0) * 100)}%, ${Math.round(l * 100)}%)`; }
    function getRandomNumber(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    function generateRandomHexColor() { return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`; }
    function generateColorByMood(mood) { if (!moodGenerationConfig[mood]) return { hex: generateRandomHexColor() }; const p = moodGenerationConfig[mood]; let hRange = p.h; if (Array.isArray(hRange[0])) hRange = hRange[getRandomNumber(0, hRange.length - 1)]; const h = getRandomNumber(hRange[0], hRange[1]), s = getRandomNumber(p.s[0], p.s[1]), l = getRandomNumber(p.l[0], p.l[1]); return { hex: hslToHex(h, s, l), hsl: `hsl(${h}, ${s}%, ${l}%)` }; }
    function showNotification(message = "Copiado!") { notification.textContent = message; notification.classList.add('show'); setTimeout(() => notification.classList.remove('show'), 1500); }
    
    // --- FUNÇÃO DE TEMA DINÂMICO ---
    function applyTheme(color) { const contrastColor = getContrastColor(color); root.style.setProperty('--primary-color', color); root.style.setProperty('--primary-contrast-color', contrastColor); }

    // --- FUNÇÕES DE RENDERIZAÇÃO ---
    function renderPalette() { let firstColor = null; paletteContainer.querySelectorAll('.color-column').forEach((column, index) => { if (!column.classList.contains('locked')) { const newColor = updateColorColumn(column); if (index === 0) firstColor = newColor; } }); if (firstColor) applyTheme(firstColor); }
    function createInitialPalette() { paletteContainer.innerHTML = ''; paletteContainer.style.gridTemplateColumns = `repeat(${NUM_COLORS}, 1fr)`; let firstColor = null; for (let i = 0; i < NUM_COLORS; i++) { const newColor = createColorColumn(); if (i === 0) firstColor = newColor; } if (firstColor) applyTheme(firstColor); }
    function createColorColumn() { const colorColumn = document.createElement('div'); colorColumn.className = 'color-column'; const infoContainer = document.createElement('div'); infoContainer.className = 'color-info'; colorColumn.appendChild(infoContainer); paletteContainer.appendChild(colorColumn); const newColor = updateColorColumn(colorColumn); const lockBtn = document.createElement('button'); lockBtn.className = 'lock-btn'; lockBtn.innerHTML = unlockedIconSVG; lockBtn.addEventListener('click', () => { const isLocked = colorColumn.classList.toggle('locked'); lockBtn.innerHTML = isLocked ? lockedIconSVG : unlockedIconSVG; }); colorColumn.appendChild(lockBtn); return newColor; }
    function updateColorColumn(column, forcedHex = null) { let colorHex, colorHsl; if (forcedHex) { colorHex = forcedHex; colorHsl = hexToHslString(forcedHex); } else { const colorData = generateColorByMood(currentMood); colorHex = colorData.hex; colorHsl = colorData.hsl || hexToHslString(colorHex); } const textColor = getContrastColor(colorHex); column.style.backgroundColor = colorHex; column.dataset.color = colorHex; const infoContainer = column.querySelector('.color-info'); infoContainer.innerHTML = `<p class="hex-code" style="color: ${textColor}">${colorHex.toUpperCase()}</p><p class="rgb-code" style="color: ${textColor}">${hexToRgb(colorHex)}</p><p class="hsl-code" style="color: ${textColor}">${colorHsl}</p>`; infoContainer.querySelectorAll('p').forEach(p => { p.addEventListener('click', (e) => { e.stopPropagation(); navigator.clipboard.writeText(e.target.textContent).then(() => showNotification(`${e.target.className.replace('-code','').toUpperCase()} Copiado!`)); }); }); return colorHex; }
    function renderMoodButtons() { moodButtonsContainer.innerHTML = ''; Object.keys(moodDisplayConfig).forEach(moodKey => { const mood = moodDisplayConfig[moodKey]; const button = document.createElement('button'); button.className = 'mood-btn'; button.dataset.mood = moodKey; button.innerHTML = `${mood.icon}<span>${mood.name}</span>`; if (moodKey === currentMood) button.classList.add('active'); moodButtonsContainer.appendChild(button); }); }

    // --- FUNÇÕES DE LOCALSTORAGE ---
    function getSavedPalettes() { return JSON.parse(localStorage.getItem('colorSparkPalettes')) || []; }
    function saveCurrentPalette() { const palettes = getSavedPalettes(); const currentColors = Array.from(paletteContainer.querySelectorAll('.color-column')).map(col => col.dataset.color); let paletteName = paletteNameInput.value.trim(); if (!paletteName) paletteName = `Paleta Salva ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}`; palettes.unshift({ name: paletteName, colors: currentColors }); localStorage.setItem('colorSparkPalettes', JSON.stringify(palettes)); paletteNameInput.value = ''; showNotification("Paleta Salva!"); renderSavedPalettes(); }
    function deletePalette(index, element) { element.classList.add('fade-out'); setTimeout(() => { const palettes = getSavedPalettes(); palettes.splice(index, 1); localStorage.setItem('colorSparkPalettes', JSON.stringify(palettes)); showNotification("Paleta Excluída!"); renderSavedPalettes(); }, 400); }
    function loadPalette(colors) { if (colors.length !== NUM_COLORS) { showNotification("Erro ao carregar paleta."); return; } const columns = paletteContainer.querySelectorAll('.color-column'); columns.forEach((column, index) => { column.classList.remove('locked'); column.querySelector('.lock-btn').innerHTML = unlockedIconSVG; updateColorColumn(column, colors[index]); }); applyTheme(colors[0]); showNotification("Paleta Carregada!"); }
    function renderSavedPalettes() { const palettes = getSavedPalettes(); savedPalettesList.innerHTML = ''; if (palettes.length === 0) { savedPalettesList.innerHTML = `<p style="text-align:center; color:#6c757d; padding: 20px;">Nenhuma paleta salva ainda. Salve sua primeira paleta!</p>`; return; } palettes.forEach((palette, index) => { if (!palette.colors) return; const item = document.createElement('div'); item.className = 'saved-palette-item'; const details = `<div class="palette-details"><span class="palette-name">${palette.name}</span><div class="palette-preview">${palette.colors.map(c => `<div class="preview-color" style="background-color: ${c}"></div>`).join('')}</div></div>`; const actions = `<div class="palette-item-actions"><button class="main-btn primary-btn load-btn" data-index="${index}">Carregar</button><button class="main-btn danger-btn delete-btn" data-index="${index}">Excluir</button></div>`; item.innerHTML = details + actions; savedPalettesList.appendChild(item); }); }
    
    // --- FUNÇÕES DE EXPORTAÇÃO ---
    function exportToPng() { const paletteEl = document.getElementById('color-palette-container'); showNotification("Gerando PNG..."); html2canvas(paletteEl, { useCORS: true, logging: false }).then(canvas => { const link = document.createElement('a'); link.download = `ColorSpark-Palette-${Date.now()}.png`; link.href = canvas.toDataURL('image/png'); link.click(); }); }
    function exportToSvg() { const colors = Array.from(paletteContainer.querySelectorAll('.color-column')).map(col => col.dataset.color); const rectWidth = 200, rectHeight = 600, textYPos = rectHeight - 30, svgWidth = colors.length * rectWidth; let rects = '', texts = ''; colors.forEach((color, index) => { const x = index * rectWidth; const textColor = getContrastColor(color); rects += `<rect x="${x}" y="0" width="${rectWidth}" height="${rectHeight}" fill="${color}" />`; texts += `<text x="${x + rectWidth / 2}" y="${textYPos}" font-family="Poppins, sans-serif" font-size="24" fill="${textColor}" text-anchor="middle">${color.toUpperCase()}</text>`; }); const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${rectHeight}" viewBox="0 0 ${svgWidth} ${rectHeight}">${rects}${texts}</svg>`; const blob = new Blob([svgContent], { type: 'image/svg+xml' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `ColorSpark-Palette-${Date.now()}.svg`; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url); showNotification("SVG Exportado!"); }

    // --- NOVA FUNÇÃO PARA UPLOAD DE IMAGEM ---
    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        showNotification("Analisando imagem...");
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;

            img.onload = () => {
                try {
                    const colorThief = new ColorThief();
                    const rgbPalette = colorThief.getPalette(img, NUM_COLORS);
                    const hexPalette = rgbPalette.map(rgb => rgbToHex(rgb[0], rgb[1], rgb[2]));
                    loadPalette(hexPalette);
                } catch (error) {
                    console.error("Erro ao analisar a imagem com ColorThief:", error);
                    showNotification("Erro ao ler a imagem.");
                }
            };
        };
        reader.readAsDataURL(file);
    }

    // --- EVENT LISTENERS GLOBAIS ---
    generateBtn.addEventListener('click', renderPalette);
    savePaletteBtn.addEventListener('click', saveCurrentPalette);
    imageUploadInput.addEventListener('change', handleImageUpload); // NOVO
    exportCssBtn.addEventListener('click', () => { const colors = Array.from(paletteContainer.querySelectorAll('.color-column')).map(col => col.dataset.color); let cssText = ':root {\n'; colors.forEach((color, i) => { cssText += `  --color-${i + 1}: ${color.toUpperCase()};\n`; }); cssText += '}'; navigator.clipboard.writeText(cssText).then(() => showNotification("CSS Copiado!")); });
    exportSvgBtn.addEventListener('click', exportToSvg);
    exportPngBtn.addEventListener('click', exportToPng);
    document.body.addEventListener('keyup', (e) => { if (e.code === 'Space' && !['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) renderPalette(); });
    moodButtonsContainer.addEventListener('click', (e) => { const button = e.target.closest('.mood-btn'); if (!button) return; currentMood = button.dataset.mood; document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active')); button.classList.add('active'); renderPalette(); });
    savedPalettesList.addEventListener('click', (e) => { const button = e.target.closest('.main-btn'); if (!button) return; const itemElement = button.closest('.saved-palette-item'); const allItems = Array.from(savedPalettesList.children); const index = allItems.indexOf(itemElement); if (button.classList.contains('load-btn')) { const palettes = getSavedPalettes(); if (palettes[index]) loadPalette(palettes[index].colors); } else if (button.classList.contains('delete-btn')) { deletePalette(index, itemElement); } });

    // --- CHAMADA INICIAL ---
    renderMoodButtons();
    createInitialPalette();
    renderSavedPalettes();
});