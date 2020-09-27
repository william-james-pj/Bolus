const intemMaxPorPagina = 12;

const menuItens = document.querySelectorAll(".list");
menuItens.forEach((menuItem) => {
  menuItem.onclick = function () {
    let valor = this.getAttribute("data-filter");
    removerClass(menuItens, "active", 0, menuItens.length);
    menuItem.classList.add("active");
    limparItens();
    filtrarItens(valor);
    controlePagina();
  };
});
filtrarItens = (itemClass) => {
  let itens = document.querySelectorAll(".itemBox");
  itens.forEach((item) => {
    if (item.classList.contains(itemClass)) {
      item.classList.remove("displayNone");
    } else {
      item.classList.add("displayNone");
    }
  });
};

function limparItens() {
  let itens = document.querySelectorAll(".itemBox");
  removerClass(itens, "displayNone", 0, itens.length);
  removerClass(itens, "displayPaginacaoNone", 0, itens.length);
  let buttons = document.querySelectorAll("#paginacao .button");
  buttons.forEach((button) => {
    button.remove();
  });
}

controlePagina();
function controlePagina() {
  let itens = document.querySelectorAll(".itemBox:not(.displayNone)");
  exibirPaginacao(itens.length);
  paginacaoClick(itens);
  esconderItens(itens);
}

function exibirPaginacao(numItens) {
  let numeroDePagina =
    numItens <= intemMaxPorPagina ? 0 : numItens / intemMaxPorPagina;
  for (let index = 0; index < numeroDePagina; index++) {
    let div = document.createElement("div");
    div.classList.add("button");
    div.setAttribute("data-pagina", index + 1);
    document.querySelector("#paginacao .container").appendChild(div);
  }
  numeroDePagina != 0
    ? document.querySelector("#paginacao .button").classList.add("active")
    : null;
}

function paginacaoClick(itens) {
  let buttons = document.querySelectorAll("#paginacao .button");
  buttons.forEach((button) => {
    button.onclick = function () {
      let _this = this;
      if (_this.classList.contains("active")) {
        return false;
      } else {
        document
          .querySelector("#paginacao .button.active")
          .classList.remove("active");
        _this.classList.add("active");
        paginacaoControle(_this.getAttribute("data-pagina"), itens);
      }
    };
  });
}

function esconderItens(itens) {
  for (let index = intemMaxPorPagina; index < itens.length; index++) {
    addClass(itens[index], "displayPaginacaoNone", 0, 1, 0);
  }
}

function paginacaoControle(pagina, itens) {
  removerClass(itens, "displayPaginacaoNone", 0, itens.length);
  for (let index = 0; index < itens.length; index++) {
    if (
      index < pagina * intemMaxPorPagina - intemMaxPorPagina ||
      index >= intemMaxPorPagina * pagina
    ) {
      addClass(itens[index], "displayPaginacaoNone", 0, 1, 0);
    }
  }
}

function removerClass(array, classItem, qtdIni, qtdFin, umItem = 1) {
  if (umItem) {
    for (let index = qtdIni; index < qtdFin; index++) {
      array[index].classList.remove(classItem);
    }
  } else {
    array.classList.remove(classItem);
  }
}
function addClass(array, classItem, qtdIni, qtdFin, umItem = 1) {
  if (umItem) {
    for (let index = qtdIni; index < qtdFin; index++) {
      array[index].classList.add(classItem);
    }
  } else {
    array.classList.add(classItem);
  }
}

// Modal
const modalFundo = document.querySelector("#modalContainer");
const imgItens = document.querySelectorAll(".itemBox");

imgItens.forEach((imgItem) => {
  imgItem.onclick = function () {
    let valor = this.getAttribute("modal-item");
    let imgBox = document.querySelector(`[modal-item="${valor}"] img`);
    criarModal(imgBox, valor);
    buttonCloseModal();
    addClass(modalFundo, "displayBlock", 0, 1, 0);
    removerClass(modalFundo, "displayNone", 0, 1, 0);
  };
});

function criarModal(imgBox, valor) {
  let div = document.createElement("div");
  div.classList.add("modal");

  let divHeader = document.createElement("div");
  divHeader.classList.add("modalHeader");
  let span = document.createElement("span");
  span.classList.add("close");
  divHeader.appendChild(span);
  div.appendChild(divHeader);

  let divConteudo = document.createElement("div");
  divConteudo.classList.add("modalConteudo");
  let divImg = document.createElement("div");
  divImg.classList.add("imgModal");
  divImg.appendChild(imgBox.cloneNode(true));
  divConteudo.appendChild(divImg);
  let texto = document.createElement("div");
  texto.classList.add("texto");
  texto.textContent = valor;
  divConteudo.appendChild(texto);
  div.appendChild(divConteudo);

  modalFundo.appendChild(div);
}

modalFundo.onclick = function () {
  fecharModal();
};

function buttonCloseModal() {
  const closeModalIten = document.querySelector(".modal .close");
  closeModalIten.onclick = function () {
    fecharModal();
  };
}

function fecharModal() {
  let modalAberto = document.querySelector("#modalContainer .modal");
  if (modalAberto != null) { 
    modalFundo.removeChild(modalAberto);
  }
  removerClass(modalFundo, 'displayBlock', 0, 1, 0);
  addClass(modalFundo, 'displayNone', 0, 1, 0);
}

/*
// Modal
const modalFundo = document.querySelector("#modalContainer");
const imgItens = document.querySelectorAll(".itemBox");

imgItens.forEach((imgItem) => {
  imgItem.onclick = function () {
    let valor = this.getAttribute("modal-item"); 
    let modal = document.querySelector(`.modal[modal-item=${valor}]`);
    addClass(modal, 'displayBlock', 0, 1, 0);
    addClass(modalFundo, 'displayBlock', 0, 1, 0);
    removerClass(modalFundo, 'displayNone', 0, 1, 0);
  };
});

modalFundo.onclick = function () {
  fecharModal();
};

const closeModalItens = document.querySelectorAll(".modal .close");
closeModalItens.forEach((closeModalIten) => {
  closeModalIten.onclick = function () {
    fecharModal();
  };
});

function fecharModal() {
  let modalAberto = document.querySelector("#modalContainer .displayBlock");
  if (modalAberto != null) {
    removerClass(modalAberto, 'displayBlock', 0, 1, 0);
  }
  removerClass(modalFundo, 'displayBlock', 0, 1, 0);
  addClass(modalFundo, 'displayNone', 0, 1, 0);
}



 */
