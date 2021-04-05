var user;
var opcolors = ['D4546A', 'ECA82D', '319CA6', '2F6DAE'];
var curr_q_no = 0;
var s_clr = "#62C370";
var f_clr = "#E63947";
var score = 0;
var isAnswered = false;
var qtl_timer;
var q_stime;
var q_timer = 30;
var qti;
var questions = [
    {
        id: 1,
        q: "Many of the people suffer from the problem of acnes and feel annoyed of the ugly skin texture caused due to the acne spots. Can you guess the microorganism causing these acne",
        options: {
            1: "H1N1 virus",
            2: "Trypanosoma",
            3: "Leishmania",
            4: "Staphylococcus"
        },
        c_ans: 4
    },
    {
        id: 2,
        q: "Which one of the following is not a bacterial disease?",
        options: {
            1: "Cholera",
            2: "Tuberculosis",
            3: "Anthrax",
            4: "Influenza"
        },
        c_ans: 4
    },
    {
        id: 3,
        q: "Which one of the following disease is not transmitted by mosquito?",
        options: {
            1: "Brain fever",
            2: "Malaria",
            3: "Typhoid",
            4: "Dengue"
        },
        c_ans: 3
    },
    {
        id: 4,
        q: "Which one of the following disease is not caused by bacteria?",
        options: {
            1: "Typhoid",
            2: "Anthrax",
            3: "Tuberculosis",
            4: "Malaria"
        },
        c_ans: 4
    },
    {
        id: 5,
        q: "Which one of the following is not a viral disease?",
        options: {
            1: "Dengue",
            2: "AIDS",
            3: "Typhoid",
            4: "Influenza"
        },
        c_ans: 3
    },




]

window.onload = function () {
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("resultContainer").style.display = "none";
}

function onStart() {
    user = document.getElementById("user").value;
    if(user){
        document.getElementById("startContainer").style.display = "none";
        document.getElementById("quizContainer").style.display = "block";
        curr_q_no = 1;
        score = 0;
        document.getElementById("username").innerHTML = user;
        formQandO();
    }else{
        alert("Please Enter user name")
    }

}

function onShowResult() {
    setTimeout(() => {
        document.getElementById("quizContainer").style.display = "none";
        document.getElementById("resultContainer").style.display = "block";
        document.getElementById("score").innerHTML = score;        
    }, 2000);
    clearTimeout(qtl_timer);
    clearInterval(qti);
}


function shufflColors() {
    opcolors.sort(() => Math.random() - 0.5);
}


function generateOptionBlocks(options) {
    clearTimeout(qtl_timer);
    clearInterval(qti);
    let d = document.getElementById("optionBlocksRow");
    d.innerHTML = "";
    opcolors.sort(() => Math.random() - 0.5);
    for (let i = 0; i < opcolors.length; i++) {
        let op = `<div class="col-md-3">
        <div class="card" id="o${i + 1}" style="background-color:#${opcolors[i]}" onclick="onAnswer(${i + 1})">
            <div class="card-body">
                <div class="optiontext">${options[i + 1]}</div>
            </div>
        </div> 
    </div>`;
        d.insertAdjacentHTML("beforeend", op);
    }
    q_stime = new Date().getTime();
    q_timer = 30;
    let ele = document.getElementById("timer") 
    ele.style.animation = "none";
     ele.style.backgroundColor = "green";
    ele.innerHTML = "00:30";
   qti = setInterval(() => {
       q_timer--;
       let t = q_timer<10?"0"+q_timer:q_timer;
       ele.innerHTML = "00:"+t;
       if(q_timer<=10){
        ele.style.animation = "blinker 1s linear infinite";
        ele.style.backgroundColor = "red";
       }

    }, 1000);    
    qtl_timer = setTimeout(() => {
        curr_q_no<5?goToNextQuestion():onShowResult();
    }, 28000);
}

function formQandO() {
    let obj = questions[curr_q_no - 1];
    document.getElementById("cquestion").innerHTML = curr_q_no + ". " + obj.q;
    generateOptionBlocks(obj.options);
}

function onAnswer(i) {
    let duration= new Date().getTime() - q_stime;
    let bonus = Math.round(duration/1000)>15?0:0.5;
    clearTimeout(qtl_timer);
    if (isAnswered) {
        return
    } else {
        isAnswered = true;
        let c_ans = questions[curr_q_no - 1].c_ans;
        let sel_ans = i;
        if (sel_ans == c_ans) {
            onCorrectAns(sel_ans,bonus);
        } else {
            onWrongAns(sel_ans, c_ans);
        }
    }
}


function onCorrectAns(sel_ans,bonus) {
    score++;
    score +=bonus;
    document.getElementById(`o${sel_ans}`).style.backgroundColor = s_clr;
    let sel_options = [sel_ans];
    hideRemainingOptions(sel_options);
}


function onWrongAns(sel_ans, c_ans) {
    document.getElementById(`o${sel_ans}`).style.backgroundColor = f_clr;
    document.getElementById(`o${c_ans}`).style.backgroundColor = s_clr;
    let sel_options = [sel_ans, c_ans];
    hideRemainingOptions(sel_options);
}

function hideRemainingOptions(sel_options) {
    let all_options = [1, 2, 3, 4];
    let non_sel_options = all_options.filter((val) => {
        return sel_options.indexOf(val) == -1;
    });
    for (let ele of non_sel_options) {
        console.log(ele);
        document.getElementById(`o${ele}`).style.display = "none";
    }
    curr_q_no<5?goToNextQuestion():onShowResult();
}


function goToNextQuestion(){
    setTimeout(() => {
        curr_q_no ++;
        isAnswered = false;
        formQandO();        
    }, 2000);

