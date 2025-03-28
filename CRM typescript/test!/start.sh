#!/bin/bash
# setup.sh – автоматическая настройка проекта FuturesTradeMate на Flask

PROJECT_NAME="futures_trade_mate"

echo "Создаём структуру проекта..."
mkdir -p $PROJECT_NAME/app/{static/css,static/js,templates}

echo "Записываем файлы исходного кода..."

# app/__init__.py
cat <<'EOF' > $PROJECT_NAME/app/__init__.py
from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "your-secret-key"
    
    from .routes import main
    app.register_blueprint(main)
    
    return app
EOF

# app/routes.py
cat <<'EOF' > $PROJECT_NAME/app/routes.py
from flask import Blueprint, render_template, request
import json

main = Blueprint('main', __name__)

trades = [
    {
        "id": "1",
        "symbol": "BTC/USDT",
        "type": "LONG",
        "entryPrice": 50000,
        "currentPrice": 52000,
        "quantity": 0.5,
        "timestamp": "2023-11-15T10:30:00Z",
        "status": "OPEN",
        "stopLoss": 48000,
        "takeProfit": 55000,
        "leverage": 10,
        "pnl": 1000,
        "pnlPercentage": 4,
    },
    # Добавьте другие сделки при необходимости
]

@main.route('/')
def index():
    stats = {
        "total_portfolio": "$52,493.50",
        "total_pnl": "$7,289.25",
        "win_rate": "73.5%",
        "active_positions": 7
    }
    pnl_data = [
        {"date": "Jan", "value": 1000},
        {"date": "Feb", "value": 1200},
        {"date": "Mar", "value": 900},
        {"date": "Apr", "value": 1500},
        {"date": "May", "value": 2000},
        {"date": "Jun", "value": 1800},
    ]
    return render_template("index.html", stats=stats, pnl_data=json.dumps(pnl_data), trades=trades)

@main.route('/trades')
def trades_page():
    search = request.args.get('search', '')
    filtered_trades = [t for t in trades if search.lower() in t["symbol"].lower()]
    return render_template("trades.html", trades=filtered_trades)

@main.route('/analytics')
def analytics():
    pnl_data = [
        {"date": "Jan", "value": 1000},
        {"date": "Feb", "value": 1200},
        {"date": "Mar", "value": 900},
        {"date": "Apr", "value": 1500},
        {"date": "May", "value": 2000},
        {"date": "Jun", "value": 1800},
    ]
    pie_data = [
        {"name": "BTC", "value": 45},
        {"name": "ETH", "value": 25},
        {"name": "SOL", "value": 15},
        {"name": "Other", "value": 15},
    ]
    return render_template("analytics.html", pnl_data=json.dumps(pnl_data), pie_data=json.dumps(pie_data))

@main.route('/settings')
def settings():
    return render_template("settings.html")
EOF

# templates/base.html
cat <<'EOF' > $PROJECT_NAME/app/templates/base.html
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>FuturesTradeMate - {% block title %}{% endblock %}</title>
  <meta name="description" content="{% block description %}{% endblock %}">
  <link href="{{ url_for('static', filename='css/tailwind.css') }}" rel="stylesheet">
</head>
<body class="bg-background text-foreground">
  {% include "navbar.html" %}
  <main class="pt-16">
    {% block content %}{% endblock %}
  </main>
  <footer class="py-6 border-t">
    <div class="container mx-auto px-4">
      <p class="text-sm text-muted-foreground">© 2023 FuturesTradeMate. All rights reserved.</p>
    </div>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  {% block scripts %}{% endblock %}
</body>
</html>
EOF

# templates/navbar.html
cat <<'EOF' > $PROJECT_NAME/app/templates/navbar.html
<nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow">
  <div class="container mx-auto px-4 py-3 flex justify-between items-center">
    <a href="/" class="text-xl font-bold">FuturesTradeMate</a>
    <div class="space-x-4">
      <a href="/" class="hover:text-blue-500">Dashboard</a>
      <a href="/trades" class="hover:text-blue-500">Trades</a>
      <a href="/analytics" class="hover:text-blue-500">Analytics</a>
      <a href="/settings" class="hover:text-blue-500">Settings</a>
    </div>
  </div>
</nav>
EOF

