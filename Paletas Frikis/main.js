"use strict";

const paletteList = document.querySelector(".palettesUl")
const searchInput = document.querySelector(".searchInput")
const searchBtn = document.querySelector(".searchBtn")

let palettes; //la globalizo para poder usarla en el input del botón
const savedPalettes = JSON.parse(localStorage.getItem("myPalettes"));

const SERVER_URL = 'https://beta.adalab.es/ejercicios-de-los-materiales/js-ejercicio-de-paletas/data/palettes.json';


if (savedPalettes !== null) {
    palettes = savedPalettes;
    renderPalettes(savedPalettes);


} else {
    fetch(SERVER_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            palettes = data.palettes;
            renderPalettes(palettes);
            localStorage.setItem("myPalettes", JSON.stringify(palettes));

        })
}

function renderPalettes(palettesData) {

    let content = "";
    palettesData.forEach(palettes => {
        if (palettes.selected === true) {
            content += `<div class = "completePalette selected" > `
            content += `
                 <h3>${palettes.name}</h3>`;

            content += `<div class="palette" >`
            palettes.colors.forEach(color => {

                content += `
             <div class="palette__color " id ="${palettes.name}" style ="background-color:#${color}"> </div> `
            })
            content += `</div> `
            content += `</div> `


        } else {
            content += `<div class = "completePalette" > `
            content += `
                 <h3>${palettes.name}</h3>`;

            content += `<div class="palette" >`
            palettes.colors.forEach(color => {

                content += `
             <div class="palette__color " id ="${palettes.name}" style ="background-color:#${color}"> </div> `
            })
            content += `</div> `
            content += `</div> `
            palettes.selected = false;
        }



    });

    console.log(palettes);

    paletteList.innerHTML += content;
    /* const completePalettes = document.querySelectorAll('.completePalette');
     completePalettes.forEach(completePalette => {
         completePalette.addEventListener('click', () => {
             completePalette.classList.toggle("selected");
         });
 
     });*/
}

function handleClickCheckbox(event) {

    const inputiD = event.target.id

    console.log(inputiD);
    const paletteindex = palettes.findIndex((items) => {

        return items.name === inputiD;
    })
    console.log(paletteindex);

    console.log(palettes);
    console.log(palettes[paletteindex]);
    if (palettes[paletteindex].selected) {

        palettes[paletteindex].selected = false;
    } else {
        palettes[paletteindex].selected = true;
    }
    //palettes[paletteindex].selected ? true : false;


    paletteList.innerHTML = "";
    renderPalettes(palettes);

    localStorage.setItem("myPalettes", JSON.stringify(palettes));

}

paletteList.addEventListener("click", handleClickCheckbox);

function handleFilter(event) {
    event.preventDefault();
    const searchTerm = searchInput.value; //obtenemos valor del input
    //funcion filter, guarda en filteredPalettes los elementos que coincidan con el filtro
    const filteredPalettes = palettes.filter(palette => {

        console.log(palette);
        return palette.from.toLowerCase().includes(searchTerm); // retorna los elementos que contengan lo que se busca
    });
    paletteList.innerHTML = "";
    renderPalettes(filteredPalettes); // renderiza el nuevo array
    console.log(filteredPalettes);

}

searchBtn.addEventListener("click", handleFilter);


