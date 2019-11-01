function setupGame() {
  const width = 10
  const cells = []
  const grid = document.querySelector('.grid')
  let numberMines = 0
  let position = 0
  


  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    cells.push(cell)
    grid.appendChild(cell)

    const mine = document.createAttribute('data-mine')
    mine.value = 'false'
    cell.setAttributeNode(mine)

    cell.addEventListener('click', () => {
      position = cells.indexOf(cell)
      if (cell.getAttribute('data-mine') === 'true'){
        //reveal the mine cell.
        window.alert('game over')
      } else if ((cell.getAttribute('data-mine') === 'false') && (position + 1) % 10 !== 0 && position % 10 !== 0) {
        console.log(position)
        checkCellsCenter(position)
        cell.innerHTML = numberMines
        numberMines = 0
      } else if ((cell.getAttribute('data-mine') === 'false') && (position + 1) % 10 === 0){
        console.log(position)
        checkCellsRightWall(position)
        cell.innerHTML = numberMines
        numberMines = 0
      } else if ((cell.getAttribute('data-mine') === 'false') && position % 10 === 0) {
        console.log(position)
        checkCellsLeftWall(position)
        cell.innerHTML = numberMines
        numberMines = 0
      }
    })
  }

  console.log(cells.length)

  for (let i = 0; i < 20; i++) {
    const mineCells = cells[Math.floor(Math.random() * 100)]
    mineCells.setAttribute('data-mine', 'true')
    mineCells.style.backgroundColor = 'red'
  }

  function checkCellsCenter(position) {
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
    console.log(positions)
    positions.forEach((position) => {
      if (position > 0 && position < 99 && (cells[position].getAttribute('data-mine') === 'true')){
        numberMines += 1
        console.log(numberMines)
      }
    })
  }

  function checkCellsRightWall(position) {
    const positions = [
      position - width - 1,
      position - width,
      position - 1,
      position + width - 1,
      position + width
    ] 
    console.log(positions)
    positions.forEach((position) => {
      if (position > 0 && position < 99 && (cells[position].getAttribute('data-mine') === 'true')){
        numberMines += 1
        console.log(numberMines)
      }
    })
  }

  function checkCellsLeftWall(position) {
    const positions = [
      position - width + 1,
      position - width,
      position + 1,
      position + width + 1,
      position + width
    ] 
    console.log(positions)
    positions.forEach((position) => {
      if (position > 0 && position < 99 && (cells[position].getAttribute('data-mine') === 'true')){
        numberMines += 1
        console.log(numberMines)
      }
    })
  }
}
document.addEventListener('DOMContentLoaded', setupGame)

