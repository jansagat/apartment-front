const SEC_IN_MS = 1000
const MIN_IN_SEC = 60

const CITIES = [
  { id: 1, name: 'Астана' },
  { id: 2, name: 'Алматы' }
]
const PROPERTY_TYPE = [ // TODO Announcement entity
  { id: 1, name: 'квартиру' },
  { id: 2, name: 'комнату' },
  { id: 3, name: 'дом' },
  { id: 4, name: 'другой тип недвиж.' }
]
const OFFER_TYPE = [
  { id: 1, name: 'Сдаю', secondName: 'Снять' },
  { id: 2, name: 'Возьму на подселение', secondName: 'Подселение' },
  { id: 3, name: 'Продаю', secondName: 'Купить' }
]
const RENT_TIME = [
  { id: 1, name: 'помесячно' },
  { id: 2, name: 'посуточно' },
  { id: 3, name: 'поквартально' },
  { id: 4, name: 'по часам' }
]

export {
  SEC_IN_MS,
  MIN_IN_SEC,
  CITIES,
  PROPERTY_TYPE,
  OFFER_TYPE,
  RENT_TIME
}