# templates/index.html
cat <<'EOF' > $PROJECT_NAME/app/templates/index.html
{% extends "base.html" %}
{% block title %}Dashboard{% endblock %}
{% block description %}Monitor your futures trading performance{% endblock %}
{% block content %}
<div class="container mx-auto px-4 py-8">
  <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="p-4 bg-white rounded shadow">
      <h3 class="text-sm text-gray-500">Total Portfolio Value</h3>
      <p class="text-xl font-bold">{{ stats.total_portfolio }}</p>
      <p class="text-green-500">+12.5%</p>
    </div>
    <div class="p-4 bg-white rounded shadow">
      <h3 class="text-sm text-gray-500">Total PnL</h3>
      <p class="text-xl font-bold">{{ stats.total_pnl }}</p>
      <p class="text-green-500">+8.2%</p>
    </div>
    <div class="p-4 bg-white rounded shadow">
      <h3 class="text-sm text-gray-500">Win Rate</h3>
      <p class="text-xl font-bold">{{ stats.win_rate }}</p>
      <p class="text-red-500">-2.1%</p>
    </div>
    <div class="p-4 bg-white rounded shadow">
      <h3 class="text-sm text-gray-500">Active Positions</h3>
      <p class="text-xl font-bold">{{ stats.active_positions }}</p>
      <p class="text-gray-500">0.00%</p>
    </div>
  </div>
  <canvas id="pnlChart" class="mt-8"></canvas>
</div>
{% endblock %}
{% block scripts %}
<script>
  const pnlData = {{ pnl_data | safe }};
  const ctx = document.getElementById('pnlChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: pnlData.map(item => item.date),
      datasets: [{
        label: 'PnL',
        data: pnlData.map(item => item.value),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        fill: true
      }]
    },
    options: {}
  });
</script>
{% endblock %}
EOF

# templates/trades.html
cat <<'EOF' > $PROJECT_NAME/app/templates/trades.html
{% extends "base.html" %}
{% block title %}Trades{% endblock %}
{% block description %}Manage your futures trades{% endblock %}
{% block content %}
<div class="container mx-auto px-4 py-8">
  <h1 class="text-2xl font-bold mb-4">Trades</h1>
  <div class="mb-4">
    <form method="get" action="/trades">
      <input type="search" name="search" placeholder="Search trades..." class="border p-2 rounded">
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Search</button>
    </form>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {% for trade in trades %}
    <div class="p-4 bg-white rounded shadow">
      <h3 class="text-xl font-bold">{{ trade.symbol }}</h3>
      <p>{{ trade.type }} | {{ trade.status }}</p>
      <p>Entry Price: ${{ trade.entryPrice }}</p>
      <p>Current Price: ${{ trade.currentPrice }}</p>
      <p>PnL: ${{ trade.pnl }} ({{ trade.pnlPercentage }}%)</p>
      <p>{{ trade.timestamp }}</p>
    </div>
    {% endfor %}
  </div>
</div>
{% endblock %}
EOF

# templates/analytics.html
cat <<'EOF' > $PROJECT_NAME/app/templates/analytics.html
{% extends "base.html" %}
{% block title %}Analytics{% endblock %}
{% block description %}Analyze your futures trading performance{% endblock %}
{% block content %}
<div class="container mx-auto px-4 py-8">
  <h1 class="text-2xl font-bold mb-4">Analytics</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <canvas id="pnlAnalyticsChart"></canvas>
    </div>
    <div>
      <canvas id="pieChart"></canvas>
    </div>
  </div>
</div>
{% endblock %}
{% block scripts %}
<script>
  const pnlData = {{ pnl_data | safe }};
  const pieData = {{ pie_data | safe }};
  
  const ctx1 = document.getElementById('pnlAnalyticsChart').getContext('2d');
  new Chart(ctx1, {
    type: 'line',
    data: {
      labels: pnlData.map(item => item.date),
      datasets: [{
        label: 'PnL Over Time',
        data: pnlData.map(item => item.value),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        fill: true
      }]
    },
    options: {}
  });
  
  const ctx2 = document.getElementById('pieChart').getContext('2d');
  new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: pieData.map(item => item.name),
      datasets: [{
        data: pieData.map(item => item.value),
        backgroundColor: ['#3b82f6','#10b981','#6366f1','#f43f5e']
      }]
    },
    options: {}
  });
</script>
{% endblock %}
EOF

# templates/settings.html
cat <<'EOF' > $PROJECT_NAME/app/templates/settings.html
{% extends "base.html" %}
{% block title %}Settings{% endblock %}
{% block description %}Configure your futures trading platform{% endblock %}
{% block content %}
<div class="container mx-auto px-4 py-8">
  <h1 class="text-2xl font-bold mb-4">Settings</h1>
  <p>Настройки пользователя и аккаунта.</p>
  <!-- Здесь можно добавить формы для изменения настроек -->
</div>
{% endblock %}
EOF

# requirements.txt
cat <<'EOF' > $PROJECT_NAME/requirements.txt
Flask==2.2.5
gunicorn==20.1.0
EOF

# Dockerfile
cat <<'EOF' > $PROJECT_NAME/Dockerfile
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
EOF

# docker-compose.yml
cat <<'EOF' > $PROJECT_NAME/docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - .:/app
    environment:
      - FLASK_ENV=development
EOF

echo "Создаём виртуальное окружение и устанавливаем зависимости..."
python3 -m venv $PROJECT_NAME/venv
source $PROJECT_NAME/venv/bin/activate
pip install --upgrade pip
pip install -r $PROJECT_NAME/requirements.txt

echo "Проект $PROJECT_NAME успешно создан."
