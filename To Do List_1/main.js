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

let taskInput = document.getElementById('task-input')
let addButton = document.getElementById('add-button')

addButton.addEventListener('click', addTask)

function addTask(){
    let taskItem = {
        taskContent : taskInput.value,  
        isComplete : false
    } 
    taskList.push(taskItem)  
    console.log(taskList)
    render()
}

function render(){
    let resultHTML = '';                           /* resultHTML공간을 비워줌?, taskList배열은 채워져 있음 */
    for(let i = 0; i < taskList.length; i++){      /* taskList배열이 늘어날때, 그 길이 값마다, 반복식을 이용해 비워진 resultHTML공간을 채워줌 */
        resultHTML += `<div class="task">
                            <div>${taskList[i].taskContent}</div>  
                            <div>
                                <button onclick='toggleComplete()'>체크</button>
                                <button>삭제</button>
                            </div>
                        </div>`
    }                   // taskList안에 들어간 객체의 키(taskContent)의 키값을 구함
                        // addEventListener말고 onclick으로도 이벤트를 줄 수 있음. onclick='함수명()
    document.getElementById('task-board').innerHTML = resultHTML
}