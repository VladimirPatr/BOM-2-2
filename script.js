
const timeWrapperTag = document.querySelector('.laptop__time-wrapper');
const timerTag = document.querySelector('.laptop__timer');
const timeData = `${timeWrapperTag.dataset.timerDeadline}`;





const createTimer =() => {
    timeWrapperTag.style.backgroundColor = 'red';
    timeWrapperTag.insertAdjacentHTML(
        'beforeend',
        `     <p class="laptop__title">До конца акции:</p>
        <ul class="laptop__timer" >
            <li class="laptop__item ">
                <span class="laptop__item-day">3</span>
                <p class="paragraph__item-day"></p>
            </li>
            <li class="laptop__item">
                <span class="laptop__item laptop__item-hour">8</span>
                <p class="paragraph__item-hour"></p>
            </li>
            <li class="laptop__item">
                <span class="laptop__item laptop__item-minute">43</span>
                <p class="paragraph__item-minute"></p>
            </li>   
        </ul>`,)
}
const timer = deadline => {
    const timerBlockDay = document.querySelector('.laptop__item-day');
    const timerBlockHour = document.querySelector('.laptop__item-hour');
    const timerBlockMinute = document.querySelector('.laptop__item-minute');

    const timerParDay = document.querySelector('.paragraph__item-day');
    const timerParHour = document.querySelector('.paragraph__item-hour');
    const timerParMinute = document.querySelector('.paragraph__item-minute');

    const getTimeRemaining = ()=> {
        const dataStop = new Date(deadline).getTime();
        const dataNow = Date.now();
        const timeRemaining = dataStop - dataNow;

        const date = new Date();
        const timeGrinvich = (date.getTimezoneOffset() + 180)/60;
        console.log(timeGrinvich)

        
        const minutes = Math.floor(timeRemaining/1000/60 % 60);
        const hours = Math.floor(timeRemaining/1000/60/60 % 24) + timeGrinvich;
        const days = Math.floor(timeRemaining/1000/60 /60/24 );

        return {
            timeRemaining,  minutes, hours, days
        }
    };
    const start = ()=> {
        const timer = getTimeRemaining();

        timerBlockDay.textContent =  timer.days;
        timerBlockHour.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
        timerBlockMinute.textContent =  timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;

        const dec = timer.days%100;
        const h = timer.hours%100;
        const m = timer.minutes%10;

        timerParDay.textContent = ((dec >=11 &&  dec <= 19) || dec >= 5 || dec == 0) ? 'дней' : (dec == 1 ? 'день' : 'дня');
        timerParHour.textContent = ((h >=11 &&  h <= 19) || h >= 5 || h == 0) ? 'часов' : (h == 1 ? 'час' : 'часа');
        timerParMinute.textContent = ((m >=11 &&  m <= 19) || m >= 5 || m == 0) ? 'минут' : (m == 1 ? 'минута' : 'минуты');


       const intervalID =  setTimeout(start, 1000);

       if( timer.days==0 && timer.hours < 24){
        timeWrapperTag.style.backgroundColor = 'green';
       };

       if(timer.timeRemaining <= 0){
        clearTimeout(intervalID);
        timeWrapperTag.innerHTML = '';
       };
    };
    start()
};

if (timeWrapperTag.dataset.timerDeadline){
    createTimer()
    timer(timeData)
}



