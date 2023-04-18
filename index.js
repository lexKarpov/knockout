function knockout(ko) {

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
        },
        {
          title: 'test',
          colors: ['gray'],
          itemType: 'test',
          desc: 'Для всех'
        },
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
      title: 'Без категории',
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
          desc: '',
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
    this.isNotResult = ko.observable(false)
    this.hasAccordeon = ko.observable(false)

    this.check = function (){
      console.log('sldkfjsdf')
    }

    this.displayCloseIconStatus = ko.computed(function () {
      return this.searchInput() ? 'search__clear search__clear_active show' : 'search__clear search__clear_active';
    }, this, {pure: false});

    this.clearInput = function () {
      this.searchInput('')
    }

    this.search = ko.computed(function () {
      this.hasAccordeon() ? console.log('truu') : null
      if (!this.searchInput()) {  // если строка ввода пустая - не проводить проверки
        this.categories(initialArray)
        this.isNotResult(false)
        this.hasAccordeon() ? accordion.update() : null
        return null
      }
      this.hasAccordeon() ? accordion.update() : null
      const findedCategories = initialArray.filter(el => {
        const subCategoryTitles = el.items.filter(element => {
          return element.title.toLowerCase().trim().includes(this.searchInput().toLowerCase().trim())
        })
        const subCategory = el.items.filter(element => {
          return element.desc.toLowerCase().trim().includes(this.searchInput().toLowerCase().trim())
        })
        const inputValue = this.searchInput().toLowerCase().trim()
        const categoryTitle = el.title.toLowerCase().trim()
        const categoryDesc = el.desc.toLowerCase().trim()
        const findedCat = categoryTitle.includes(inputValue) || categoryDesc.includes(inputValue) || subCategory.length > 0 || subCategoryTitles.length > 0
        return findedCat
      })

      if (findedCategories.length < 1) {
        this.isNotResult(true)
        this.categories([])
        return
      }

      this.categories(findedCategories)
      return findedCategories

    }, this, {pure: false});

    this.submitSearch = function () {
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

  const init = true
  const viewModel = new ViewModel(init)
  ko.applyBindings(viewModel, document.getElementById('main'))


  $(function () {


      $("#elem")
        .sortable({
          connectWith: "body",
          // items: "> li",
          // dropOnEmpty: false,
          cursor: "move",
          revert: true,
          // tolerance: "pointer",
          axis: "y",
          handle: ".action__icon_type_move-element",
          start: function (event, ui){
            // console.log(ui.item[0])
            ui.item[0].querySelector('.elements__item').classList.add('activeDrag') // добавляем подсветку для перетаскивания
          },
          stop: function (event, ui) {
            ui.item.children(".category__wrapper").triggerHandler("focusout");

            ui.item[0].querySelector('.elements__item').classList.remove('activeDrag') // удаляем подсветку после перетаскивания

            let newOrder = $(this).sortable("toArray");

            let updatedTasks = [];
            newOrder.forEach(function (id) {
              id = +id.split('-')[1]
            });

          }
        });
    })

  



  $(function () {
    $("#sortable")
      .sortable({
        dropOnEmpty: false,
        cursor: "move",
        revert: true,
        // tolerance: "pointer",
        axis: "y",
        handle: ".action__icon_type_move",

        start: function (event, ui){

          ui.item[0].querySelector('.category').classList.add('activeDrag') // добавляем подсветку для перетаскивания
        },
        stop: function (event, ui) {
          ui.item.children(".category__wrapper").triggerHandler("focusout");

          ui.item[0].querySelector('.category').classList.remove('activeDrag') // удаляем подсветку после перетаскивания

          let newOrder = $(this).sortable("toArray");

          // viewModel.check()


          let updatedTasks = [];
          newOrder.forEach(function (id) {
            id = +id.split('-')[1]
            // console.log(id)
            // let item = ChecklistViewModel.tasks.find(function (category) {
            //   return category.title === id;
            // });
            // updatedTasks.push(item);
          });
          // Checklist.tasks(updatedTasks);
        }
      });
  });

  // $(function () {
  //   $(".action__icon_type_move-element").mousedown((e) => {
  //     e.target.closest('.elements__wrapper-item').setAttribute('draggable', true)
  //   })
  // });








  return viewModel
}

const viewModel = knockout(ko)


const input = document.querySelector('.search__input')
// input.addEventListener('onchange', ()=> console.log(viewModel))

input.oninput = function () {
  viewModel.hasAccordeon(true)
}

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
