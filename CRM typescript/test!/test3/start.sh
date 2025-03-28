#!/bin/bash
# setup.sh – автоматическая настройка Flask-проекта с темизацией (светлая/тёмная тема) и Tailwind.

PROJECT_NAME="futures_trade_mate"

echo "Создаём структуру проекта..."
mkdir -p $PROJECT_NAME/app/{static/css,static/js,templates}
touch $PROJECT_NAME/tailwind.config.js

echo "Записываем файлы исходного кода..."

########################
# 1) __init__.py
########################
cat <<'EOF' > $PROJECT_NAME/app/__init__.py
from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "your-secret-key"

    from .routes import main
    app.register_blueprint(main)

    return app
EOF

########################
# 2) routes.py
########################
cat <<'EOF' > $PROJECT_NAME/app/routes.py
from flask import Blueprint, render_template, request
import json

main = Blueprint('main', __name__)

# Пример "mock" данных сделок
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
    {
        "id": "2",
        "symbol": "ETH/USDT",
        "type": "SHORT",
        "entryPrice": 3000,
        "currentPrice": 3100,
        "quantity": 2,
        "timestamp": "2023-11-14T14:45:00Z",
        "status": "OPEN",
        "stopLoss": 3200,
        "takeProfit": 2800,
        "leverage": 5,
        "pnl": -200,
        "pnlPercentage": -3.33,
    },
    {
        "id": "3",
        "symbol": "SOL/USDT",
        "type": "LONG",
        "entryPrice": 100,
        "currentPrice": 110,
        "quantity": 20,
        "timestamp": "2023-11-13T09:15:00Z",
        "status": "CLOSED",
        "leverage": 3,
        "pnl": 200,
        "pnlPercentage": 10,
    },
]

