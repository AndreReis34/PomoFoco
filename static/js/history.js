const dados = {
    "2026-01-01": 120,
    "2026-01-02": 30,
    "2026-01-03": 0,
    "2026-01-04": 90,
};

async function carregarDados() {
    const resp = await fetch("/carregarDB");
    const dadosBrutos = await resp.json();
    for (const data in dadosBrutos) {
        const total = dadosBrutos[data].totalMinutos;
        dados[data] = total;
    }

    gerarHeatmap(dados)
}



function nivelCor(minutos) {
    if (minutos === 0) return "";
    if (minutos <= 60) return "nivel-1";
    if (minutos <= 120) return "nivel-2";
    if (minutos <= 180) return "nivel-3";
    return "nivel-4";
}

function gerarHeatmap(dados) {
    const container = document.getElementById("heatmap");
    container.innerHTML = "";

    // últimos 30 dias
    for (let i = 29; i >= 0; i--) {
        const data = new Date();
        data.setDate(data.getDate() - i);

        const chave = data.toISOString().split("T")[0];
        const minutos = dados[chave] || 0;

        const div = document.createElement("div");
        div.classList.add("dia");

        const nivel = nivelCor(minutos);
        if (nivel) div.classList.add(nivel);

        div.title = `${chave}: ${minutos} min`;

        container.appendChild(div);
    }
}

carregarDados()