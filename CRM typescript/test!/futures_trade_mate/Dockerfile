# Используем официальный образ Python
FROM python:3.9-slim

# Отключаем запись байт-кода и буферизацию вывода
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Копируем код проекта
COPY . /app/

# Открываем порт 5000
EXPOSE 5000

# Запускаем приложение с помощью gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:create_app()"]
