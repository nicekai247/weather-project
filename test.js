class usingAPI {
    //GET
    getWord(url, word) {
        const endpoint = url + word;
        fetch(endpoint)
            .then(
                (response) => {
                    if (response.ok) {
                        return response.json();
                    }

                    throw new Error("request failed");
                },
                (networkError) => {
                    console.log(networkError.message);
                }
            )
            .then((jsonResponse) => {
                const data = [];

                for (let i = 0; i < 5; i++) {
                    data.push(jsonResponse[i]);
                }

                console.log(data);
            });
    }

    //POST
    update(url, input) {
        const data = JSON.stringify({ destination: input });

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: "218792dab4f0444e9e82c5f9dc85272f",
            },
            body: data,
        })
            .then(
                (response) => {
                    if (response.ok) {
                        return response.json();
                    }

                    throw new Error("Request failed");
                },
                (networkError) => {
                    console.log(`errrrr: ${networkError.message}`);
                }
            )
            .then((jsonResponse) => {
                console.log(jsonResponse.shortUrl);
            });
    }

    //GET with async, await
    async getShit(url, word) {
        const endPoint = url + word;
        try {
            const response = await fetch(endPoint);

            if (response.ok) {
                const resJson = await response.json();
                console.log(resJson);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async updateShit(url, input) {
        const data = JSON.stringify({ destination: input });

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    apikey: "e14a798d1073454595b0c3a403b53637",
                },
                body: data,
            });

            if (response.ok) {
                const resJson = await response.json();

                console.log(resJson.shortUrl);
            }
        } catch (e) {
            console.log(e);
        }
    }

    weather(city) {
        const APIkey = "639bfd53c62cbb871c7938e6833ff0af";
        const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&lang=vi`;
        console.log(endPoint);
        fetch(endPoint)
            .then(
                (response) => {
                    if (response.ok) {
                        return response.json();
                    }

                    throw new Error("request failed");
                },
                (networkError) => {
                    console.log(`request failed: ${networkError}`);
                }
            )
            .then((resJson) => {
                this.displayWeather(resJson);
            })
            .catch((err) => {
                this.notFound();
            });
    }

    displayWeather(data) {
        let result = document.querySelector("#display");
        let container = document.querySelector(".container");
        const { main, name, weather, sys, wind } = data;

        result.innerHTML = `
            <h3>Thời tiết hiện tại ở ${name}</h3>
            <p>Quốc gia: ${sys.country}</p>
            <p>Nhiệt độ: ${(main.temp - 273.15).toFixed(2)}°C</p>
            <p>Mô tả: ${weather[0].description}</p>
            <p>Độ ẩm: ${main.humidity}%</p>
            <p>Tốc độ gió: ${wind.speed} m/s</p>
        `;

        container.style.height = "400px";
        setTimeout(() => {
            container.style.backdropFilter = "blur(10px)";
        }, 10);
    }

    notFound() {
        let result = document.querySelector("#display");
        let container = document.querySelector(".container");

        result.innerHTML = `
            <i class='bx bxs-error' style="font-size: 120px;"></i>
            <h3>Không tìm thấy thành phố yêu cầu!</h3>
        `;
        container.style.height = "310px";
        setTimeout(() => {
            container.style.backdropFilter = "blur(10px)";
        }, 10);
    }
}

const api = new usingAPI();

// api.getWord("https://api.datamuse.com/words?sl=", word);

// api.update(
//     "https://api.rebrandly.com/v1/links",
//     "https://www.codecademy.com/journeys/full-stack-engineer/paths/fscj-22-front-end-development/tracks/fscj-22-async-javascript-and-http-requests/modules/wdcp-22-learn-javascript-syntax-requests-b556a0a9-9188-4d31-a713-5c1cbf63bc7c/lessons/js-requests-with-fetch-api/exercises/making-an-async-post-request"
// );

// api.updateShit(
//     "https://api.rebrandly.com/v1/links",
//     "https://www.codecademy.com/journeys/full-stack-engineer/paths/fscj-22-front-end-development/tracks/fscj-22-async-javascript-and-http-requests/modules/wdcp-22-learn-javascript-syntax-requests-b556a0a9-9188-4d31-a713-5c1cbf63bc7c/lessons/js-requests-with-fetch-api/exercises/making-an-async-post-request"
// );
// api.getShit(url, "shit");

document.addEventListener("DOMContentLoaded", () => {
    let input = document.querySelector("#city");
    let search = document.querySelector("#search");

    search.addEventListener("click", () => {
        let weather = input.value;
        api.weather(weather);
    });
});
