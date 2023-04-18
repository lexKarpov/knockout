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
    this.startPositionY = ko.observable(0)
    this.endPositionY = ko.observable(0)
    this.check = function () {
      console.log('sldkfjsdf')
    }

    // this.getCoordinatesOfElements = function (){
    //   const elements = document.querySelectorAll('.elements__wrapper-item')
    //   console.log(elements)
    // }

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


  // $(function () {
  //   $(".elements").sortable({
  //     revert: true,
  //     connectToSortable: ".category__wrapper",
  //   });
  //   $(".elements__wrapper-item").draggable({
  //     connectToSortable: ".elements",
  //     helper: "clone",
  //     // revert: "invalid",
  //     axis: "x",
  //
  //   });
  //   $("ul, li").disableSelection();
  // });


  $(function () {
    $(".elements")
    // $(".elements__wrapper-item")
      .sortable({
        connectWith: ".elements",
        dropOnEmpty: false,
        cursor: "move",
        revert: true,
        tolerance: "pointer",
        axis: "y",
        handle: ".action__icon_type_move-element",
        forcePlaceholderSize: true,
        helper: "clone",
        placeholder: ".elements__wrapper-item",
        activate: function( event, ui ) {
          const initialPos = document.querySelector('.info').getBoundingClientRect();
          // console.log(document.elementFromPoint(event.clientX, event.clientY))
          // console.log(initialPos)
          // console.log(ui)
        },

        start: function (event, ui){
          // console.log('event')
          // // console.log(event.offsetY)
          // console.log(ui.position)

          ui.item[0].querySelector('.elements__item').classList.add('activeDrag') // добавляем подсветку для перетаскивания
        },
        receive: function( event, ui ) {
          // console.log(event.target) // элемент, на который произвелось перетаскивание
        },
        sort: function( event, ui ) {
          // console.log(ui)
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
      })
  })


  // $(function () {
  //   $(".info")
  //     .sortable({
  //       dropOnEmpty: false,
  //       cursor: "move",
  //       revert: true,
  //       tolerance: "pointer",
  //       axis: "y",
  //       handle: ".action__icon_type_move",
  //
  //       start: function (event, ui) {
  //         console.log(ui)
  //         // ui.item[0].querySelector('.category').classList.add('activeDrag') // добавляем подсветку для перетаскивания
  //       },
  //       stop: function (event, ui) {
  //         ui.item.children(".category__wrapper").triggerHandler("focusout");
  //
  //         // ui.item[0].querySelector('.category').classList.remove('activeDrag') // удаляем подсветку после перетаскивания
  //
  //         let newOrder = $(this).sortable("toArray");
  //         // viewModel.check()
  //
  //         let updatedTasks = [];
  //         newOrder.forEach(function (id) {
  //           id = +id.split('-')[1]
  //           // console.log(id)
  //           // let item = ChecklistViewModel.tasks.find(function (category) {
  //           //   return category.title === id;
  //           // });
  //           // updatedTasks.push(item);
  //         });
  //         // Checklist.tasks(updatedTasks);
  //       }
  //     })
  //
  //   $('.elements').sortable({
  //     connectToSortable: ".category__wrapper",
  //     dropOnEmpty: false,
  //   })
  //   $('.elements__wrapper-item').draggable({
  //     connectToSortable: ".elements",
  //
  //     // helper: "clone",
  //     revert: "true",
  //     revertDuration: 150,
  //     // scope: "tasks",
  //     // refreshPositions: true,
  //     axis: "y",
  //     handle: ".action__icon_type_move-element",
  //   });
  //   $("ul, li").disableSelection();
  // })


  // $(function () {
  //   let categories = $('.info');
  //
  //   // Обработчик события dragover для каждого элемента categories
  //   categories.on('dragover', function (event) {
  //     // Предотвращаем действие по умолчанию
  //     event.preventDefault();
  //     console.log('WORKED!!!!!!!!!!!!')
  //     // Добавляем класс active-acc к элементу, над которым находится draggable
  //     event.target.addClass('active-acc');
  //     document.querySelector('.main').classList.add('RRRRRRRRRRRRRRRRRRR')
  //   });
  //
  //   // Обработчик события dragleave для каждого элемента categories
  //   categories.on('dragleave', function (event) {
  //     console.log('WORKED!!!!!!!!!!!!')
  //     // Удаляем класс active-acc у элемента, над которым находится draggable
  //     $(this).removeClass('active-acc');
  //   });
  // })


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



//WHITH DRAGGABLE
// $(function () {
//   $(".info")
//     .sortable({
//       dropOnEmpty: false,
//       cursor: "move",
//       revert: true,
//       tolerance: "pointer",
//       axis: "y",
//       handle: ".action__icon_type_move",
//
//       start: function (event, ui) {
//         console.log(ui)
//         // ui.item[0].querySelector('.category').classList.add('activeDrag') // добавляем подсветку для перетаскивания
//       },
//       stop: function (event, ui) {
//         ui.item.children(".category__wrapper").triggerHandler("focusout");
//
//         // ui.item[0].querySelector('.category').classList.remove('activeDrag') // удаляем подсветку после перетаскивания
//
//         let newOrder = $(this).sortable("toArray");
//         // viewModel.check()
//
//         let updatedTasks = [];
//         newOrder.forEach(function (id) {
//           id = +id.split('-')[1]
//           // console.log(id)
//           // let item = ChecklistViewModel.tasks.find(function (category) {
//           //   return category.title === id;
//           // });
//           // updatedTasks.push(item);
//         });
//         // Checklist.tasks(updatedTasks);
//       }
//     })
//
//   $('.elements').sortable({
//     connectToSortable: ".category__wrapper",
//     // dropOnEmpty: false,
//   })
//   $('.elements__wrapper-item').draggable({
//     connectToSortable: ".elements",
//     // snap: true,
//     // helper: "clone",
//     revert: "true",
//     revertDuration: 150,
//     appendTo: ".category__wrapper",
//     // scope: "tasks",
//     // refreshPositions: true,
//     stack: ".elements__wrapper-item",
//     zIndex: 100,
//     axis: "y",
//     handle: ".action__icon_type_move-element",
//   });
//   // $("ul, li").disableSelection();
// })





//
// $(document).ready(function(e) {
//   // Находим перетаскиваемый элемент
//   var draggable = $('.draggable');
//   console.log(draggable)
//   console.log(e)
//   // Находим элементы с классом category__wrapper
//   var categories = $('.category__wrapper');
//
//   // Обработчик события dragover для каждого элемента categories
//   categories.on('dragover', function(event) {
//     // Предотвращаем действие по умолчанию
//     event.preventDefault();
//
//     // Добавляем класс active-acc к элементу, над которым находится draggable
//     event.target.addClass('active-acc');
//     document.querySelector('.main').classList.add('RRRRRRRRRRRRRRRRRRR')
//   });
//
//   // Обработчик события dragleave для каждого элемента categories
//   categories.on('dragleave', function(event) {
//     // Удаляем класс active-acc у элемента, над которым находится draggable
//     $(this).removeClass('active-acc');
//   });
// });
