const APP_ID = 'YOUR_APP_ID';
const APP_URL = `http://api.openweathermap.org/data/2.5/weather`;

export const getWeather = async (lat, lon) => {
	const res = await fetch(`${APP_URL}?lat=${lat}&lon=${lon}&units=metric&APPID=${APP_ID}`);
	const weatherData = await res.json();
	return weatherData;
};
