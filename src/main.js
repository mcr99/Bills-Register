import {facturas} from "./utilities";

let bills = [...facturas]

/**
 * @description Dentro  de una funcion llamada todos: itera el array facturas e imprime en consola cada uno de los objetos que se encuentran dentro del array. 
 */

function all (array){
  tableBody.innerHTML = ""
  array.forEach(element => {
    row(element)
  });
}


/**
* @description Dentro de una funcion llamada pendientes: itera el array facturas e  imprime en consola cada uno de los objetos cuyo estado sea igual a pendiente 
*/

function pending (array){
  tableBody.innerHTML = ""
  array.forEach(element => {
      if(element.estado === "pendiente"){
    row(element)
  }
  })
}


/**
* @description Dentro  de una funcion llamada pagadas: itera el array facturas e imprime en consola cada uno de los objetos cuyo estado sea igual a pagadas 
*/

function paid (array){
  tableBody.innerHTML = ""
  array.forEach(element => {
      if(element.estado === "pagada"){
    row(element)
  }
  })
}


/**
 * @description En el html encontraras un  ul que contiene tres li.  A cada uno de esos li agregaras un escuchador de evento click y utilizaras las fuciones creadas en los pasos anteriores.
 *  
 */

let buttonAll = document.querySelector("#button_all")

buttonAll.addEventListener("click", function(){
  all(bills)
})

let buttonPending = document.querySelector("#button_pending")

buttonPending.addEventListener("click", function(){
  pending(bills)
})

let buttonPaid = document.querySelector("#button_paid")

buttonPaid.addEventListener("click", function(){
  paid(bills)
})


let tableBody = document.querySelector("#table_body")

function row(element){
  if (element.estado === "pagada") {
  tableBody.innerHTML += `
  <tr>
    <td class="px-2 py-1 border border-[#dddddd]">${element.id}</td>
    <td class="px-2 py-1 border border-[#dddddd]">${element.numeroFactura}</td>
    <td class="px-2 py-1 border border-[#dddddd]">${element.descripcion}</td>
    <td class="px-2 py-1 border border-[#dddddd] text-[#00ce00]">${element.estado}</td>
    <td class="px-2 py-1 border border-[#dddddd]">${element.fecha}</td>
    <td class="px-5 py-1 border border-[#dddddd]"><button class="border border-[#767676] bg-[#f0f0f0] rounded-sm px-1 text-sm cursor-pointer delete_button" data-id="${element.id}" >Del</button></td>
  </tr>
  `
  } else if (element.estado === "pendiente") {
  tableBody.innerHTML += `
  <tr>
    <td class="px-2 py-1 border border-[#dddddd]">${element.id}</td>
    <td class="px-2 py-1 border border-[#dddddd]">${element.numeroFactura}</td>
    <td class="px-2 py-1 border border-[#dddddd]">${element.descripcion}</td>
    <td class="px-2 py-1 border border-[#dddddd] text-[#ff0000]">${element.estado}</td>
    <td class="px-2 py-1 border border-[#dddddd]">${element.fecha}</td>
    <td class="px-5 py-1 border border-[#dddddd] "></td>
  </tr>
  `
  }


  }

let addButton = document.querySelector("#add_button")
let modalWindow = document.querySelector("#modal_window")
let closeButton = document.querySelector("#close_button")


function toggleModal (){ 
  modalWindow.classList.toggle("hidden")
}

addButton.addEventListener("click", () => {
  toggleModal()
})

closeButton.addEventListener("click", () => {
  toggleModal()
})


let inputBillNumber = document.querySelector("#bill_number")
let inputDescription = document.querySelector("#description")
let inputStatus = document.querySelector("#status")
let inputDate = document.querySelector("#date")
let buttonModalAdd = document.querySelector("#modal_add")

let saved = localStorage.getItem("bills")
if(saved) {
  bills = JSON.parse(saved);
  all(bills)
}

let counter = bills.length > 0 ? Math.max(...bills.map(bill => bill.id)) : 0

buttonModalAdd.addEventListener("click" , () => {
  if (inputBillNumber.value.trim() === "" || inputDescription.value.trim() === "" || inputStatus.value.trim() === "" || inputDate.value.trim() === ""){
    return
  }

  counter ++
  let newBill = {
    id: counter,
    numeroFactura: inputBillNumber.value,
    descripcion: inputDescription.value,
    estado: inputStatus.value,
    fecha: inputDate.value,
  }

  bills.push(newBill)
  localStorage.setItem("bills", JSON.stringify(bills))

    inputBillNumber.value = ""
    inputDescription.value = ""
    inputStatus.value = ""
    inputDate.value = ""
    
    all(bills)
    toggleModal()
})

tableBody.addEventListener("click", function (e) {
    if(e.target.classList.contains("delete_button")){
      let id = Number(e.target.dataset.id)
      deleteRow(id)
    }
  })

function deleteRow (id) {
  bills = bills.filter(bill => bill.id !== id)
  localStorage.setItem("bills", JSON.stringify(bills))
  all(bills)
}

