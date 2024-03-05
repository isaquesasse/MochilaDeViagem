const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criarElement(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const apagaNome = evento.target.elements['nome']
    const apagaQuantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value)

    const atualItem = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        atualItem.id = existe.id
        
        atualizaElemento(atualItem)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = atualItem
    } else {
        atualItem.id = itens[itens.length -1] ? (itens[itens.length-1]).id+1 : 0;

        criarElement(atualItem)

        itens.push(atualItem)
    } 

    localStorage.setItem("itens", JSON.stringify(itens))

    apagaNome.value = ""
    apagaQuantidade.value = ""
})

function criarElement(item) {
    const newItem = document.createElement('li')
    newItem.classList.add("item")

    const itemNumber = document.createElement('strong')
    itemNumber.innerHTML = item.quantidade
    itemNumber.dataset.id = item.id
    newItem.appendChild(itemNumber)

    newItem.innerHTML += item.nome

    newItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(newItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(item) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.classList.add('botaoDeleta')
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, item.id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
}