const API_KEY = 'Z57DI8T9JR83UKF2'; // Replace with your actual API key

async function getStockPrice() {
    const symbol = document.getElementById("symbol").value.toUpperCase();
    if (!symbol) {
        alert("Please enter a stock symbol.");
        return;
    }

    try {
        // Fetch stock price data
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${API_KEY}`);
        const data = await response.json();

        if (data["Time Series (1min)"]) {
            // Get the latest price from the time series
            const timeSeries = data["Time Series (1min)"];
            const latestTime = Object.keys(timeSeries)[0];
            const latestData = timeSeries[latestTime];
            const latestPrice = latestData["1. open"];

            document.getElementById("stock-result").innerHTML = `
                <p><strong>Stock:</strong> ${symbol}</p>
                <p><strong>Latest Price:</strong> $${latestPrice}</p>
                <p><strong>Last Updated:</strong> ${latestTime}</p>
            `;
        } else {
            document.getElementById("stock-result").innerHTML = `<p>Data not found for symbol: ${symbol}</p>`;
        }
    } catch (error) {
        console.error("Error fetching stock data:", error);
        document.getElementById("stock-result").innerHTML = `<p>Could not retrieve stock data. Please try again.</p>`;
    }
}
