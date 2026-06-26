// const base = [
//     {placa: "ABC1234", nome: "Wellington Bertoso Santos", cargo: "Gerente",veiculo: "Cadillac Escalade - Preto", polo: "CEIC",
//         torre: "Eudoro - Piso -1",
//         status: "Vaga fixa"
//     },

//     {
//         placa: "XYZ9876",
//         nome: "Ana Paula Ferreira",
//         cargo: "Coordenadora",
//         veiculo: "Jeep Compass - Branco",
//         polo: "CEIC",
//         torre: "Torre A - Piso 2",
//         status: "Liberado"
//     },

//     {
//         placa: "BRA2024",
//         nome: "Roberto Andrade",
//         cargo: "Gerente",
//         veiculo: "BMW X5 - Preto",
//         polo: "CEIC",
//         torre: "Jabaquara - Piso Amarelo",
//         status: "Reserva Bookker"
//     }
// ];


const base = [
    ["ABC1234", "Wellington Bertoso Santos - (11) 912345678", "Gerente - WBS Solutions", "Cadillac Escalade - Preto", "Knoxville (USA)", "Esmerald City - Piso -1", "Vaga fixa"],
    ["XYZ9876", "Ana Patrícia - (11) 912345679", "Coordenadora - Conceito Modas", "Jeep Compass - Branco", "Contagem (MG)", "Alabama - Piso 2", "Vaga rotativa"],
    ["BRA2024", "Roberto Andrade - (11) 912345680", "Vendedor - Lojas Mel", "BMW X5 - Preto", "São Paulo (SP)", "Mágico de Oz - Piso Verde", "Vaga avulso"],
    ["BRA1406", "Mayara Silva - (11) 912345681", "Microsoft - Eng de Software", "BMW X5 - Preto", "Tenessee (USA)", "Estrada de tijolos amarelos - Piso Amarelo", "Vaga visitante"],
].map(([placa, nome, cargo, veiculo, polo, torre, status]) => ({
    placa,
    nome,
    cargo,
    veiculo,
    polo,
    torre,
    status
}));

    let historico = [];
    // ENTER
    document.getElementById("inputPlaca")
    .addEventListener("keydown", e => {
        if(e.key === "Enter") consultar();
    });

    function mostrarLoading() {
        return `
            <div class="loading-box">
                <div class="spinner"></div>
                <div class="loading-text">Consultando veículo...</div>
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
            </div>
        `;
    }

    function mostrarSkeleton() {
        return `
            <div class="grid-info">
                ${Array(4).fill(`
                    <div class="info-box">
                        <div class="skeleton skeleton-box"></div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function consultar(){ 
        const placa = document.getElementById("inputPlaca").value.trim().toUpperCase();
        if(!placa) return;

        const loading = document.getElementById("loading");
        const resultado = document.getElementById("resultado");

        // Mostrar loading + skeleton
            loading.innerHTML = mostrarLoading();
            resultado.innerHTML = mostrarSkeleton();

        setTimeout(() => {
            const dado = base.find(v => v.placa === placa);

            if(dado){
                resultado.innerHTML = `
                    <div class="resultado ${dado.status === 'Liberado' ? 'liberado' : 'bloqueado'}">
                        <div class="placa1">
                            <div class="placa">
                                <div class="placa-topo">BRASIL</div>
                                <div class="placa-numero">${dado.placa}</div>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="box">
                                <small>Nome/Contato:</small>
                                ${dado.nome}
                            </div>

                            <div class="box">
                                <small>Cargo/Empresa:</small>
                                ${dado.cargo}
                            </div>

                            <div class="box">
                                <small>Veículo:</small>
                                ${dado.veiculo}
                            </div>

                            <div class="box">
                                <small>Filial:</small>
                                ${dado.polo}
                            </div>

                            <div class="box">
                                <small>Torre:</small>
                                ${dado.torre}
                            </div>

                            <div class="box">
                                <small>Status:</small>
                                ${dado.status}
                            </div>
                        </div>
                    </div>
                `;
            } else {
                resultado.innerHTML = `<div style="color:red;">❌ Veículo não encontrado</div>`;
            }
            historico.unshift({
                placa,
                data: new Date().toLocaleString()
            });
            renderHistorico();
            loading.innerHTML = "";
        }, 400);
    }

    function renderHistorico(){
        const div = document.getElementById("historico");
        div.innerHTML = "";
        historico.slice(0, 10).forEach(item => {
            div.innerHTML += `
                <div class="item">
                    ${item.placa} - ${item.data}
                </div>
            `;
        });
    }

        /*Botão limpar imputs*/
    document.getElementById("btn-Limpar").addEventListener("click", limpar);

    function limpar() {
        document.getElementById("inputPlaca").value = "";
        document.getElementById("resultado").innerHTML = "";
        document.getElementById("loading").innerHTML = "";
        document.getElementById("inputPlaca").focus();
    }

/*Botão limpar recolher e espandir*/    
const btnToggle = document.getElementById("toggleHistorico");
const historicoBox = document.getElementById("historico");

btnToggle.addEventListener("click", () => {
    historicoBox.classList.toggle("recolhido");
    btnToggle.textContent = historicoBox.classList.contains("recolhido")
        ? "🔼"
        : "🔽";
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js")
        .then(() => console.log("Service Worker registrado"))
        .catch(err => console.error("Erro:", err));
}