(function (ko) {
  const initialArray = [
    {
      id: 0,
      title: 'Обязательные для всех',
      type: 'requreAll',
      desc: 'Документы, обязательные для всех сотрудников без исключения',
      colors: ['pink', 'yellow', 'orange'],
    },

    {
      id: 1,
      title: 'Обязательные для трудоустройства',
      type: 'requireForWork',
      desc: 'Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от граж',
      colors: [''],
    },
    {
      id: 2,
      title: 'Специальные',
      type: 'special',
      desc: '',
      colors: [''],
    },
  ]

  const initialElements = [
    {
      title: 'Паспорт',
      colors: ['blue'],
      itemType: 'Обязательный',
      desc: 'Для всех',
      binded: [
        'requreAll',
      ],
    },
    {
      title: 'ИНН',
      colors: [],
      itemType: 'Обязательный',
      desc: 'Для всех',
      binded: [
        'requreAll',
        'special'
      ],
    },
    {
      title: 'Водительские права',
      colors: [],
      itemType: 'для водителей',
      desc: 'Для водителей погрузчиков, грузовых автомобилей',
      binded: [
        'special'
      ],
    },
    {
      title: 'Тестовое задание кандидата',
      colors: [],
      itemType: '',
      desc: 'Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха',
      binded: ['uncategorized'],
    },
    {
      title: 'Трудовой договор',
      colors: ['blue', 'gray'],
      itemType: '',
      desc: 'Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха',
      binded: ['uncategorized'],
    },
    {
      title: 'Мед. книжка',
      colors: [],
      itemType: '',
      desc: '',
      binded: ['uncategorized'],
    }
  ]
  let ChecklistViewModel = function () {
    this.searchInput = ko.observable('')

    this.categories = ko.observableArray(initialArray)
    this.elements = ko.observableArray(initialElements)

    //CATEGORIES ACTIONS
    this.displayCloseIconStatus = ko.computed(function() {
      return this.searchInput() ? 'search__clear search__clear_active show' : 'search__clear search__clear_active';
    }, this, { pure: false });

    this.clearInput = function (){
      this.searchInput('')
    }

    this.search = ko.computed(function() {
      const findedTasks = this.categories().filter(el => el.title.toLowerCase().trim().includes(this.searchInput().toLowerCase().trim()))
      return findedTasks
    }, this, { pure: false });

    this.submitSearch = function (){
      console.log(this.search())
    }

    this.removeCategory = function (element) {
      const withoutDeleteItem = this.categories().filter(el => el.id !== element.id)
      this.categories(withoutDeleteItem)
    };

    this.addCategory = function (taskTitle) {
      this.categories().push(
        {
          id: this.categories.length,
          title: taskTitle,
          type: 'category',
          desc: 'Документы, обязательные для всех сотрудников без исключения',
          items: [
            {
              title: 'Паспорт',
              colors: ['blue'],
              itemType: 'Обязательный',
              desc: 'Для всех'
            },
            {
              title: 'ИНН',
              colors: ['orange'],
              itemType: 'Обязательный',
              desc: 'Для всех'
            },
          ],
        },
      )
    }
    this.searchInput('')
  }

  ko.applyBindings(new ChecklistViewModel(), document.getElementById('main'))

})(ko)

// new Accordion('.container-first');

// User options

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




