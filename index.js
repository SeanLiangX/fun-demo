console.log('loaded')

let james = document.querySelector('#james')

function permutations(word) {
  if (word.length <= 1) return [word]

  let result = []
  for (let i = 0; i < word.length; i++) {
    let rest = word.slice(0, i) + word.slice(i + 1)
    for (let perm of permutations(rest)) {
      result.push(word[i] + perm)
    }
  }
  return result
}

let diffjames = permutations('james')

let current_word = 0
let current_char = 0
let waiting = false

const changeText = () => {}

console.log(diffjames[current_word])

const renderWord = () => {
  james.innerHTML = ''
  for (let char of diffjames[current_word]) {
    let letter = document.createElement('div')
    letter.className = 'letter'

    let span = document.createElement('span')
    span.className = 'char'
    span.textContent = char

    letter.appendChild(span)
    james.appendChild(letter)
  }
  james.children[0].classList.add('current')
}

const markLetter = (correct) => {
  let letter = james.children[current_char]
  letter.classList.remove('current')
  letter.classList.add(correct ? 'correct' : 'wrong')

  let img = document.createElement('img')
  img.src = correct ? 'james_yang_linkedin.jpeg' : 'tudor_filimon_linkedin.png'
  letter.appendChild(img)
}

renderWord()

const incrementstep = () => {
  current_char += 1

  let length_of_word = diffjames[current_word].length

  console.log(length_of_word)

  if (length_of_word == current_char) {
    

    current_word = (current_word + 1) % diffjames.length
    current_char = 0

    // show the finished word briefly before moving on
    waiting = true
    setTimeout(() => {
      renderWord()
      waiting = false
    }, 500)
  } else {
    james.children[current_char].classList.add('current')
  }
}

window.addEventListener('keydown', (e) => {
  let key = e.key

  console.log(key)
  if (key.length == 1 && !waiting) {

    if (key == diffjames[current_word][current_char]) {
      console.log("correct")
      markLetter(true)
    } else {
      console.log("wrong")
      markLetter(false)
    }
    incrementstep()

  } else {

  }
})
