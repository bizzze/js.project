const toDoForm = document.querySelector(".todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".todo-list");

const TODOS_KEY = "todos";

// 좀 다른 개념으로 접근할 것이.. input을 여기 js로 가져오는 거랑
// input의 value를 가져오는 거는 의미 자체가 다름

// !!check!!  --> getElementsByClassname에 대해서 이해를 못하고 있는 것 같다.

let toDos = [];

// 위 array의 목적을 생각해보자.
// 우선, 현재 상황이야 - todo가 추가되고 잘 삭제되지만, 새로고침을 하면
// reset 되버려 -> 이런 상황을 방지하려면 localstorage에 저장해야해
// 일단 새로 추가될 때마다 이 array에 추가되는 방안으로 생각해보자!
// 받아온 todolist를 array에 push하고 싶은거지!

function deleteTodo(event) {
  /* 위에 그냥 deletetodo를 만들면 단점이 하나 있어
  // -> 바로, 리스트가 추가되면 될수록 버튼들이 늘러나는데
  // 모두 같은 event를 listen하고 그것에 같은 함수로 반응하기 때문에
  // 내가 어떤 버튼을 눌렀다고 해서 실제로 어떤 버튼이 눌렸는지 확실히
  // 알기 힘들죠? -> 내가 클릭된 버튼에 함수를 실행한다는 식을 만든다고 가정하면..
  // 하지만, addeventlistner 함수를 실행하게 되면, 인수로 실행되는 함수에
  // 해당 event가 일어났을 때의 각종 event 정보가 함수의 첫 번째 인수로 담겨

  // 지, 그럼 그 event property 중에 target이라는 속성이 있어
  // 이것은 어느 것이 클릭된 target인지에 대한 정보를 담고 있지
  // 그리고 target 안에 parentElement or node -> 이것이 어떤 부모의 btn이 눌렸는지
  // 알 수 있지!! -> 즉, 어떤 리스트가 클릭된 것인지 알 수 있지!
  // 이걸 아니까 우리가 원하는 target list를 삭제할 수 있게 되었지
  // so, 이제 이것을 변수로 담아내야 정보를 살릴 수 있겠지 */
  const deleteList = event.target.parentElement;
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(deleteList.id));
  /* 생각을 깊게 해봅시다. todo는 todos에 담긴 object들을 하나씩 불러올거야.
  우리는 todos를 갱신할거야 -> 어떻게?
  위에 deletelist에는 event(click)의 target이 된 element의 정보를 갖고있어
  우리가 클릭한 deletelist.id를 가진 놈을 지우고 싶은 거잖아
  1. 지우고 싶은 놈을 click했을 때, 해당 obj의 element들을 불러오지 -> 사실 이거 까먹음
  2. 그럼, 선택 당한 id와 같은 놈을 지우고 싶다 -> 아닌 놈들을 갱신해서 새 array에 넘기자.
  3. 그래서 위의 수식이 나온거야 -> 이거 이거 정말 중요하다.
  4. 근데 막상 실행해보면 잘 적용이 안돼 -> 왜? delete.id는 string형인데 todo.id는 숫자형이기때문이지
  5. so, 간단하게 parseint만 부여해주면 돼.*/
  deleteList.remove();
  // 그리고 갱신된 것도 나중에 새로고침을 해서도 계속 불러와야 하니까 savetodos를 실행.
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  // 자, 그리고 li마다 고유의 식별번호를 붙여서 어떤 li를 선택하는지 분리하기 위해서
  // li에 id를 부여할 건데, 그것이 newtodoobj의 id로 부여될 수 있도록 했어.
  li.id = newTodo.id;
  // 이제, 우리는 object에 id를 사용할 방법을 찾아버린거지! -> 이제 delete을 할 수 있찌!
  const span = document.createElement("span");
  // 이제 우리는 newtodo로 받는 인수부분이 text가 아닌 object를 받아 -> object는 그 안에 value값들이 존재하지 -> 즉 object.item으로 표시가 돼!
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerHTML = "🤞";
  button.classList.add("button");
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);

  toDoList.appendChild(li);
  // 위 paintToDo는 newtodo 인수를 받아오는데, newtodo는 handletodoform함수에서
  // 정의된 변수로, todoinput의 value값을 받아올 인수이자 변수야.

  //tiny recap for 7.1
  // 기억해야할 건, 논리적인 흐름과 어디에 속해있는지 흐름을 잘 따라가야함
  // 그리고 무엇을 할 지에 대해서 명확히 하고 코드를 작성하자.

  // 나는 todoform이 submit 돼었을 때,
  // 1. 새로고침이 바로 작동 안했으면 좋겠어.
  // 2. 해당 값을 받아서 내가 html 코드로 작성한 리스트 안에 span으로
  //    리스트 value가 리스트 형식으로 나왔으면 좋겠어

  // 그래서 handletodoform 함수를 생성하고 이벤트 기본 동작을 block
  // 내가 input에 입력한 값을 변수에 할당하고 초기화해서 계속 받을 수 있도록 함.
  // 그리고 해당 value값을 리스트 형식으로 추가할거야
  // painttodo 함수를 만들어서 그 안에 인수로 newtodo를 받을거야.
  // list item 안에 span 형식으로 value값이 innertext 해줬으면 좋겠다.
  //  작은 가로 안 -> list item tag 안에 span을 담는 과정과 span에 value 표시
  // 큰 가로 안 -> 그 list item을 todolist라는 list에 포함시키는 과정!
}

