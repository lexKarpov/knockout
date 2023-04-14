(function (ko) {
  const initialArray = [
    {
      id: 0,
      title: 'Обязательные для всех',
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

    {
      id: 1,
      title: 'Обязательные для трудоустройства',
      type: 'category',
      desc: 'Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от граж',
      items: [
        {
          title: 'Водительские права',
          colors: ['orange'],
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
      items: [
        {
          title: 'test',
          colors: ['gray'],
          itemType: 'test',
          desc: 'Для всех'
        }
      ],
    },
  ]
  let ChecklistViewModel = function (checklist) {
    this.checklist = checklist
    this.inputTask = ko.observable('')

    this.tasks = ko.observableArray(checklist.tasks)

    // this.searchTask = ko.computed(function () {
    //   console.log('sdfsdfsdf')
    //
    // })

    this.searchTask = ko.computed(function() {


      const findedTasks = this.tasks().filter(el => el.title.toLowerCase().trim().includes(this.inputTask().toLowerCase().trim()))
      console.log(findedTasks)

      // return this.inputTask() + " " + this.inputTask();
    }, this, { pure: false });

    this.addTask = function () {
      this.checklist.addTask(this.newTaskTitle())
      this.inputTask('')
      this.tasks(this.checklist.tasks)
    }

    this.removeTask = function (task, event) {
      this.checklist.removeTask(task.id)
      this.tasks(this.checklist.tasks)
    }
  }

  // ChecklistViewModel.searchTask = ko.computed(function (){
  //   // return this.inputTask
  //   console.log('sdfsdfsdf')
  // }).bind("this value", 1, 2)

  let Checklist = function () {
    this.tasks = initialArray;

    this.addTask = function (taskTitle) {
      this.tasks.push(
        {
          id: this.tasks.length,
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
      // console.log(this.tasks)
    }

    this.removeTask = function (id) {
      this.tasks = this.tasks.filter(el => el.id !== id)
    };
    //
    // this.checkTask = function (id) {
    //
    // }
  }

  let checklist = new Checklist()


  ko.applyBindings(new ChecklistViewModel(checklist), document.getElementById('main'))

})(ko)

// new Accordion('.container-first');

// User options

const accordion = new Accordion('.info-wrapper', {
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




