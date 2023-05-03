/* 
로직정리
1.유저가 값을 인풋에 입력한다.
2.그리고 +버튼을 누르면 아이템이 추가된다. 할일이 추가된다.
3.유저가 삭제 버튼을 누르면 할일이 삭제된다.
4.유저가 체크 버튼을 누르면 할일이 끝나면서, 중간줄이 생긴다.
5.진행중 끝남 탭을 누르면, 언더바가 이동한다.
6.끝남탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 보여주게 된다. 전체탭을 누르면 전체 아이템을 보여준다.
*/

let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll('.task-tabs div');     // tabs는 배열이 됨

let mode = 'all';        // filter함수 안에서 재할당 해줌
let taskList = [];
let filterList = [];

addButton.addEventListener('click', addTask);
taskInput.addEventListener('focus', focusInput);
taskInput.addEventListener("keyup", function(event){       // 엔터키와 버튼을 연결시키는 공식
    if (event.keyCode === 13) {
        addTask()  // addTask(event)??
      /* event.preventDefault();
      document.getElementById("add-button").click(); */
    }
});

for(let i = 1; i < tabs.length; i++){                                  // for 반복문으로 tabs의 0을 제외한 1,2,3이 모두 addEventListener('click', function(event){filter(event)}) 적용
    tabs[i].addEventListener('click', function(event){filter(event)})  // 클릭했을 때 포인터이벤트가 발생함. 매개변수와 인수의 이름은 임의의 내용
}
/* 
tabs[1].addEventListener('click', function(event){filter(event)})
tabs[2].addEventListener('click', function(event){filter(event)})
tabs[3].addEventListener('click', function(event){filter(event)})
*/

function addTask(){
    let task = {
        id : randomIDGenerate(),      /* randomIDGenerate의 리턴값이 들어옴 */
        taskContent : taskInput.value,  
        isComplete : false
    } 
    taskList.push(task)  
    taskInput.value = '';  // + 버튼이나 엔터쳤을때 인풋칸 비움. taskList.push(task)위로 올라가면 안됨.
    render()
}

function toggleComplete(id){                                         /* 체크버튼이 클릭되면 객체 taskItem 안의 isComplete의 키값을 변경시키기 위한 함수  */          
    console.log(id)                                                  /* isComplete의 키값이 true라면 다시 render()함수로 돌아가 공백이 된 resultHTML안을 */
    for(let i = 0; i < taskList.length; i++){                        /* isComplete의 키값이 true인 객체가 포함된 배열을 되풀이 하여 html상의 task-board에 넣어준다. 키값이 true인 객체는 클래스task-done를 가져 line-through가 그어진다. */
        if(taskList[i].id == id){                                    
            taskList[i].isComplete = !taskList[i].isComplete         /* !(not)연산자로 taskList[i].isComplete의 true값을 뒤집어 준다. 체크버튼 처음누르면 가로줄 생기고 다시 누르면 가로줄 사라지는 기능*/
            break                                                    /* taskList는 전역변수로 올라와 있으므로 각 함수들 안의 taskList 속성값은 서로 연결된다 */
        }
    }
    filter()
}
/* addTask - render - toggleComplete - render()로 이어지는 함수 */

function deleteTask(id){
    console.log(id)
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break
        }
    }
    filter()
}

function filter(event){                 // 포인터이벤트가 발생해 이벤트 내용에 div의 id 이름이 포함되어 있음 매개변수명.target.id로 호출. 매개변수와 인수의 이름은 임의의 내용. filter 함수는 html상에서 all ongoing done, 체크와 딜리트버튼이 클릭되었을 때 실행됨.
    /* console.log(event.target.id) */  // 왜 이게 들어가면 체크와 딜리트 버튼이 실행이 안되는 걸까??
    if(event){
        mode = event.target.id          // event.target.id의 의미는 이벤트가 발생한 대상의 html의 id값.  // mode는 html div의 id 이름이 들어간다.
        document.getElementById('under-line').style.width = event.target.offsetWidth + 'px'              /* 언더라인 크기를 tabs에 맞춰 이동시키는 공식 */
        document.getElementById('under-line').style.top = '53px'
        document.getElementById('under-line').style.left = event.target.offsetLeft + 'px'
    }
    filterList = []
    if(mode == 'all'){
        render()
    } else if(mode == 'ongoing'){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render()
    } else if(mode == 'done'){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

function render(){
    let resultHTML = '';                            /* resultHTML공간을 비워줌, taskList배열은 채워져 있음 */
    let list = []
    if(mode == 'all'){                  // 처음에 mode는 전역변수로 all로 되어있음 
        list = taskList
    } else if(mode == 'ongoing' || mode == 'done'){
        list = filterList
    }
    for(let i = 0; i < list.length; i++){           /* taskList배열이 늘어날때, 그 길이 값마다, 반복식을 이용해 비워진 resultHTML공간을 다시 되풀이하여 채워줌  */
        if(list[i].isComplete == true){
            resultHTML += ` <div class="task">
                                <div class = "task-done">${list[i].taskContent}</div>  
                                <div>
                                    <button onclick="toggleComplete('${list[i].id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                                    <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                                  </svg></button>
                                    <button onclick="deleteTask('${list[i].id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                  </svg></button>
                                </div>
                            </div>`
                            // class="task-done"을 넣어 taskInput.value에 가로줄 넣기
                            // 버튼은 부트스트랩과 연결시켜 꾸밈.
        }else{
            resultHTML += ` <div class="task">
                                <div>${list[i].taskContent}</div>  
                                <div>
                                    <button onclick="toggleComplete('${list[i].id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                  </svg></button>  
                                    <button onclick="deleteTask('${list[i].id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                  </svg></button>
                                </div>
                            </div>`
        }
    }
    // taskList안에 들어간 객체의 키(taskContent)의 키값을 구함
    // addEventListener(자바스크립트에서 사용)말고 onclick(html에서 직접적으로 사용)으로도 클릭 이벤트를 줄 수 있음. 
    // onclick='함수명()'. onclick 붙은 버튼 클릭했을때 함수호출함. 함수호출의 인자가 아래 toggleComplete함수의 매개변수에 들어감
    document.getElementById('task-board').innerHTML = resultHTML
}
/* 
innerHTML과 textContent의 차이
innerHTML : Element의 HTML을 읽어오거나 설정할 수 있다. 태그 안에있는 HTML 전체의 내용을 들고 온다.
textContent : 해당 노드가 가지고 있는 텍스트 값을 그대로 가져온다. 글자만 들고 온다.
*/

function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
}/* 깃허브에서 가져온 랜덤 id 만드는 함수. 체크 버튼 클릭시 배열taskList의 객체 중 어느 객체의 체크버튼이 눌려졌는지 id값을 줘 구분. 객체안 키id의 키값으로 넣어줌 */

function focusInput(){
    taskInput.value = "";
}