function saveToDos() {
  // 애의 일은 todos array의 내용을 localstorage에 넣는거야.
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  // 그러면 todos의 내용들이 todos key의 value로 저장이 돼!
  // 근데 중요한 점은 refresh하고 새로 입력하면
  // key의 value 값이 reset이 되버린다는 것이에요!!
}

function handleToDoForm(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  // 이것을 한 이유는 인풋 값을 가져오고 그것을 변수에 저장했어
  // 그리고 초기화를 시키는 과정이지 -> 한 submit event에서!

  // ------------------------------------------------------------------
  /* II. 여기서 보면, 우리는 text형의 value값을 받아서 todos array에 push하게 돼. 근데 우리는 object로 넘길거니까 object를 새로 선언해보자!
     밑에 처럼, 오브젝트를 새로 변수로 선언해준 다음에, text를 newtodo로 value값을 받아오고 / id를 랜덤값으로 받기 위해 Date.now()험수를 사용!*/

  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
  };

  /* 이제 id를 사용해볼건데, id를 사용하는 방식은 id를 html에 추가해주는거야 
   So, painttodo에 object를 이제 넘겨줄건데 이것이 문제가 될 수 있어
   왜냐면, painttodo를 보면 text를 넘겨받는 것으로 되어 있고, 이것을 표시하는 함수이기 때문
   이거 고치는 것은 III로 가시오~!*/

  toDos.push(newToDoObj);
  // 이건, painttodo로 todolist 를 그려내기 전에, array에 추가하는거야
  // 저장 작업!!

  paintToDo(newToDoObj);
  // 여기서 painttodo에 올바른 인수를 보내려면 인수값을 저장한 변수명을
  // 그대로 입력해야겠죠?
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoForm);

// 내가 아마 js submissiong에서 실수했던 부분은 input을 가져오기는
// 했지만, input-value를 전체 할당에 저장해놔서 변화하는 값에
// 함수가 대응을 못하기때문 -> 함수에는 기존에 저장된 값만
// 추출되는 현상이 나옴 = 이거때문인 것 같은데???

// 중요!!!! -> localstorage에는 array를 저장할 수 없어!
// only text!!
// 이 말의 뜻은 이건 것 같아
// -> array 자체(안에 있는 것까지해서)를 value 값으로 저장할 수 없지만
// 위의 방식은 array라는 공간 [   ] 안에 들어가는 string 값들을
// value로 받아서 할당 - 저장하는거지!

// 근데 나는 이것을 array형식으로 저장하고 싶은데, 실제로 그게 안된다는 말이지

// so 이를 보조해주는 브라우저의 기능이 있지요
// -> 바로 json.stringify(  )
// 이건 object나 array나 어떤 것이든 그 형태를 string처럼 바꿔줘요.
// 이걸 하니까 원래 a, b, c 이렇게 value 값들이 저장되었는데
// ["a", "b", "c"] 이런 식으로 저장이 돼.
// 우리는 값을 string으로 저장하고 싶을 때, JSON.stinrgify를 쓸 거에요~
// 대신 형태는 비슷할 지 몰라도 array의 역할을 하는 것이 나닌
// 형태만 비슷한 !!! string 이라는 점을 잊지 말도록

