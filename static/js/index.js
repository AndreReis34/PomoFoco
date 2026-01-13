let tempo = 0;
let timer = null;
let cicloAtual = 0;
let modo = "foco";

function implementar() {
    const foco = Number(focoInput.value);
    const pausaCurta = Number(pausaCurtaInput.value);
    const pausaLonga = Number(pausaLongaInput.value);
    const intervalo = Number(intervaloInput.value);

    if (foco <= 0 || pausaCurta <= 0 || pausaLonga <= 0 || intervalo <= 0) {
        alert("Todos os valores devem ser maiores que zero.");
        return;
    }

    localStorage.setItem("foco", foco);
    localStorage.setItem("pausaCurta", pausaCurta);
    localStorage.setItem("pausaLonga", pausaLonga);
    localStorage.setItem("intervalo", intervalo);

    alert("Configuração salva.");
}

function iniciar() {
    if (timer) return;

    carregarConfig();
    modo = "foco";
    cicloAtual = 0;
    iniciarContagem(localStorage.getItem("foco") * 60);
}

function iniciarContagem(segundos) {
    tempo = segundos;
    atualizarTela();

    timer = setInterval(() => {
        tempo--;
        atualizarTela();

        if (tempo <= 0) {
            tocarSino()
            proximoCiclo();
        }
    }, 1000);
}

function proximoCiclo() {
    clearInterval(timer);
    timer = null;

    if (modo === "foco") {
        cicloAtual++;
        if (cicloAtual % localStorage.getItem("intervalo") === 0) {
            modo = "pausaLonga";
            iniciarContagem(localStorage.getItem("pausaLonga") * 60);
        } else {
            modo = "pausaCurta";
            iniciarContagem(localStorage.getItem("pausaCurta") * 60);
        }
    } else {
        modo = "foco";
        iniciarContagem(localStorage.getItem("foco") * 60);
    }
}

function parar() {
    clearInterval(timer);
    timer = null;
    status.textContent = "Parado";
}

function atualizarTela() {
    const min = String(Math.floor(tempo / 60)).padStart(2, "0");
    const seg = String(tempo % 60).padStart(2, "0");
    timerDisplay.textContent = `${min}:${seg}`;
    status.textContent = modo.toUpperCase();
}

function carregarConfig() {
    focoInput.value = "";
    pausaCurtaInput.value = "";
    pausaLongaInput.value = "";
    intervaloInput.value = "";
}

function tocarSino() {
    const audio = document.getElementById("somSino");
    audio.currentTime = 0; // reinicia
    audio.play();
}

/* Referências */
const focoInput = document.getElementById("foco")
focoInput.addEventListener("focoInput", e => {
    if (e.target.value < 1) {
        e.target.value = "";
    }
});
const pausaCurtaInput = document.getElementById("pausaCurta")
pausaCurtaInput.addEventListener("pausaCurtaInput", e => {
    if (e.target.value < 1) {
        e.target.value = "";
    }
});
const pausaLongaInput = document.getElementById("pausaLonga")
pausaLongaInput.addEventListener("pausaLongaInput", e => {
    if (e.target.value < 1) {
        e.target.value = "";
    }
});
const intervaloInput = document.getElementById("intervalo")
intervaloInput.addEventListener("intervaloInput", e => {
    if (e.target.value < 1) {
        e.target.value = "";
    }
});
const timerDisplay = document.getElementById("timer");
const status = document.getElementById("status");

/* Carrega cache ao abrir */
window.onload = carregarConfig;
