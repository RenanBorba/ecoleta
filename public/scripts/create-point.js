// seletor (no HTML), querySelector()

// ouvidor de eventos (nesse caso, evento
//   de mudança), addEventListener("change")

//   arrow function (função anônima), () => {}


// document
//   .querySelector("select[name=uf]")
//   .addEventListener("change", () => {
//     console.log("mudou")
//   })

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {

    for(const state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = `<optgroup label="Selecione a Cidade"></optgroup>`
  citySelect.disabled = false

  fetch(url)
    .then(res => res.json())
    .then(cities => {

    for(const city of cities) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }
  })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

// Itens de coleta
// obter todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

// para cada item de itemToCollect
for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target

  // adicionar ou remover classe com JS
  // (classe selected do HTML)
  itemLi.classList.toggle("selected")

  // obter pelo data-id no HTML
  const itemId = itemLi.dataset.id

  // console.log('Item id: ', itemId)

  // verificar se existem itens selecionados,
  // se sim, obter os itens selecionados

  // const alreadySelected = selectedItems.findIndex(function(item) {
    // const itemFound = item == itemId // true ou false
    // return itemFound
  // })

  const alreadySelected = selectedItems.findIndex(item => item == itemId)

  // se já tiver selecionado
  if (alreadySelected >= 0) {
    // retirar da seleção
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId

      return itemIsDifferent
    })

    selectedItems = filteredItems
  } else {
    // se não estiver, adicionar à seleção
    selectedItems.push(itemId)
  }

  // console.log('selectedItems: ', selectedItems)

  // atualizar o campo escondido (hidden)
  // com os itens selecionados
  collectedItems.value = selectedItems
}





