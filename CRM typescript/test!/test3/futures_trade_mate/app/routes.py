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
