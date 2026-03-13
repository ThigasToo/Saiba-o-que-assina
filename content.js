console.log("Extensão 'Saiba o que Assina' - Radar Minucioso Ativado!");

// Limpa o domínio (ex: pt-br.facebook.com vira facebook.com)
let dominioAtual = window.location.hostname;
const partesDominio = dominioAtual.split('.');
if (partesDominio[partesDominio.length - 1] === 'br' && partesDominio.length > 3) {
    dominioAtual = partesDominio.slice(-3).join('.'); 
} else if (partesDominio[partesDominio.length - 1] !== 'br' && partesDominio.length > 2) {
    dominioAtual = partesDominio.slice(-2).join('.'); 
}

// 1. ESTRUTURA DO MODAL CENTRALIZADO (Mantido o design aprovado)
const modalAviso = document.createElement('div');
modalAviso.style.display = "none";
modalAviso.style.position = "fixed";
modalAviso.style.top = "50%";
modalAviso.style.left = "50%";
modalAviso.style.transform = "translate(-50%, -50%)";
modalAviso.style.backgroundColor = "#ffffff";
modalAviso.style.color = "#333333";
modalAviso.style.padding = "24px"; // Um respiro um pouco maior
modalAviso.style.borderRadius = "16px";
modalAviso.style.zIndex = "2147483647";

// 👇 AS 4 LINHAS MÁGICAS PARA TEXTOS GRANDES 👇
modalAviso.style.width = "420px"; // Deixei mais largo para caber as explicações da IA
modalAviso.style.maxWidth = "90vw"; // Se a tela for pequena, ele encolhe
modalAviso.style.maxHeight = "80vh"; // Nunca vai ser maior que 80% da tela
modalAviso.style.overflowY = "auto"; // Se o texto passar de 80%, cria um scroll automático!

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
// O ESCUDO GLOBAL FLUTUANTE
// ==========================================
const escudoGlobal = document.createElement('div');
escudoGlobal.innerHTML = '🛡️';
escudoGlobal.title = "Analisar Privacidade deste site";
escudoGlobal.style.position = "fixed";
escudoGlobal.style.top = "40px"; // Distância do topo
escudoGlobal.style.right = "20px"; // Distância da direita
escudoGlobal.style.zIndex = "9999999"; // Por cima de absolutamente tudo
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

// Efeito de hover (passar o mouse)
escudoGlobal.onmouseover = () => {
    escudoGlobal.style.transform = "scale(1.1)";
    escudoGlobal.style.boxShadow = "0px 6px 16px rgba(0,0,0,0.2)";
};
escudoGlobal.onmouseout = () => {
    escudoGlobal.style.transform = "scale(1)";
    escudoGlobal.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.15)";
};

document.body.appendChild(escudoGlobal);

// O que acontece ao clicar no escudo global:
escudoGlobal.addEventListener('click', () => {
    // Mostra o modal de carregamento que já existe no seu código
    overlay.style.display = "block";
    modalAviso.style.display = "block";
    modalAviso.innerHTML = `<div style="text-align: center; padding: 20px;">⏳<br><b>Analisando contrato global...</b></div>`;
    
    // Faz a mesma requisição para o nosso backend
    fetch(`https://api-termos-privacidade.onrender.com/analisar?site=${dominioAtual}`)
        .then(resposta => resposta.json())
        .then(dados => {
            let listaAlertas = dados.alertas.map(alerta => `<li style="margin-bottom: 8px;">${alerta}</li>`).join('');
            let corRisco = dados.score === 'A' || dados.score === 'B' ? '#27ae60' : (dados.score === 'C' ? '#f39c12' : dados.score === 'D' || dados.score === 'E' ? '#e74c3c' : '#95a5a6');
            let iconeRisco = dados.score === 'A' ? '✅' : (dados.score === '?' ? '❓' : '⚠️');

            modalAviso.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eaeaea; padding-bottom: 12px; margin-bottom: 16px;">
                    <b style="color: #111; font-size: 16px;">${iconeRisco} Privacidade: ${dominioAtual}</b>
                    <span style="background-color: ${corRisco}20; color: ${corRisco}; padding: 6px 10px; border-radius: 8px; font-weight: bold;">Score ${dados.score}</span>
                </div>
                <ul style="padding-left: 20px; font-bold; margin: 10; color: #000000; font-size: 15px;">${listaAlertas}</ul>
                <div style="margin-top: 20px; padding-top: 12px; border-top: 1px solid #eaeaea; font-size: 11px; color: #888; text-align: justify; line-height: 1.4;">
                    <b style="color: #555;">Fonte da Análise: ${dados.fonte || "Indisponível"}</b><br><br>
                    <b>Aviso Legal:</b> Os scores e alertas desta ferramenta possuem caráter estritamente informativo e não substituem o aconselhamento de um profissional jurídico. Leia sempre os termos oficiais do site.
                </div>
                <div style="margin-top: 16px; text-align: right;">
                    <button id="btnFecharSaibaGlobal" style="background-color: #f1f1f1; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: bold; color: #333;">Entendi</button>
                </div>
            `;
            document.getElementById('btnFecharSaibaGlobal').addEventListener('click', fecharModal);
        })
        .catch(erro => {
            modalAviso.innerHTML = `<div style="color: #e74c3c; text-align: center; padding: 20px;"><b>❌ Erro de Conexão com o Servidor</b></div>`;
        });
});

// 3. EXECUÇÃO INTELIGENTE DO RADAR
rastrearContratos(); // Roda imediatamente ao abrir a página

// Roda novamente após 2 e 5 segundos para pegar sites lentos (como o rodapé do Spotify)
setTimeout(rastrearContratos, 2000);
setTimeout(rastrearContratos, 5000);