// 이거와는 반대로 array를 string으로 저장했으면 저장한 string을
// array로 불러오는 방법도 존재해.
// -> JSON.parse(value)

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  // array는 정말 중요한 data structure야!
  // js는 이 array 안의 각각의 요소에 함수를 적용할 수 있는 기능을 부여해.
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
  // 하지만, 지금 각각의 요소에 대응하는 함수가 어떤 요소에 대응하고 있는지
  // 알아야 의미가 있어
  // 지금 이 함수가 어디에 적용되는지 알아야 하기 때문
  // 어떤 요소에 지금 이 함수가 적용이 되고 있나 -> 사용도를 확인
  // js는 addeventlistener에게 event 정보를 제공하는 것처럼
  // foreact에도 item에 대한 정보를 넘겨줘 첫 번째 인수로

  // 이제 우리는 localstorage에 있는 value를 계속 나타내는 작업을 해야겠죠
  // 근데 이미 우리는 list도 만들어주고 btn도 만들어주는 함수를 가지고있어
  // 값을 newtodo로 넘겨주면 돼

  // 그럼 parsedToDos.forEach(paintToDo); 를 적용하면 뭐가 newtodo로 넘어가냐
  // foreach(paintTodo("index1"))
  // 이런 식으로 foreach가 제공하는 item의 정보가 차례대로 인수로 넘겨지겠지!

  // 자, 일단 지금 문제가 하나 더 있어
  // 우리가 해놓은 형식을 보면 새로 입력한 값에 대하여 저장하고 그것을 표시하는 설계를 해서 그것이 잘 돼고 있어
  // 하지만, 새로고침을 하고 다시 입력을 때리면 localstorage안에 있던 내용이 갱신이 되버린다는거야
  // 이 문제는 우리가 todos array가 submit이 되고 나서 모두 실행이 되고 나면
  // refresh 되었을 때 빈 공간으로 시작한다는 것이지.
  // 우리가 갖고있던 todos의 이전 복사본을 잊어버린다는 거야.
  // 이건 todos array를 빈 값으로 시작하는 대신에~~ let으로 바꿔주고
  // if todo들이 localstorage에 있다면,
  // todos에 parseTodos를 넣어서 복구를 할거야.
}

// 자 이제 남은 문제는 우리가 x버튼을 눌러서 화면에서 todo를 지워도
// localstorage에 있는 value가 그대로 남아있다는 거야.

/* to do array와 local storage는 다르다 !! -> local storage는 array를 복사한 것임!
   실제 database의 역할을 하지는 못한다.  우리는 현재 어떤 todo list의 text를 데이터베이스에서 지워야 할 지 모르는 상황이다.
   만약에 array에 같은 것이 두 개이면 해당 index를 지우려할 때, 어떤 순서의 index가 지워진 지 몰라.
  그래서 그걸 구별하고 싶어서 index마다 id를 부여하고 싶어 -> object로 만들어주는거지. 
  랜덤 id가 있는  형태 => [{id: random number, text : "index_item_text"}] 이런 식으로!!

  1. 우선 Date now()함수는 ms초 (1000분의 1초)를 주는 함수야 
    이걸 랜덤한 숫자를 얻어내는 것처럼 응용할 수 있어 -> console창에 표시된 숫자들을 보면 딱 그렇게 나오거든!

  2. 자, 그러면 일단 데이터베이스로 저장되는 경로를 살펴보면, 
    i. todo array에 text가 push 함수를 통해서 전달이 돼.
     -> 근데 난 이걸 object를 push하고 싶어. --> ii번을 찾아가세용*/

// 이번엔 filter에 대해서 배울 것임!!

/*
만약 array에서 뭔가를 삭제할 때, 실제로 array에서 삭제하는 것이 아니라
지우고 싶은 item을 빼고 새로운 array를 만드는 것임
 -> item을 지우는 것이 아니라 제외하는 것임
  -> 지우고 싶은 item을 제외하는 것 -> 그리고 새로운 array를 만듬



filter는 우리가 정의한 filter함수를 불러서 실행시켜
-> 각 array의 index에 우리가 정의한 필터 함수를 실행시켜
-> 그리고 우리가 정의한 filter함수를 true로 반환시켜야해
 --> 만약 새 array에서 이 object를 유지하고 싶다면
 --> 아 이해했어, 어떤 index를 제외하고 새로운 array를 만들 때
 --> 즉 내가 계속 이어나가고 싶은 애들은 true값으로 반환되도록 하고, 그러면 새로운 array에 애내가 담길 거야
  ---> 그리고 false값으로 반환되는 애는 제외되고 새로운 array가 완성돼.
-> array[1,2,3,4]filter(function that i defined)
-> 이렇게 하면 deff(1), deff(2), deff(3)... 이렇게 진행되는거고 위의 진행방식이 진행된다. */
// -> 이거는 js가 deff를 4번 부르는건데 그때마다 안의 index는 달라져

// deff( 여기에는 index를 받아올 변수를 써주자)
// return true 조건 -> false들은 제외될거야.
// return 조건에 해당하면 유지할거야~

// filter function은 array에 실제로 작업하는 것이 아니라
// 새로운 array를 만들어낸다는 것을 정말 중요하게 기억해야 돼!!
// filter는 절대 array룰 변경하는게 아니야!!!!

// 또 filter(def function)으로 하지 않고, filter(조건)으로 해도 괜찮아!
