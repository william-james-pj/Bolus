/* Nav */
const menuNav = document.querySelector(".menuBotao");
menuNav.onclick = function () {
  let ul = document.querySelector("nav ul");
  if (menuNav.classList.contains("closeMenu")) {
    menuNav.classList.remove("closeMenu");
    ul.classList.remove("showMenu");
  } else {
    menuNav.classList.add("closeMenu");
    ul.classList.add("showMenu");
  }
  let lis = document.querySelectorAll("nav ul li");
  lis.forEach((li) => {
    li.onclick = function () {
      ul.classList.remove("showMenu");
      menuNav.classList.remove("closeMenu");
    };
  });
};
const menuItems = document.querySelectorAll('nav a[href^="#"]');
function getScrollTopByHref(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}
function scrollToPosition(to) {
  window.scroll({
    top: to,
    behavior: "smooth",
  });
}
function scrollToIdOnClick(event) {
  event.preventDefault();
  const to = getScrollTopByHref(event.currentTarget) - 65.6;
  scrollToPosition(to);
}
menuItems.forEach((item) => {
  item.addEventListener("click", scrollToIdOnClick);
});

/* Receitas */
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
    let tipoItem = this.getAttribute("tipoItem");
    criarModal(imgBox, valor, tipoItem);
    buttonCloseModal();
    addClass(modalFundo, "displayBlock", 0, 1, 0);
    removerClass(modalFundo, "displayNone", 0, 1, 0);
  };
});

function criarModal(imgBox, valor, tipoItem) {
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

  let textoContainer = document.createElement("div");
  textoContainer.classList.add("textoContainer");

  let h3 = document.createElement("H3");
  let t2 = document.createTextNode(tipoItem);
  h3.appendChild(t2);
  h3.classList.add("titleText");
  textoContainer.appendChild(h3);

  let p = document.createElement("P");
  var t = document.createTextNode(valor);
  p.appendChild(t);
  textoContainer.appendChild(p);
  divConteudo.appendChild(textoContainer);
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
  removerClass(modalFundo, "displayBlock", 0, 1, 0);
  addClass(modalFundo, "displayNone", 0, 1, 0);
}
