export const fetchExchangerates = async () => {
    try {
      const response = await fetch('https://api.apilayer.com/exchangerates_data/latest', {
        headers: {
          "apikey": 'WGBGwj00x6Df79ZkDIYsXeTti6Rg0Uo8'
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Something went wrong: ${response.statusText}. Response: ${errorText}`);
      }
  
      return response.json();
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error; 
    }
  };