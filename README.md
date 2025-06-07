1. Сборка Docker-образа:
   ```sh
   docker build -t bionicpro-api .
   ```

2. Запуск контейнера:
   ```sh
   docker-compose up -d
   ```

3. Проверка запущенных сервисов:
   ```sh
   docker ps
   ```

4. Проверка работы API:
   ```sh
   curl -X GET http://localhost:8000/reports -H "Authorization: Bearer <ACCESS_TOKEN>"
   ```
   (Замените `<ACCESS_TOKEN>` на реальный токен из Keycloak)

5. Остановка и удаление контейнеров:
   ```sh
   docker-compose down
   

Если войти под prothetic1/prothetic123 то отчет по кнопке будет скачиваться. Для других пользователей будет ошибка.

Контейнер с API не всегда дожидается когда стартанет keycloak, поэтому его вручную можно запустить, если он сразу не поднялся.
