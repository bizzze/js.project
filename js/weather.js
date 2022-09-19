const API_KEY = "067a2e9126e3d48a74d5a07ef2a7837f";

// url을 불러오는 방법 -> js에서 이걸 지금 보여줄 거야.

// user의 위치를 줄거고 , 날씨

function onGeoOk(position) {
  // 우리는 js에서 제공한 함수를 실행하다보면 js 함수가 생각보다 많은 information을 전달해주는 걸 알고 있어 -> 어떤 함수냐에 따라 전달하는 정보도 다르지만
  // 그 중 유저의 위치야!
  // geolocation obj를 정보로 준다네. -> 이걸 첫 번째 argument로 정보를 받아오는거지.
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  console.log("you live in", lat, long);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
  // 이 url을 불러오면 코드 형식으로 보여지는 정보들이 페이지에 보여.
  // 저 url을 클릭하면 브라우저가 url로 이동해서 응답을 얻어.
  // fetch함수로 url을 불러올거야.
  fetch(url).then((response) =>
    response.json().then((data) => {
      const weatherClass = document.querySelector(".weather span:first-child");
      const city = document.querySelector(".weather span:last-child");
      weatherClass.innerHTML = `${data.weather[0].main} / ${data.main.temp}`;
      city.innerHTML = data.name;
    })
  );
  // inspect창에서 network 부분을 보면, 인터넷에서 무슨 일이 일어나고 있는지 확인할 수 있어.
  // fetch로 url을 js가 대신 불러오고 그것이 객체로 정보가 담겨져서 와
  // response의 json -> 객체로 불러온 정보들 형태가 -> json이라는 거 (잘 모르겠다.)
  // 이제 이 정보를 얻어왔을 때, js가 무얼 하도록 알려줘야 돼
  // fetch는 promise야 -> 즉각 반응이 아닌 서버의 응답이 됐을 때 일어나는 것.
  // 그래서 then을 써야 해.
}
function onGeoError() {
  alert("Can't find you, No weather information.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
// 브라우저에서 위치 좌표를 줄거야, wifi,위치 등등 다
// 우리는 js가 넘겨줄 정보를 담아줄 자리를 만들어주는 역할만 하면 돼.
// 우선 API계정을 열어야 해. -> openweathermap.org

// api는 다른 서버와 소통할 수 있는 창구
// openweather api랑 소통할거야
// current api와 소통할건데 -> 이거는 현재 우리의 좌표를 url에 보내면
