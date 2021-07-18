"strict-mode";

const pizza = document.querySelectorAll(".pizza-choice");

const listaPizza = document.getElementById("pizza");

const listaBibite = document.getElementById("bibita");

const bibita = document.querySelectorAll(".bibita-choice");

const pizzahidden = document.querySelector(".valore_pizza");

const bibitahidden = document.querySelector(".valore_bibita");

const btnform = document.querySelector(".btn-conferma-promo");

const promo = document.querySelector(".promoBibitaPizza");

const possibilita_pizze = document.querySelector(".possibili-pizze");

const possibilita_bibite = document.querySelector(".possibili-bibite");

let nomeItem;

let variValoriPizza = [];
let variValoriBibita = [];

const resettaPizza = document.querySelector(".resetta-pizza");

const resettaBibita = document.querySelector(".resetta-bibita");

const SommaValori = (accumulator, currentValue) => accumulator + currentValue;

const promodefault = function () {
  promo.style.backgroundColor = "rgba(255, 255, 255, 0.2)";

  promo.value = "Promo Prezzo";
};

const erroreInserimentoDati = function () {
  promo.value = "Promo non valida, riprovare";
  promo.style.backgroundColor = "red";
};

const funzMomentCalm = function (callback) {
  callback.classList.add("sparizione");
  setTimeout(function () {
    callback.classList.remove("sparizione");
  }, 300);
};

const funzCreoElemento = function (
  element,
  val,
  array,
  creoEl,
  input,
  listaCreazioneElemento
) {
  element.classList.add("attivo");
  nomeItem = element.getAttribute("data-name");
  val = Number(element.getAttribute("data-value"));

  array.push(val);

  input.setAttribute("value", array.reduce(SommaValori));

  creoEl = `<p class="appareItem" value="${val}">${nomeItem}</p>`;

  listaCreazioneElemento.insertAdjacentHTML("afterbegin", creoEl);
};

const funzprendovalore = function (elemento, e) {
  let valoreNumericoItem;
  elemento.forEach((item) => {
    item.classList.remove("attivo");
    e.target.classList.add("attivo");

    if (
      item.classList.contains("attivo") &&
      item.classList.contains("item-pizza")
    ) {
      let pizzaItem;
      funzCreoElemento(
        item,
        valoreNumericoItem,
        variValoriPizza,
        pizzaItem,
        pizzahidden,
        possibilita_pizze
      );

      promodefault();
    } else if (
      item.classList.contains("attivo") &&
      item.classList.contains("item-bibita")
    ) {
      let bibitaItem;
      funzCreoElemento(
        item,
        valoreNumericoItem,
        variValoriBibita,
        bibitaItem,
        bibitahidden,
        possibilita_bibite
      );

      promodefault();
    }
  });
};

listaPizza.addEventListener("click", function (e) {
  funzprendovalore(pizza, e);

  funzMomentCalm(listaPizza);
});

listaBibite.addEventListener("click", function (e) {
  funzprendovalore(bibita, e);

  funzMomentCalm(listaBibite);
});

btnform.addEventListener("click", function (e) {
  e.preventDefault();

  if (variValoriPizza.length !== 0 && variValoriBibita.length !== 0) {
    const totalePrezzo = Number(pizzahidden.value) + Number(bibitahidden.value); // totale prezzo bibita + pizza

    const percentualeSconto = totalePrezzo * 0.1; // sconto 10%

    promo.style.backgroundColor = "#76b852";

    promo.value = `Spenderai ${totalePrezzo - percentualeSconto} €`; // promo bibita (sconto del 10%)
  } else {
    erroreInserimentoDati();
  }
});

resettaBibita.addEventListener("click", function (e) {
  e.preventDefault();
  if (possibilita_bibite.firstElementChild === null) return promodefault();

  const valoreUltimoElementoBibite = Number(
    possibilita_bibite.firstElementChild.getAttribute("value")
  );
  promodefault();

  const valoreTotaleElbibite = Number(bibitahidden.getAttribute("value"));

  const rimanenzaValoreBibita =
    valoreTotaleElbibite - valoreUltimoElementoBibite;

  bibitahidden.setAttribute("value", rimanenzaValoreBibita);

  variValoriBibita.pop();

  possibilita_bibite.firstChild.classList.add("viaEl");

  setTimeout(function () {
    possibilita_bibite.removeChild(possibilita_bibite.firstChild);
  }, 400);
});

resettaPizza.addEventListener("click", function (e) {
  e.preventDefault();
  if (possibilita_pizze.firstElementChild === null) return promodefault();
  const valoreUltimoElementoPizze = Number(
    possibilita_pizze.firstElementChild.getAttribute("value")
  );

  promodefault();

  const valoreTotaleElpizze = Number(pizzahidden.getAttribute("value"));

  const rimanenzaValorePizza = valoreTotaleElpizze - valoreUltimoElementoPizze;

  pizzahidden.setAttribute("value", rimanenzaValorePizza);

  variValoriPizza.pop();
  possibilita_pizze.firstChild.classList.add("viaEl");

  setTimeout(function () {
    possibilita_pizze.removeChild(possibilita_pizze.firstChild);
  }, 400);
});
