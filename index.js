(function (ko) {
  const initialArray = [
    {
      id: 0,
      title: 'Обязательные для всех',
      type: 'category',
      desc: 'Документы, обязательные для всех сотрудников без исключения',
      colors: ['pink', 'yellow', 'orange'],
      items: [
        {
          title: 'Паспорт',
          colors: ['blue'],
          itemType: 'Обязательный',
          desc: 'Для всех'
        },
        {
          title: 'ИНН',
          colors: [],
          itemType: 'Обязательный',
          desc: 'Для всех'
        },
      ],
    },

    {
      id: 1,
      title: 'Обязательные для трудоустройства',
      type: 'category',
      desc: 'Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от гражданства',
      colors: ['orange'],
      items: [
        {
          title: 'Водительские права',
          colors: [],
          itemType: 'для водителей',
          desc: 'Для водителей погрузчиков, грузовых автомобилей'
        }
      ],
    },
    {
      id: 2,
      title: 'Специальные',
      type: 'category',
      desc: '',
      colors: [],
      items: [
        {
          title: 'test',
          colors: ['gray'],
          itemType: 'test',
          desc: 'Для всех'
        }
      ],
    },
    {
      id: 3,
      title: '',
      type: 'uncategorized',
      desc: '',
      colors: [],
      items: [
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
    },
  ]

  let ViewModel = function () {
    this.searchInput = ko.observable('')
    this.searchedElements = ko.observableArray([])
    this.categories = ko.observableArray(initialArray)

    //CATEGORIES ACTIONS
    this.displayCloseIconStatus = ko.computed(function() {
      return this.searchInput() ? 'search__clear search__clear_active show' : 'search__clear search__clear_active';
    }, this, { pure: false });

    this.clearInput = function (){
      this.searchInput('')
    }

    this.search = ko.computed(function() {
      if(!this.searchInput()) return null // если строка ввода пустая - не проводить проверки

      const findedCategories = this.categories().filter(el => {
        return el.title.toLowerCase().trim().includes(this.searchInput().toLowerCase().trim()) || el.desc.toLowerCase().trim().includes(this.searchInput().toLowerCase().trim())
      })

      return findedCategories
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
  const viewModel = new ViewModel()
  ko.applyBindings(viewModel, document.getElementById('main'))

  const accordion = new Accordion('.info', {
    duration: 400,
    openOnInit: [0, viewModel.categories().length - 1], //при инициализации открывается первый и последний аккордеоны
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
})(ko)







