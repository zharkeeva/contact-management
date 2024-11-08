# Contact Management

Приложение для управления контактами с возможностью добавления, редактирования, удаления и поиска. Данные сохраняются в localStorage для доступности при перезагрузке. Реализована загрузка фейковых данных из API и базовая валидация форм.

## Основные компоненты

- `App.vue`: Основной компонент приложения.
- `ContactForm.vue`: Компонент для добавления и редактирования контактов.
- `ContactList.vue`: Компонент для отображения списка контактов.
- `ContactItem.vue`: Компонент для отображения одного контакта.
- `SearchBar.vue`: Компонент для поиска контактов по имени, email или номеру телефона.

## Установка и запуск

```
npm install
```

### Запуск в режиме разработки

```
npm run serve
```

### Сборка для продакшена

```
npm run build
```

### Запуск юнит-тестов

```
npm run test:unit
```

### Линтинг и исправление ошибок

```
npm run lint
```