"use strict";

const paletteList = document.querySelector(".palettesUl")
const searchInput = document.querySelector(".searchInput")
const searchBtn = document.querySelector(".searchBtn")

let palettes;

const SERVER_URL = 'https://beta.adalab.es/ejercicios-de-los-materiales/js-ejercicio-de-paletas/data/palettes.json';

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

    })

function renderPalettes(palettesData) {


    let content = "";
    palettesData.forEach(palettes => {

        content += `<div class = "completePalette"> `
        content += `
            <h3>${palettes.name}</h3>`;

        content += `<div class="palette" >`
        palettes.colors.forEach(color => {

            content += `
                 <div class="palette__color" style ="background-color:#${color}"> </div> `
        })
        content += `</div> `
        content += `</div> `

    });

    paletteList.innerHTML += content;

}



searchBtn.addEventListener("click", handleFilter);

function handleFilter(event) {
    event.preventDefault();
    const searchTerm = searchInput.value;

    const filteredPalettes = palettes.filter(palette => {

        console.log(palette);
        return palette.from.toLowerCase().includes(searchTerm);
    });
    paletteList.innerHTML = "";
    renderPalettes(filteredPalettes);
    console.log(filteredPalettes);
}

