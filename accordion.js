const accordion = new Accordion('.info', {
  duration: 400,
  openOnInit: [0],
  showMultiple: true,
  elementClass: 'category__wrapper',
  triggerClass: 'category__accordion',
  panelClass: 'elements',
  beforeOpen: function (currentElement) {
    currentElement.querySelector('.category__accordion').classList.add('rotate')
  },
  beforeClose: function (currentElement) {
    currentElement.querySelector('.category__accordion').classList.remove('rotate')
  }
});

document.querySelector('.category__accordion').classList.add('rotate')