@main.route('/')
def index():
    stats = {
        "total_portfolio": "$52,493.50",
        "total_pnl": "$7,289.25",
        "win_rate": "73.5%",
        "active_positions": 7
    }
    # Данные для графика
    pnl_data = [
        {"date": "Jan", "value": 1000},
        {"date": "Feb", "value": 1200},
        {"date": "Mar", "value": 900},
        {"date": "Apr", "value": 1500},
        {"date": "May", "value": 2000},
        {"date": "Jun", "value": 1800},
        {"date": "Jul", "value": 2200},
        {"date": "Aug", "value": 2600},
        {"date": "Sep", "value": 2400},
        {"date": "Oct", "value": 2800},
        {"date": "Nov", "value": 3500},
        {"date": "Dec", "value": 3800},
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
        {"date": "Jul", "value": 2200},
        {"date": "Aug", "value": 2600},
        {"date": "Sep", "value": 2400},
        {"date": "Oct", "value": 2800},
        {"date": "Nov", "value": 3500},
        {"date": "Dec", "value": 3800},
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

########################
# 3) base.html
########################
cat <<'EOF' > $PROJECT_NAME/app/templates/base.html
<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>FuturesTradeMate - {% block title %}{% endblock %}</title>
  <meta name="description" content="{% block description %}{% endblock %}">

  <!-- Подключаем tailwind.css (скомпилированный файл) -->
  <link href="{{ url_for('static', filename='css/index.css') }}" rel="stylesheet">
</head>
<body class="bg-background text-foreground transition-colors duration-300">
  {% include "navbar.html" %}

  <main class="pt-16 min-h-screen">
    {% block content %}{% endblock %}
  </main>

  <footer class="py-6 border-t">
    <div class="container mx-auto px-4 md:px-6 text-center">
      <p class="text-sm text-muted-foreground">
        © 2023 FuturesTradeMate. All rights reserved.
      </p>
    </div>
  </footer>

  <!-- Подключаем Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <!-- Скрипт для переключения темы -->
  <script src="{{ url_for('static', filename='js/themeToggle.js') }}"></script>
  {% block scripts %}{% endblock %}
</body>
</html>
EOF

########################
# 4) navbar.html
########################
cat <<'EOF' > $PROJECT_NAME/app/templates/navbar.html
<header
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 border-b backdrop-blur-md"
>
  <div class="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
    <!-- Logo -->
    <a href="/" class="text-lg font-semibold tracking-tight hover:opacity-90 transition-opacity">
      FuturesTradeMate
    </a>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center space-x-8">
      <a href="/" class="nav-link">Dashboard</a>
      <a href="/trades" class="nav-link">Trades</a>
      <a href="/analytics" class="nav-link">Analytics</a>
      <a href="/settings" class="nav-link">Settings</a>
    </nav>

    <!-- Actions -->
    <div class="flex items-center space-x-4">
      <!-- Тоггл темы -->
      <button
        id="themeToggle"
        class="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
        aria-label="Toggle dark mode"
      >
        <!-- Иконки света/темноты (SVG) подставим через JS -->
        <svg id="themeToggleIcon" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <!-- по умолчанию можно вставить иконку луны, например -->
          <path d="M21.752 15.002A9.718 9.718 0 0112.998 22C7.201 22 2.5 17.299 2.5 11.502c0-4.21 2.717-7.79 6.707-9.058.513-.167.98.343.82.844A7.498 7.498 0 0012.998 19a7.47 7.47 0 004.213-1.367c.461-.36 1.086.04.938.59z"></path>
        </svg>
      </button>

      <!-- Mobile menu button -->
      <button
        id="mobileMenuButton"
        class="inline-flex items-center justify-center p-2 rounded-md text-foreground md:hidden"
        aria-expanded="false"
      >
        <svg class="block h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  <div
    id="mobileMenu"
    class="md:hidden max-h-0 overflow-hidden transition-all duration-300"
  >
    <div class="px-4 pt-2 pb-3 space-y-1 border-t">
      <a href="/" class="mobile-nav-link">Dashboard</a>
      <a href="/trades" class="mobile-nav-link">Trades</a>
      <a href="/analytics" class="mobile-nav-link">Analytics</a>
      <a href="/settings" class="mobile-nav-link">Settings</a>
    </div>
  </div>
</header>
EOF

########################
# 5) index.html
########################
cat <<'EOF' > $PROJECT_NAME/app/templates/index.html
{% extends "base.html" %}
{% block title %}Dashboard{% endblock %}
{% block description %}Monitor your futures trading performance{% endblock %}
{% block content %}
<div class="container mx-auto px-4 md:px-6 pt-6 pb-16 animate-fade-in">
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Dashboard</h2>
      <p class="text-muted-foreground">
        Monitor your futures trading performance.
      </p>
    </div>
    <button class="mt-4 md:mt-0 btn btn-primary flex items-center gap-1">
      <!-- Иконка + -->
      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 4v16m8-8H4"/>
      </svg>
      New Trade
    </button>
  </div>

  <!-- Stats Cards -->
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <!-- Card -->
    <div class="neo-morphism rounded-xl p-6 transition-all duration-200 hover:-translate-y-0.5">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-sm font-medium text-muted-foreground mb-1">Total Portfolio Value</h3>
          <p class="text-2xl font-semibold tracking-tight">{{ stats.total_portfolio }}</p>
        </div>
        <!-- Иконка -->
        <div class="rounded-full bg-secondary p-2 text-secondary-foreground">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1v22m6-11H6"></path>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <div class="flex items-center rounded-md bg-positive/10 text-positive px-2 py-1 text-xs font-medium">
          <!-- Иконка стрелка вверх -->
          <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5 12l5-5 5 5"></path>
          </svg>
          <span>12.5%</span>
        </div>
        <span class="ml-2 text-xs text-muted-foreground">from previous period</span>
      </div>
    </div>

    <!-- Аналогично остальные карточки -->
    <div class="neo-morphism rounded-xl p-6 hover:-translate-y-0.5 transition-all duration-200">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-sm font-medium text-muted-foreground mb-1">Total PnL</h3>
          <p class="text-2xl font-semibold tracking-tight">\$7,289.25</p>
        </div>
        <div class="rounded-full bg-secondary p-2 text-secondary-foreground">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path d="M12 1v22m6-11H6"></path>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <div class="flex items-center rounded-md bg-positive/10 text-positive px-2 py-1 text-xs font-medium">
          <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5 12l5-5 5 5"></path>
          </svg>
          <span>8.2%</span>
        </div>
        <span class="ml-2 text-xs text-muted-foreground">from previous period</span>
      </div>
    </div>

    <div class="neo-morphism rounded-xl p-6 hover:-translate-y-0.5 transition-all duration-200">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-sm font-medium text-muted-foreground mb-1">Win Rate</h3>
          <p class="text-2xl font-semibold tracking-tight">73.5%</p>
        </div>
        <div class="rounded-full bg-secondary p-2 text-secondary-foreground">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path d="M12 1v22m6-11H6"></path>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <div class="flex items-center rounded-md bg-negative/10 text-negative px-2 py-1 text-xs font-medium">
          <!-- Стрелка вниз -->
          <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19 12l-5 5-5-5"></path>
          </svg>
          <span>2.1%</span>
        </div>
        <span class="ml-2 text-xs text-muted-foreground">from previous period</span>
      </div>
    </div>

    <div class="neo-morphism rounded-xl p-6 hover:-translate-y-0.5 transition-all duration-200">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-sm font-medium text-muted-foreground mb-1">Active Positions</h3>
          <p class="text-2xl font-semibold tracking-tight">7</p>
        </div>
        <div class="rounded-full bg-secondary p-2 text-secondary-foreground">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path d="M12 1v22m6-11H6"></path>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <div class="flex items-center rounded-md bg-neutral/10 text-neutral px-2 py-1 text-xs font-medium">
          <!-- Минус -->
          <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5 12h14"></path>
          </svg>
          <span>0.00%</span>
        </div>
        <span class="ml-2 text-xs text-muted-foreground">no change</span>
      </div>
    </div>
  </div>

  <!-- Charts -->
  <div class="grid gap-4 mt-8 md:grid-cols-2">
    <div class="animate-fade-in">
      <h3 class="text-lg font-semibold mb-2">Portfolio Performance</h3>
      <p class="text-muted-foreground text-sm mb-4">Monthly performance overview</p>
      <div class="h-[300px] w-full">
        <canvas id="portfolioChart"></canvas>
      </div>
    </div>
    <div class="animate-fade-in">
      <h3 class="text-lg font-semibold mb-2">PnL Distribution</h3>
      <p class="text-muted-foreground text-sm mb-4">PnL by asset</p>
      <div class="h-[300px] w-full">
        <canvas id="pnlChart"></canvas>
      </div>
    </div>
  </div>

</div>
{% endblock %}

{% block scripts %}
<script>
  // Пример инициализации двух графиков
  const portfolioData = {{ pnl_data | safe }};
  const ctx1 = document.getElementById('portfolioChart').getContext('2d');
  new Chart(ctx1, {
    type: 'line',
    data: {
      labels: portfolioData.map(item => item.date),
      datasets: [{
        label: 'value',
        data: portfolioData.map(item => item.value),
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        borderColor: 'rgba(59, 130, 246, 1)',
        fill: true
      }]
    },
    options: { responsive: true }
  });

  const ctx2 = document.getElementById('pnlChart').getContext('2d');
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: portfolioData.map(item => item.date),
      datasets: [{
        label: 'value',
        data: portfolioData.map(item => item.value),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      }]
    },
    options: { responsive: true }
  });
