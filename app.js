import confetti from 'https://cdn.skypack.dev/canvas-confetti';
const tileDisplay=document.querySelector('.tile-container');
const keyboard=document.querySelector('.key-container');
const messageDisplay=document.querySelector('.message-container');


var word = ['PERRO', 'ARBOL','BRAZO', 'MUJER','GENTE','MUSLO','ILUSO','ISLAS','LABIO','TARDE','NOCHE','BARBA','LUNES','LINEA','LIMON','LIRIO','LABIO','PALMA','LUNAS','NIETO','PADRE','NUERA','BICHO','MOSCA','PULPO','OREJA','TIGRE','PECHO','CARNE','GRIPE','SALUD','AMIGO','MADRE','PRIMO','CAMPO','SELVA','RATON','SALIR','SALSA','SANAR','PLAYA','COSTA','OVEJA','SIETE','SILLA','NADIE','SORDO','TAREA','CERRO','TARTA','FRUTA','ARBOL','AVENA','YEGUA','CERDO','TRIGO','CARNE','FECHA','EPOCA','LLAVE','SIGLO','MUNDO','CLIMA','NIEVE','CIELO','NORTE','CALOR','HIELO','VAPOR','FUEGO','SUELO','METAL','PLATA','PLOMO','LITRO','GRAMO','TOTAL','EQUIPO', 'CARGO','NORMA','HOTEL','PANEL','HOGAR','CLAVO','BOLSO','LIBRO','BOTON','GAFAS','ABRIGO','FALDA','AVION','PUNTO','PAPEL','CARTA','TEXTO','INGLES','COLOR','NEGRO','VERDE','AUTOR','CLASE','CURSO','FORMA','AYUDA','FAVOR','APOYO','ORDEN','CINCO','FONDO','GRUPO','EXITO','ETAPA','SERIE','GRADO','VISTA','TACTO','NIVEL','DOLOR','RAZON','DESEO','SUSTO','MIEDO','FALSO','MAYOR','MENOR','VIEJO','JOVEN','USUAL','UNICO','DEBIL','IGUAL','LOCAL','RURAL','AJENO','SUAVE','FIRME','DULCE','FELIZ','NACER','TOMAR','NEGAR','JUGAR','CREAR','SALIR','BEBER','NUNCA','JAMAS','TARDE','AHORA','CERCA'];

var wordle = word[Math.floor(Math.random() * word.length)];
//console.log('La palabra es: ' + wordle);
//const wordle = 'CORTO';

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

guessRows.forEach((guessRow, guessRowIndex) =>{
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);
    guessRow.forEach((guess, guessIndex) =>{
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id','guessRow-' + guessRowIndex + '-tile-' + guessIndex);
        tileElement.classList.add('tile');

        rowElement.append(tileElement);
    })

    tileDisplay.append(rowElement);
})

//Posicion de las teclas
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

//Creando el teclado
keys.forEach(key =>{
    const buttonElement=document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute("id", key);
    buttonElement.addEventListener('click',()=> handleClick(key));
    keyboard.append(buttonElement);
})

const handleClick = (key) =>{
    //console.log('clicked', key);
    if(key === '«'){
        deleteLetter();
        //console.log('guessRows', guessRows);
        return 
    }
    if(key === 'ENTER'){
        checkRow();
        //console.log('guessRows', guessRows);
        return
    }
    addLetter(key);
    
}

//Agregando letra 
const addLetter = (letter) =>{
    if(currentTile < 5 && currentRow < 6){
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute('data', letter);
        currentTile++
        //console.log('guessRow', guessRows);
    } 
}

//Eliminar letra
const deleteLetter = ()=>{
    if(currentTile > 0){
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '')
    }
}

//Validando las columnas
const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if(currentTile > 4){
        //console.log('guess is ' + guess, 'wordle is ' + wordle);
        flipTile();
        if(wordle == guess){
            showMessage('¡Adivinaste!');
            confetti()
            isGameOver = true;
            return
        }else if(!word.includes(wordle)){
            showMessage('Esta palabra no existe');
            //console.log('no existe')
        }
        else{
            if(currentRow >= 5){
                isGameOver = false;
                showMessage('La palabra es: ' + wordle);
                return
            }
            if(currentRow < 5){
                currentRow++
                currentTile = 0
            }
        }
    }
}

//Mostrar mensaje de adivido y juego terminado
const showMessage = (message) =>{
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 3000);
}

const addColorToKey = (keyLetter, color) =>{
    const key = document.getElementById(keyLetter);
    key.classList.add(color);
}


const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;

    let checkWordle = wordle;
    const guess = [];

    rowTiles.forEach(tile =>{
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index)=>{
        if(guess.letter == wordle[index]){
            guess.color = 'green-overlay';
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)){
            guess.color = 'yellow-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    })



    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data');

        setTimeout(() =>{
            tile.classList.add('flip')
            tile.classList.add(guess[index].color);
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index);
    })
}

let newGameBtn = document.querySelector('.button');
newGameBtn.addEventListener('click',()=>{
    location.reload();
});
