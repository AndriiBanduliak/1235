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
