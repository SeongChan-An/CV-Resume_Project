// Home typing text function part

const typeWriter = function (txtEl, words, wait = 2500) {
  this.txtEl = txtEl;
  this.words = words;
  //initirized  parameter.
  this.txt = "";
  this.wordIndex = 0;
  //which word are going on. array counter
  this.wait = parseInt(wait, 10);
  //same as parameter wait but it need to integer.
  this.type();
  //main arithmetic core.
  this.isDelet = false; //After typing anim we need to delet anim. it for that.
};

//type method

typeWriter.prototype.type = function () {
  // Current index of word = showing word from array
  const currentWord = this.wordIndex % this.words.length; // wordindex is 0 so if using % ans length

  // Get full of text length  current word.
  const fulltxt = this.words[currentWord]; // this line read word from array.

  // Check if you want to delet
  if (this.isDelet) {
    //delet function
    this.txt = fulltxt.substring(0, this.txt.length - 1);
  } else {
    //add text
    this.txt = fulltxt.substring(0, this.txt.length + 1); //만약 txt가 ''; 상태가 아니면 생성
  }
  // Insert txt into Elements
  this.txtEl.innerHTML = `<span class="text">${this.txt}</span>`;

  // initial type speed(change speed)
  let typeSpeed = 100;

  if (this.isDelet) {
    typeSpeed /= 2;
  }

  //if word is finished work.
  if (!this.isDelet && this.txt === fulltxt) {
    // making pause at end part
    typeSpeed = this.wait;
    // Set delete to true
    this.isDelet = true;
  } else if (this.isDelet && this.txt === "") {
    this.isDelet = false;
    // move to next word
    this.wordIndex++;
    //pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed); //second parameter is millesecond = typing speed, main goal is each time we show up text
};

//init on Dom load
document.addEventListener("DOMContentLoaded", init);
//init App?
function init() {
  const txtEl = document.querySelector(".home__title-writer");
  const words = JSON.parse(txtEl.getAttribute("data-words"));
  //data-wards is just string, so using JSON.parse, make them array
  const wait = txtEl.getAttribute("data-wait");
  // Init Typewiter(function init)
  const writer = new typeWriter(txtEl, words, wait);
}
