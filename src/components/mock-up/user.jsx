const user = {
   id: 1,
   isOwner: false, //владелец или нет
   isWorker: true, //рабочий или нет
   email: "admin@mail",
   password: "admin",
   name: "James",
   surName: "Alexa",
   phone: "+7(999)9999999",
   hourlyRate: 200, // почасовая ставка, число
   workingTimeTotal: 200, // сколько всего отработал времени с начала работы
   startDate: дата, // дата трудоустройства
   currentMonth: { // все что относится к текущему месяцу
      Month: 11, //текущий месяц, число 1-12 (как вариант)
      workingTimeInMounthDefault: 200, // сколько должен отработать в месяце
      workingTimeInMounthActual: 200, // по факту отработал в месяце
      incomeInMounth: 123, // сколько заработал в месяце
   },
   incomeInMounth: 123,
   place: {
      name: 'ShavaScript',
      address: 'somewhere 1',
      phone: '+7 999 999 99 91',
      location: {
         lat: 30,
         lng: 20,
      }
   }
}