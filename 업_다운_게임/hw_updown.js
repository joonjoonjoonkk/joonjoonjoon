let computer_number = 0;
let life = 7;
let defeat = false;
let js_input_value_list = []
let playButton = document.getElementById('play_button');
let resetButton = document.getElementById('reset_button');
let js_input = document.getElementById('input');
let js_result = document.getElementById('result')
let seven_life = document.getElementById('seven')



function random_number(){
    computer_number = Math.floor(Math.random()*100) + 1
    console.log(computer_number)
}
random_number();

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
js_input.addEventListener('focus', focusOn);

function play(){
    const inputValue = js_input.value;
    if(inputValue > 100 || inputValue < 1 ){
        js_result.textContent = '1~100까지다';
        return;
    }
    if(js_input_value_list.includes(inputValue)){
        js_result.textContent = '이미 선택했었다';
        return;
    }
    if(inputValue < computer_number){
        js_result.textContent = 'UP!!'
    } else if(inputValue > computer_number){
        js_result.textContent = 'DOWN!!'
    } else{
        js_result.textContent = '목숨을 건졌군!!!!'
        defeat = true;
    }
    life--;
    seven_life.textContent = `${life}`
    js_input_value_list.push(inputValue)
    console.log(js_input_value_list)
    if(life == 0){
        js_result.textContent = '네 목숨은 내 것이다.'
        defeat = true;
    }
    if(defeat == true){
        playButton.disabled = true;
    }
}

function focusOn(){
    js_input.value = '';
}

function reset(){
    random_number();
    js_input.value = '';
    js_result.textContent = '어떻게 될까??';
    defeat = false;
    playButton.disabled = false;
    life = 7;
    seven_life.textContent = `${life}`
    js_input_value_list = [];
}

