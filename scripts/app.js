function setupGame() {
  const grid = document.querySelector('.grid')
  const width = 10
  let cells = []
  const createMines = 16
  let numberMines = 0
  let position = 0
  let mineCells = []


  createGrid()
  displayNumberMinesLeft()

  function createGrid() {
    // grid.innerHTML = ''
    for (let i = 0; i < width ** 2; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      grid.appendChild(cell)

      const mine = document.createAttribute('data-mine')
      mine.value = 'false'
      cell.setAttributeNode(mine)

      cell.addEventListener('mousedown', function (event) {
        if (document.querySelector('input').checked === true) {
          if (event.button === 0) {
            cell.classList.toggle('right-click')
            displayNumberMinesLeft()
            // console.log(this)
          }
        } else {
          if (event.button === 0)
            clickCell(this)
        }
      })
      cell.addEventListener('mousedown', (event) => {
        if (event.button === 2) {
          // cell.style.backgroundImage = 'url(images/Minesweeper_flag.png)'
          cell.classList.toggle('right-click')
          displayNumberMinesLeft()
        }
      })


    }
    // for (let i = 0; i < 100; i++){
    //   let randomNum = Math.floor(Math.random() * (width ** 2))
    //   if (cells[randomNum].getAttribute('data-mine') === 'false') {
    //     console.log(cells[i])
    //   }
    // }


    for (let i = 0; i < createMines; i++) {
      const positionNotFound = true
      while (positionNotFound) {
        // eslint-disable-next-line prefer-const
        let randomNum = Math.floor(Math.random() * (width ** 2))
        if (cells[randomNum].getAttribute('data-mine') === 'false') {
          mineCells = cells[randomNum]
          mineCells.setAttribute('data-mine', 'true')
          // mineCells.style.backgroundColor = 'red'
          mineCells.setAttribute('id', 'mine')
          break
        }
      }
    }
  }

  function displayNumberMinesLeft() {
    const minesLeft = document.querySelector('#minesLeft')
    const flags = cells.filter((element) => {
      return element.classList.contains('right-click')
    })
    console.log(mineCells.length)
    console.log(flags.length)
    minesLeft.innerHTML = createMines - flags.length
  }

  function showMines() {
    for (var i = 0; i < width ** 2; i++) {
      if (cells[i].getAttribute('data-mine') === 'true') {
        cells[i].className = 'mine-exposed'
      }
    }
  }

  function showMinesWin() {
    for (var i = 0; i < width ** 2; i++) {
      if (cells[i].getAttribute('data-mine') === 'true') {
        cells[i].className = 'mine-exposed-win'
      }
    }
  }

  function checkForCompletion() {
    let gameComplete = true
    for (var i = 0; i < width ** 2; i++) {
      if (cells[i].getAttribute('data-mine') === 'false' && cells[i].innerHTML === '') {
        gameComplete = false
      }
    }
    if (gameComplete) {
      showMinesWin()
      window.alert('You win!')
    }
  }


  function clickCell(cell) {
    cell.classList.add('clicked')
    position = cells.indexOf(cell)
    if (cell.getAttribute('data-mine') === 'true') {
      //reveal the mine cell.
      showMines()
      window.alert('game over')
    } else {
      // console.log(position)
      checkCells(position)
      checkForCompletion()
      // cell.innerHTML = numberMines

      // const positionsToOpen = [
      //   position - width - 1,
      //   position - width,
      //   position - width + 1,
      //   position - 1,
      //   position + 1,
      //   position + width - 1,
      //   position + width,
      //   position + width + 1
      // ]
      // if (cell.innerHTML === '0') {
      //   positionsToOpen.forEach((adjPosition) => {
      //     checkCells(adjPosition)
      //     cells[adjPosition].innerHTML = numberMines
      //     // if (numberMines === 0) {
      //     //   openAdj = 1
      //     //   checkCells(adjPosition)
      //     //   cells[adjPosition].innerHTML = numberMines
      //     //   console.log('openAdj')
      //     // } else { 
      //     //   openAdj = 0
      //     //   console.log('0adj')
      //     // }
      //   })
      // }



      // } else if ((cell.getAttribute('data-mine') === 'false') && (position + 1) % 10 === 0) {
      //   console.log(position)
      //   checkCells(position)
      //   cell.innerHTML = numberMines
      //   numberMines = 0
      // } else if ((cell.getAttribute('data-mine') === 'false') && position % 10 === 0) {
      //   console.log(position)
      //   checkCells(position)
      //   cell.innerHTML = numberMines
      //   numberMines = 0
      // }
    }
  }

  // const cell = document.querySelectorAll('div')
  // if (cell.innerHTML === '0') {
  //   checkCells(cells.indexOf(cell))
  // }

  // console.log(cells.length)


  function checkCells(position) {
    if ((position + 1) % 10 !== 0 && position % 10 !== 0) {
      const positions = [
        position - width - 1,
        position - width,
        position - width + 1,
        position - 1,
        position + 1,
        position + width - 1,
        position + width,
        position + width + 1
      ]
      console.log('yes')
      positions.forEach((position) => {
        if (position >= 0 && position < width ** 2 && (cells[position].getAttribute('data-mine') === 'true')) {
          numberMines += 1
        }
      })
    } else if ((position + 1) % 10 === 0) {
      const positions = [
        position - width - 1,
        position - width,
        position - 1,
        position + width - 1,
        position + width
      ]
      console.log(positions)
      positions.forEach((position) => {
        if (position >= 0 && position < width ** 2 && (cells[position].getAttribute('data-mine') === 'true')) {
          numberMines += 1
          console.log(numberMines)
        }
      })
    } else if ((cells[position].getAttribute('data-mine') === 'false') && position % 10 === 0) {
      const positions = [
        position - width + 1,
        position - width,
        position + 1,
        position + width + 1,
        position + width
      ]
      console.log(positions)
      positions.forEach((position) => {
        if (position >= 0 && position < width ** 2 && (cells[position].getAttribute('data-mine') === 'true')) {
          numberMines += 1
          console.log(numberMines)
        }
      })
    }
    cells[position].innerHTML = numberMines
    if (cells[position].innerHTML === '0') {
      for (let i = position - 1; i < position + 2; i++) {
        for (let j = -(width); j <= width; j += width) {
          if (typeof cells[i + j] !== 'undefined' && (position % 10 !== 0) && (position + 1) % 10 !== 0) {
            if (cells[i + j].innerHTML === '') {
              clickCell(cells[i + j])
            }
          }
        }
      } for (let i = position - 1; i < position + 1; i++) {
        for (let j = -(width); j <= width; j += width) {
          if (typeof cells[i + j] !== 'undefined' && (position % 10 !== 0) && (position + 1) % 10 === 0) {
            if (cells[i + j].innerHTML === '') {
              clickCell(cells[i + j])
            }
          }
        }
      } for (let i = position; i < position + 2; i++) {
        for (let j = -(width); j <= width; j += width) {
          if (typeof cells[i + j] !== 'undefined' && (position % 10 === 0)) {
            if (cells[i + j].innerHTML === '') {
              clickCell(cells[i + j])
            }
          }
        }
      }
    }
    numberMines = 0
  }

  const button = document.querySelector('button')
  console.log(grid)


  function reset() {
    grid.innerHTML = ''
    cells = []
    createGrid()
    displayNumberMinesLeft()
  }
  button.addEventListener('click', reset)



  // function checkCellsRightWall(position) {
  //   const positions = [
  //     position - width - 1,
  //     position - width,
  //     position - 1,
  //     position + width - 1,
  //     position + width
  //   ]
  //   console.log(positions)
  //   positions.forEach((position) => {
  //     if (position > 0 && position < 99 && (cells[position].getAttribute('data-mine') === 'true')) {
  //       numberMines += 1
  //       console.log(numberMines)
  //     }
  //   })
  // }

  // function checkCellsLeftWall(position) {
  //   const positions = [
  //     position - width + 1,
  //     position - width,
  //     position + 1,
  //     position + width + 1,
  //     position + width
  //   ]
  //   console.log(positions)
  //   positions.forEach((position) => {
  //     if (position > 0 && position < 99 && (cells[position].getAttribute('data-mine') === 'true')) {
  //       numberMines += 1
  //       console.log(numberMines)
  //     }
  //   })
  // }
}
document.addEventListener('DOMContentLoaded', setupGame)