</script>
{% endblock %}
EOF

########################
# 6) trades.html, analytics.html, settings.html
########################
cat <<'EOF' > $PROJECT_NAME/app/templates/trades.html
{% extends "base.html" %}
{% block title %}Trades{% endblock %}
{% block description %}Manage your futures trades{% endblock %}
{% block content %}
<div class="container mx-auto px-4 md:px-6 pt-6 pb-16 animate-fade-in">
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Trades</h2>
      <p class="text-muted-foreground">
        Manage and monitor all your futures trades.
      </p>
    </div>
    <button class="mt-4 md:mt-0 btn btn-primary flex items-center gap-1">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 4v16m8-8H4"/>
      </svg>
      New Trade
    </button>
  </div>

  <!-- Фильтр поиска -->
  <form method="get" class="flex flex-col sm:flex-row items-start sm:items-center mb-6">
    <input
      type="search"
      name="search"
      placeholder="Search trades..."
      class="border p-2 rounded w-full sm:w-64"
    />
    <button
      type="submit"
      class="bg-primary text-primary-foreground p-2 rounded mt-2 sm:mt-0 sm:ml-4"
    >
      Search
    </button>
  </form>

  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {% for trade in trades %}
    <div class="neo-morphism p-4 rounded-xl hover:-translate-y-0.5 transition-all duration-200">
      <h3 class="text-lg font-bold">{{ trade.symbol }}</h3>
      <p class="text-sm text-muted-foreground mt-1">{{ trade.type }} | {{ trade.status }}</p>
      <p class="mt-2">Entry Price: ${{ trade.entryPrice }}</p>
      <p>Current Price: ${{ trade.currentPrice }}</p>
      <p>PnL: ${{ trade.pnl }} ({{ trade.pnlPercentage }}%)</p>
      <p class="text-xs text-muted-foreground mt-2">{{ trade.timestamp }}</p>
    </div>
    {% endfor %}
  </div>
