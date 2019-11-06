function setupGame() {
  const width = 10
  const cells = []
  const grid = document.querySelector('.grid')
  let numberMines = 0
  let position = 0
  let mineCells = []

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    cells.push(cell)
    grid.appendChild(cell)

    const mine = document.createAttribute('data-mine')
    mine.value = 'false'
    cell.setAttributeNode(mine)

    cell.addEventListener('click', function () {
      clickCell(this)
      // console.log(this)
    })
    cell.addEventListener('mousedown', (event) => {
      if (event.button === 2) {
        // cell.style.backgroundImage = 'url(images/Minesweeper_flag.png)'
        cell.classList.toggle('right-click')
      }
    })

  }

  for (let i = 0; i < 16; i++) {
    mineCells = cells[Math.floor(Math.random() * 100)]
    mineCells.setAttribute('data-mine', 'true')
    // mineCells.style.backgroundColor = 'red'
  }

  function showMines() {
    for (var i = 0; i < width ** 2; i++){
      if (cells[i].getAttribute('data-mine') === 'true'){
        cells[i].className = 'mine-exposed'
      }
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

