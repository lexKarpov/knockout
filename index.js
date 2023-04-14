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
    this.newTaskTitle = ko.observable('')
    this.tasks = ko.observableArray(checklist.tasks)

    this.addTask = function () {
      this.checklist.addTask(this.newTaskTitle())
      this.newTaskTitle('')
      this.tasks(this.checklist.tasks)
    }

    this.removeTask = function (task, event){
      this.checklist.removeTask(task.id)
      this.tasks(this.checklist.tasks)
      // console.log('this is spark')
      // console.log(event.target)
    }
  }

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