</div>
{% endblock %}
EOF

cat <<'EOF' > $PROJECT_NAME/app/templates/analytics.html
{% extends "base.html" %}
{% block title %}Analytics{% endblock %}
{% block description %}Analyze your futures trading performance{% endblock %}
{% block content %}
<div class="container mx-auto px-4 md:px-6 pt-6 pb-16 animate-fade-in">
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Analytics</h2>
      <p class="text-muted-foreground">
        Track and analyze your futures trading performance.
      </p>
    </div>
    <button class="mt-4 md:mt-0 btn btn-outline flex items-center gap-1">
      <!-- Иконка экспорта -->
      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 4v16m8-8H4"/>
      </svg>
      Export
    </button>
  </div>

  <div class="grid gap-4 md:grid-cols-2">
    <div class="p-4 bg-card rounded shadow">
      <h3 class="text-lg font-semibold mb-2">Cumulative P&L</h3>
      <p class="text-sm text-muted-foreground mb-4">P&L over time</p>
      <div class="h-[300px] w-full">
        <canvas id="pnlAnalyticsChart"></canvas>
      </div>
    </div>
    <div class="p-4 bg-card rounded shadow">
      <h3 class="text-lg font-semibold mb-2">Portfolio Allocation</h3>
      <p class="text-sm text-muted-foreground mb-4">Allocation by asset</p>
      <div class="h-[300px] w-full">
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  </div>
</div>
{% endblock %}
{% block scripts %}
<script>
  const pnlData = {{ pnl_data | safe }};
  const pieData = {{ pie_data | safe }};

  // Линейный график
  const ctx1 = document.getElementById('pnlAnalyticsChart').getContext('2d');
  new Chart(ctx1, {
    type: 'line',
    data: {
      labels: pnlData.map(item => item.date),
      datasets: [{
        label: 'PnL',
        data: pnlData.map(item => item.value),
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        borderColor: 'rgba(59, 130, 246, 1)',
        fill: true
      }]
    },
    options: { responsive: true }
  });

  // Круговая диаграмма
  const ctx2 = document.getElementById('pieChart').getContext('2d');
  new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: pieData.map(item => item.name),
      datasets: [{
        data: pieData.map(item => item.value),
        backgroundColor: ['#3b82f6', '#10b981', '#6366f1', '#f43f5e']
      }]
    },
    options: { responsive: true }
  });
</script>
{% endblock %}
EOF

