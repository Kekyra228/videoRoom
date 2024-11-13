# Видео-Чат Приложение 📷♡

Это веб-приложение для видеочата, созданное с использованием **WebRTC** для установления прямого однорангового (P2P) соединения между двумя участниками и **PeerJS** для упрощения работы с WebRTC. Приложение позволяет пользователям подключаться друг к другу, используя уникальный `roomId.

## Стэк 🛠️:

- **Next.js** — для серверного рендеринга, оптимизации и маршрутизации страниц.
- **TypeScript** — для типизации кода и улучшения читаемости и поддержки проекта.
- **React** — для создания интерфейса.
- **WebRTC** — для прямого однорангового соединения и передачи медиа-данных между участниками.
- **PeerJS** — для P2P соединений и работы с видео.

## Как запустить проект? 🔧

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/Kekyra228/videoRoom

   ```

2. Установите зависимости:
npm install

3. Запустите сервер разработки:
npm start

# Инструкция по использованию 📋:

- Шаг 1: **Откройте главную страницу**
  Перейдите на главную страницу приложения. Здесь вам нужно ввести своё имя и выбрать, в какую комнату вы хотите войти. Вы можете:
  Создать новую комнату, сгенерировав уникальный roomId.
  Или войти в уже существующую комнату, введя её roomId.

- Шаг 2: **Вход в комнату**
  После ввода имени и roomId нажмите кнопку «Войти в комнату». Вы будете перенаправлены на страницу видеочата, где будет создан уникальный peerId для установления связи с другим участником.

- Шаг 3: **Подключение к другому участнику**
  Один из участников должен скопировать свой peerId и передать его второму участнику (например, через сообщение).
  Второй участник должен вставить peerId первого участника в поле для подключения и нажать кнопку «Подключиться к участнику».

- Шаг 4: **Начало видеочата**
  После подключения вы увидите своё видео и видео второго участника, а также имя собеседника.

Завершение видеочата
Для завершения сеанса видеочата просто закройте вкладку или нажмите кнопку «Выйти из комнаты».
