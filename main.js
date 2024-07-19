const questions = [
	{
		question: "What language is running in the browser?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "What does CSS mean?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "What does HTML mean?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "In what year was JavaScript created??",
		answers: ["1996", "1995", "1994", "all answers are wrong"],
		correct: 2,
	},
];
//находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

//переменные игры
let score = 0; //кол-во правильных ответов
let questionIndex = 0; //текущий вопрос

cleanPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function cleanPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	console.log('showQuestion');
//вопрос


const headerTemplate = `<h2 class="title">%title%</h2>`;
const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])
headerContainer.innerHTML=title

//варианты ответов
let answerNumber = 1;
for (answerText of questions[questionIndex] ['answers']) {
	
	const questionTemplate =  
	`<li>
	     <label>
		<input value="%number%" type="radio" class="answer" name="answer" />
		<span>%answer%</span>
	</label>
     </li>`;

	
	 const answerHTML= questionTemplate
	 .replace('%answer%', answerText)
	 .replace('%number%', answerNumber)

	 listContainer.innerHTML += answerHTML;
	 answerNumber++;
}
}
function checkAnswer() {

	//находим выбранную кнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

//если ответ не выбран-ничего не делаем,выходим из функции
	if (!checkedRadio) {
		submitBtn.blur();
		return
	}
	//узнаем номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value)
	
	//Eсли ответ верно-увеличиваем счет
	if (userAnswer === questions[questionIndex]['correct']){
score++;
	}
	console.log('score =', score);

	if (questionIndex!== questions.length -1) {
		console.log('Это НЕ последний вопрос');
		questionIndex++;
		cleanPage();
		showQuestion();
		return;
	} else {
		console.log('Это последний вопрос');
		cleanPage();
		showResults();
	}
}
function showResults () {
	console.log('showResults sterted!')
	console.log(score);

	const resultTemplate = `
	<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>
	`;

	let title, message;
	//Варианты заголовков и текста
	if (score === questions.length) {
		title = 'Congratulations';
		message = 'You answered all the questions correctly';
	} else if ((score * 100) / questions.length >=50) {
		title = 'Not a bad result';
		message = 'You gave more than half of the correct answers';
	} else {
		title = 'Its worth trying';
		message = 'So far you have less than half of the correct answers';
	}

	//Результат
	let result = `${score} from ${questions.length}`;

	//Финальный ответ, подставляем данные в шааблон

	const finalMessage = resultTemplate
	.replace('%title%', title)
	.replace('%message%', message)
	.replace('%result%', result)

	headerContainer.innerHTML = finalMessage;

//Меняем кнопку на "Играть снова"
submitBtn.blur();
submitBtn.innerText = 'Start again';
submitBtn.onclick = () => history.go();
}