cat <<'EOF' > $PROJECT_NAME/app/templates/settings.html
{% extends "base.html" %}
{% block title %}Settings{% endblock %}
{% block description %}Configure your futures trading platform{% endblock %}
{% block content %}
<div class="container mx-auto px-4 md:px-6 pt-6 pb-16 animate-fade-in">
  <h2 class="text-2xl font-bold tracking-tight mb-2">Settings</h2>
  <p class="text-muted-foreground mb-6">
    Manage your preferences and account settings.
  </p>

  <div class="grid gap-4 md:grid-cols-2">
    <div class="p-4 bg-card rounded shadow">
      <h3 class="text-lg font-semibold mb-2">Profile Information</h3>
      <p class="text-sm text-muted-foreground mb-4">Update your personal details.</p>
      <form>
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-muted-foreground">Name</label>
          <input id="name" type="text" class="mt-1 block w-full border p-2 rounded" placeholder="John Doe">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-muted-foreground">Email</label>
          <input id="email" type="email" class="mt-1 block w-full border p-2 rounded" placeholder="john@example.com">
        </div>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </form>
    </div>
    <div class="p-4 bg-card rounded shadow">
      <h3 class="text-lg font-semibold mb-2">Security</h3>
      <p class="text-sm text-muted-foreground mb-4">Change password or enable 2FA.</p>
      <form>
        <div class="mb-4">
          <label for="current-password" class="block text-sm font-medium text-muted-foreground">Current Password</label>
          <input id="current-password" type="password" class="mt-1 block w-full border p-2 rounded">
        </div>
        <div class="mb-4">
          <label for="new-password" class="block text-sm font-medium text-muted-foreground">New Password</label>
          <input id="new-password" type="password" class="mt-1 block w-full border p-2 rounded">
        </div>
        <button type="submit" class="btn btn-primary">Update Security</button>
      </form>
    </div>
  </div>
</div>
{% endblock %}
EOF

########################
# 7) index.css (бывший src/index.css) – переменные и анимации
########################
cat <<'EOF' > $PROJECT_NAME/app/static/css/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Цветовые переменные (светлая тема) */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    
    --radius: 0.5rem;

    --positive: 160 84% 39%;
    --positive-foreground: 0 0% 98%;
    
    --negative: 0 84.2% 60.2%;
    --negative-foreground: 0 0% 98%;
    
    --neutral: 230 15% 70%;
    --neutral-foreground: 0 0% 98%;
  }

  /* Тёмная тема */
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    
    --positive: 160 84% 39%;
    --positive-foreground: 0 0% 98%;
    
    --negative: 0 84.2% 60.2%;
    --negative-foreground: 0 0% 98%;
    
    --neutral: 230 15% 70%;
    --neutral-foreground: 0 0% 98%;
  }
}

/* Базовые стили */
@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Кастомные анимации */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Neo-morphism, Glass-morphism и т.д. */
.glass-morphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .glass-morphism {
  background: rgba(20, 20, 20, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.neo-morphism {
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05),
              -5px -5px 15px rgba(255, 255, 255, 0.8);
}

.dark .neo-morphism {
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3),
              -5px -5px 15px rgba(50, 50, 50, 0.2);
}

/* Пример кнопок */
.btn {
  @apply px-4 py-2 rounded font-medium transition-colors duration-200;
}

.btn-primary {
  @apply bg-primary text-primary-foreground hover:bg-primary/90;
}

.btn-outline {
  @apply border border-foreground/20 text-foreground hover:bg-foreground/10;
}

/* Пример для мобильного меню */
.mobile-nav-link {
  @apply block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary hover:text-foreground transition-colors duration-200;
}

.nav-link {
  @apply text-sm font-medium transition-colors duration-200 text-muted-foreground hover:text-foreground;
}

/* Пример кастомного скроллбара */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}
.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
}
EOF

