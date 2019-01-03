const required = [v => !!v || 'Обязательное поле']
const number = [v => (v && v > 0) || 'Введите число']
const phone = [
  v => !!v || 'Обязательное поле',
  v => /^\+\d+$/.test(v) || 'Введите корректный номер телефона',
  v => (v.length === 12) || 'Введите корректный номер телефона',
  v => /^\+7(77|70)/.test(v) || 'Введите номер казахстанских сотовых операторов'
]

export {
  required,
  number,
  phone
}
