'use script';

const blocos = document.querySelectorAll('.bloco');
let fimDeJogo = false;
// let checarTurno = true;
const PlayerX = 'X';
const PlayerO = 'O';

const combinacoa = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];

document.addEventListener('click', (event) => {
    if (event.target.matches('.bloco')) {
        //console.log(event.target.id);
        jogada(event.target.id, PlayerX);
        setTimeout(() => bot(), 700);
    }
});

function bot() {
    const posicoesDisponiveis = [];
    for (index in blocos) {
        if (!isNaN(index)) {
            if (
                !blocos[index].classList.contains('X') &&
                !blocos[index].classList.contains('O')
            ) {
                posicoesDisponiveis.push(index);
            }
        }
    }

    const posicaoAleatoria = Math.floor(
        Math.random() * posicoesDisponiveis.length
    );

    if (!fimDeJogo) {
        jogada(posicoesDisponiveis[posicaoAleatoria], PlayerO);
    }
}

function jogada(id, turno) {
    const bloco = document.getElementById(id);
    bloco.textContent = turno;
    bloco.classList.add(turno);
    checarVencendor(turno);
}

function checarVencendor(turno) {
    const vencedor = combinacoa.some((comb) => {
        return comb.every((index) => {
            return blocos[index].classList.contains(turno);
        });
    });

    if (vencedor) {
        encerrarJogo(turno);
    } else if (checarEmpate()) {
        encerrarJogo();
    }
}

function checarEmpate() {
    let x = 0;
    let o = 0;

    for (index in blocos) {
        if (!isNaN(index)) {
            if (blocos[index].classList.contains(PlayerX)) {
                x++;
            }

            if (blocos[index].classList.contains(PlayerO)) {
                o++;
            }
        }
    }

    return x + o === 9 ? true : false;
}

function encerrarJogo(vencedor = null) {
    fimDeJogo = true;
    const telaEscura = document.getElementById('tela-escura');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    let mensagem = null;

    telaEscura.style.display = 'block';
    telaEscura.append(h2);
    telaEscura.append(h3);

    if (vencedor) {
        h2.innerHTML = `Jogador <span>${vencedor}</span> venceu`;
    } else {
        h2.innerHTML = 'Empate';
    }

    let contador = 5;
    setInterval(() => {
        h2.innerHTML = `Continue ${contador--}`;
    }, 1000);

    setTimeout(() => location.reload(), 5000);
}