########################
# 8) tailwind.config.js
########################
cat <<'EOF' > $PROJECT_NAME/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./app/templates/**/*.html",
    "./app/static/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        positive: {
          DEFAULT: 'hsl(var(--positive))',
          foreground: 'hsl(var(--positive-foreground))'
        },
        negative: {
          DEFAULT: 'hsl(var(--negative))',
          foreground: 'hsl(var(--negative-foreground))'
        },
        neutral: {
          DEFAULT: 'hsl(var(--neutral))',
          foreground: 'hsl(var(--neutral-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      }
    }
  },
  plugins: []
}
EOF

########################
# 9) JS-файл для переключения темы
########################
cat <<'EOF' > $PROJECT_NAME/app/static/js/themeToggle.js
(function() {
  const htmlEl = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const iconEl = document.getElementById('themeToggleIcon');

  // При загрузке проверяем, не в тёмной ли теме пользователь
  // (можно сохранить в localStorage, если нужно)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark && !localStorage.getItem('theme')) {
    htmlEl.classList.add('dark');
  }
  if (localStorage.getItem('theme') === 'dark') {
    htmlEl.classList.add('dark');
  }

  function updateIcon() {
    // Пример: если есть класс dark — показываем иконку солнца, иначе — луны
    if (htmlEl.classList.contains('dark')) {
      // иконка солнца
      iconEl.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66 5.66l1.42 1.42M4.93 4.93l1.42 1.42M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
    } else {
      // иконка луны
      iconEl.innerHTML = '<path d="M21.752 15.002A9.718 9.718 0 0112.998 22C7.201 22 2.5 17.299 2.5 11.502c0-4.21 2.717-7.79 6.707-9.058.513-.167.98.343.82.844A7.498 7.498 0 0012.998 19a7.47 7.47 0 004.213-1.367c.461-.36 1.086.04.938.59z"></path>';
    }
  }

  updateIcon();

  toggleBtn?.addEventListener('click', () => {
    htmlEl.classList.toggle('dark');
    // Сохраняем состояние в localStorage
    if (htmlEl.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    updateIcon();
  });

  // Мобильное меню
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      if (mobileMenu.classList.contains('max-h-0')) {
        mobileMenu.classList.remove('max-h-0');
        mobileMenu.classList.add('max-h-screen');
      } else {
        mobileMenu.classList.remove('max-h-screen');
        mobileMenu.classList.add('max-h-0');
      }
    });
  }
})();
EOF

########################
# 10) requirements.txt
########################
cat <<'EOF' > $PROJECT_NAME/requirements.txt
Flask==2.2.5
gunicorn==20.1.0
EOF

########################
# 11) Dockerfile
########################
cat <<'EOF' > $PROJECT_NAME/Dockerfile
# Используем официальный образ Python
FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app/

EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:create_app()"]
EOF

########################
# 12) docker-compose.yml
########################
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

########################
# Создаём виртуальное окружение и устанавливаем зависимости
########################
echo "Создаём виртуальное окружение и устанавливаем зависимости..."
python3 -m venv $PROJECT_NAME/venv
source $PROJECT_NAME/venv/Scripts/activate
pip install --upgrade pip
pip install -r $PROJECT_NAME/requirements.txt

########################
# Инструкция по сборке Tailwind
########################
cat <<EOF

Проект $PROJECT_NAME успешно создан.

Чтобы собрать Tailwind, вам нужно установить tailwindcss (либо локально, либо глобально).
Например:
  npm install -D tailwindcss postcss autoprefixer

Затем инициализировать postcss.config.js и т.д. Либо используйте готовую CLI-команду:
  npx tailwindcss -i ./app/static/css/index.css -o ./app/static/css/index_compiled.css --watch

После этого замените в base.html:
  <link href="{{ url_for('static', filename='css/index_compiled.css') }}" rel="stylesheet">
вместо index.css.

Запуск локально:
  cd $PROJECT_NAME
  source venv/bin/activate
  flask --app app:create_app() run

Или через Docker Compose:
  docker-compose up --build

EOF
