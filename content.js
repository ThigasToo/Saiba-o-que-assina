console.log("'Know What You Sign' Extension - Deep Radar Activated!");

// Cleans the domain (e.g., pt-br.facebook.com becomes facebook.com)
let dominioAtual = window.location.hostname;
const partesDominio = dominioAtual.split('.');
if (partesDominio[partesDominio.length - 1] === 'br' && partesDominio.length > 3) {
    dominioAtual = partesDominio.slice(-3).join('.'); 
} else if (partesDominio[partesDominio.length - 1] !== 'br' && partesDominio.length > 2) {
    dominioAtual = partesDominio.slice(-2).join('.'); 
}

// 1. CENTRALIZED MODAL STRUCTURE (Approved design maintained)
const modalAviso = document.createElement('div');
modalAviso.style.display = "none";
modalAviso.style.position = "fixed";
modalAviso.style.top = "50%";
modalAviso.style.left = "50%";
modalAviso.style.transform = "translate(-50%, -50%)";
modalAviso.style.backgroundColor = "#ffffff";
modalAviso.style.color = "#333333";
modalAviso.style.padding = "24px"; // Slightly larger breathing room
modalAviso.style.borderRadius = "16px";
modalAviso.style.zIndex = "2147483647";

// 👇 THE 4 MAGIC LINES FOR LARGE TEXTS 👇
modalAviso.style.width = "420px"; // Wider to fit AI explanations
modalAviso.style.maxWidth = "90vw"; // Shrinks on smaller screens
modalAviso.style.maxHeight = "80vh"; // Never taller than 80% of the screen
modalAviso.style.overflowY = "auto"; // Adds automatic scroll if text exceeds 80%!

modalAviso.style.boxShadow = "0px 20px 40px rgba(0,0,0,0.2)";
modalAviso.style.fontFamily = "-apple-system, BlinkMacSystemFont, Roboto, sans-serif";
modalAviso.style.border = "1px solid #eaeaea";

const overlay = document.createElement('div');
overlay.style.display = "none";
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100vw";
overlay.style.height = "100vh";
overlay.style.backgroundColor = "rgba(0,0,0,0.3)";
overlay.style.zIndex = "2147483646";
overlay.style.backdropFilter = "blur(2px)";

document.body.appendChild(overlay);
document.body.appendChild(modalAviso);

const fecharModal = () => {
    modalAviso.style.display = "none";
    overlay.style.display = "none";
};
overlay.addEventListener('click', fecharModal);

// ==========================================
// THE FLOATING GLOBAL SHIELD
// ==========================================
const escudoGlobal = document.createElement('div');
escudoGlobal.innerHTML = '🛡️';
escudoGlobal.title = "Analyze this site's Privacy";
escudoGlobal.style.position = "fixed";
escudoGlobal.style.top = "40px"; // Distance from top
escudoGlobal.style.right = "20px"; // Distance from right
escudoGlobal.style.zIndex = "9999999"; // On top of absolutely everything
escudoGlobal.style.cursor = "pointer";
escudoGlobal.style.fontSize = "16px";
escudoGlobal.style.backgroundColor = "#ffffff";
escudoGlobal.style.borderRadius = "50%";
escudoGlobal.style.width = "23px";
escudoGlobal.style.height = "23px";
escudoGlobal.style.display = "flex";
escudoGlobal.style.alignItems = "center";
escudoGlobal.style.justifyContent = "center";
escudoGlobal.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.15)";
escudoGlobal.style.transition = "transform 0.2s, box-shadow 0.2s";

// Hover effect (mouse over)
escudoGlobal.onmouseover = () => {
    escudoGlobal.style.transform = "scale(1.1)";
    escudoGlobal.style.boxShadow = "0px 6px 16px rgba(0,0,0,0.2)";
};
escudoGlobal.onmouseout = () => {
    escudoGlobal.style.transform = "scale(1)";
    escudoGlobal.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.15)";
};

document.body.appendChild(escudoGlobal);

// What happens when clicking the global shield:
escudoGlobal.addEventListener('click', () => {
    // Shows the loading modal that already exists in your code
    overlay.style.display = "block";
    modalAviso.style.display = "block";
    modalAviso.innerHTML = `<div style="text-align: center; padding: 20px;">⏳<br><b>Analyzing global contract...</b></div>`;
    
    // Makes the exact same request to our backend
    fetch(`https://api-termos-privacidade.onrender.com/analisar?site=${dominioAtual}`)
        .then(resposta => resposta.json())
        .then(dados => {
            let listaAlertas = dados.alertas.map(alerta => `<li style="margin-bottom: 8px;">${alerta}</li>`).join('');
            let corRisco = dados.score === 'A' || dados.score === 'B' ? '#27ae60' : (dados.score === 'C' ? '#f39c12' : dados.score === 'D' || dados.score === 'E' ? '#e74c3c' : '#95a5a6');
            let iconeRisco = dados.score === 'A' ? '✅' : (dados.score === '?' ? '❓' : '⚠️');

            modalAviso.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eaeaea; padding-bottom: 12px; margin-bottom: 16px;">
                    <b style="color: #111; font-size: 16px;">${iconeRisco} Privacy: ${dominioAtual}</b>
                    <span style="background-color: ${corRisco}20; color: ${corRisco}; padding: 6px 10px; border-radius: 8px; font-weight: bold;">Score ${dados.score}</span>
                </div>
                <ul style="padding-left: 20px; font-bold; margin: 10; color: #000000; font-size: 15px;">${listaAlertas}</ul>
                <div style="margin-top: 20px; padding-top: 12px; border-top: 1px solid #eaeaea; font-size: 11px; color: #888; text-align: justify; line-height: 1.4;">
                    <b style="color: #555;">Analysis Source: ${dados.fonte || "Unavailable"}</b><br><br>
                    <b>Disclaimer:</b> The scores and alerts provided by this tool are strictly informational and do not substitute professional legal advice. Always read the site's official terms.
                </div>
                <div style="margin-top: 16px; text-align: right;">
                    <button id="btnFecharSaibaGlobal" style="background-color: #f1f1f1; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: bold; color: #333;">Understood</button>
                </div>
            `;
            document.getElementById('btnFecharSaibaGlobal').addEventListener('click', fecharModal);
        })
        .catch(erro => {
            modalAviso.innerHTML = `<div style="color: #e74c3c; text-align: center; padding: 20px;"><b>❌ Server Connection Error</b></div>`;
        });
});

// 3. SMART RADAR EXECUTION
rastrearContratos(); // Runs immediately upon opening the page

// Runs again after 2 and 5 seconds to catch slow-loading sites (like Spotify's footer)
setTimeout(rastrearContratos, 2000);
setTimeout(rastrearContratos, 5000);
