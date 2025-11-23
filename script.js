let cardcontainer = document.querySelector(".card-container");
let dados = [];

// É uma boa prática carregar os dados uma única vez quando a página carrega.
window.addEventListener('DOMContentLoaded', async () => {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados); // Exibe todos os jogos inicialmente
});

async function iniciarbusca() {
    
    if (dados.length === 0){
        try {
         let resposta = await fetch("data.json");
         dados = await resposta.json();
        
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
            return;
        }
    }
    
    const buscaInput = document.querySelector("input[type='text']");
    const termoBusca = buscaInput.value.toLowerCase();

    // Se não houver dados carregados, busca do JSON.
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    // Filtra os dados com base no termo de busca (no nome ou na descrição)
    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardcontainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            
            <img src="${dado.imagem}" alt="Capa do jogo ${dado.nome}">
            <div class="game-content">
                <h2>${dado.nome}</h2>
                <p><strong>Ano:</strong> ${dado.ano}</p>
                <p>${dado.descricao}</p>
                <a href="${dado.link}" target="_blank">Saiba mais</a>
            </div>
        `;
        cardcontainer.appendChild(article);
    }
}