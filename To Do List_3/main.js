/* 
로직정리
1.유저가 값을 인풋에 입력한다.
2.그리고 +버튼을 누르면 아이템이 추가된다. 할일이 추가된다.
3.유저가 삭제 버튼을 누르면 할일이 삭제된다.
4.유저가 체크 버튼을 누르면 할일이 끝나면서, 중간줄이 생긴다.
5.진행중 끝남 탭을 누르면, 언더바가 이동한다.
6.끝남탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 보여주게 된다. 전체탭을 누르면 전체 아이템을 보여준다.
*/

let taskList = [];
let filterList = [];
let mode = 'all'        // filter함수 안에서 재할당 해줌

let taskInput = document.getElementById('task-input')
let addButton = document.getElementById('add-button')
let tabs = document.querySelectorAll('.task-tabs div')     // tabs는 배열이 됨

addButton.addEventListener('click', addTask)
taskInput.addEventListener('focus', focusInput);
taskInput.addEventListener("keyup", function(event){       // 엔터키와 버튼을 연결시키는 공식
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("add-button").click();
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
    let taskItem = {
        id : randomIDGenerate(),      /* randomIDGenerate의 리턴값이 들어옴 */
        taskContent : taskInput.value,  
        isComplete : false
    } 
    taskList.push(taskItem)  
    console.log(taskList)
    render()
}

function render(){
    let list = [];
    if(mode == 'all'){                  // 처음에 mode는 전역변수로 all로 되어있음 
        list = taskList
    }else if(mode == 'ongoing' || mode == 'done'){
        list = filterList
    }
    let resultHTML = '';                            /* resultHTML공간을 비워줌, taskList배열은 채워져 있음 */
    for(let i = 0; i < list.length; i++){           /* taskList배열이 늘어날때, 그 길이 값마다, 반복식을 이용해 비워진 resultHTML공간을 다시 되풀이하여 채워줌  */
        if(list[i].isComplete == true){
            resultHTML += ` <div class="task">
                                <div class="task-done">${list[i].taskContent}</div>  
                                <div>
                                    <button id="checkButton" onclick="toggleComplete('${list[i].id}')">체크</button>
                                    <button id="deleteButton" onclick="deleteTask('${list[i].id}')">삭제</button>
                                </div>
                            </div>`
                            // class="task-done"을 넣어 taskInput.value에 가로줄 넣기
        }else{
            resultHTML += ` <div class="task">
                                <div>${list[i].taskContent}</div>  
                                <div>
                                    <button id="checkButton" onclick="toggleComplete('${list[i].id}')">체크</button>
                                    <button id="deleteButton" onclick="deleteTask('${list[i].id}')">삭제</button>
                                </div>
                            </div>`
        }
       /*  resultHTML += `<div class="task">
                            <div>${taskList[i].taskContent}</div>  
                            <div>
                                <button onclick='toggleComplete('${taskList[i]}.id')'>체크</button>
                                <button>삭제</button>
                            </div>
                        </div>` */
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

function toggleComplete(id){                                         /* 체크버튼이 클릭되면 객체 taskItem 안의 isComplete의 키값을 변경시키기 위한 함수  */          
    console.log(id)                                                  /* isComplete의 키값이 true라면 다시 render()함수로 돌아가 공백이 된 resultHTML안을 */
    for(let i = 0; i < taskList.length; i++){                        /* isComplete의 키값이 true인 객체가 포함된 배열을 되풀이 하여 html상의 task-board에 넣어준다. 키값이 true인 객체는 클래스task-done를 가져 line-through가 그어진다. */
        if(taskList[i].id == id){                                    
            taskList[i].isComplete = !taskList[i].isComplete         /* !(not)연산자로 taskList[i].isComplete의 true값을 뒤집어 준다. 체크버튼 처음누르면 가로줄 생기고 다시 누르면 가로줄 사라지는 기능*/
            break                                                    /* taskList는 전역변수로 올라와 있으므로 각 함수들 안의 taskList 속성값은 서로 연결된다 */
        }
    }
    render()
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
    render()
}

function filter(event){                 // 포인터이벤트가 발생해 이벤트 내용에 div의 id 이름이 포함되어 있음 매개변수명.target.id로 호출. 매개변수와 인수의 이름은 임의의 내용
    console.log(event.target.id)        // filter 함수는 html상에서 all ongoing done가 클릭되었을 때 실행됨
    filterList = []
    mode = event.target.id              // mode는 html div의 id 이름이 들어간다.
    document.getElementById('under-line').style.width = event.target.offsetWidth + 'px'       /* 언더라인 크기를 tabs에 맞춰 이동시키는 공식 */
    document.getElementById('under-line').style.top = '53px'
    document.getElementById('under-line').style.left = event.target.offsetLeft + 'px'
    if(mode == 'all'){
        render()
    }else if(mode == 'ongoing'){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render()
    }else if(mode == 'done'){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
}/* 깃허브에서 가져온 랜덤 id 만드는 함수. 체크 버튼 클릭시 배열taskList의 객체 중 어느 객체의 체크버튼이 눌려졌는지 id값을 줘 구분. 객체안 키id의 키값으로 넣어줌 */

function focusInput(){
    taskInput.value = "";
}