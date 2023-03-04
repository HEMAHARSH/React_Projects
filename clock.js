function App() {
  const [displaytime, setdisplaytime] = React.useState(25 * 60);
  const [breaktime, setbreaktime] = React.useState(5 * 60);
  const [sessiontime, setsessiontime] = React.useState(25 * 60);
  const [timerOn, settimerOn] = React.useState(false);
  const [onBreak,setOnBreak] =React.useState(false);
  const [breakbeep ,setbreakbeep] =React.useState(new Audio("./beepsound.mp3"));


  const playBreakSound =()=>
  {
    breakbeep.currentTime=0;
    breakbeep.play();
  }
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const changeTime = (amount, type) => {
    if (type == "break") {
      if (breaktime <= 60 && amount < 0) {
        return;
      }
      setbreaktime((previous) => previous + amount);
    } else {
      if (sessiontime <= 60 && amount < 0) {
        return;
      }
      setsessiontime((previous) => previous + amount);
      if (!timerOn) {
        setdisplaytime(sessiontime + amount);
      }
    }
  };

  const controlTime = () => {
    let second =1000;
    let date = new Date().getTime();
    let nextDate =new Date().getTime() + second;
    let onBreakVariable = onBreak;
    if(!timerOn)
    {
      let interval = setInterval(()=> {
      date =new Date().getTime();
      if(date > nextDate)
      {
        setdisplaytime(previous => {
          if(previous <= 0 && !onBreakVariable)
          {
            playBreakSound();
            onBreakVariable= true;
            setOnBreak(true)
            return breaktime;
          }else if(previous <= 0 && onBreakVariable)
          {
            playBreakSound();
            onBreakVariable= false;
            setOnBreak(false)
            return sessiontime;
          }
          return previous -1 ;
        });
        nextDate += second;
      }
      },30);
      localStorage.clear();
      localStorage.setItem('interval-id',interval)
    }

    if(timerOn)
    {
      clearInterval(localStorage.getItem("interval-id"))
    }

  settimerOn(!timerOn)


  };
  const resetTime =() =>{
    setdisplaytime(25*60);
    setbreaktime(5*60);
    setsessiontime(25*60);

  };
  return (
    <div className="center-align">
      <h2>25 + 5 Clock</h2>
      <div className="dual-container">
        <Length
          title={"Break length"}
          changeTime={changeTime}
          type={"break"}
          time={breaktime}
          formatTime={formatTime}
        />
        <Length
          title={"Session length"}
          changeTime={changeTime}
          type={"session"}
          time={sessiontime}
          formatTime={formatTime}
        />
      </div>
      <h3 >{onBreak ? "Break" : "Session"}</h3>
      <h1>{formatTime(displaytime)}</h1>
      <button className="btn-large cyan darken-4" onClick={controlTime} style={{boxShadow:"none"}}>
        {timerOn ? (
          <i className="material-icons">pause</i>
        ) : (
          <i className="material-icons">play_arrow</i>
        )}
      </button>
     <button className="btn-large cyan darken-4" onClick={resetTime} style={{boxShadow:"none"}}>
     <i className="material-icons">autorenew</i></button>
    </div>
  );
}

function Length({ title, changeTime, type, time, formatTime }) {
  return (
    <div>
      <h4>{title}</h4>
      <div className="time-sets">
        <button
          className="btn-large cyan darken-4"
          onClick={() => changeTime(-60, type)}
          style={{boxShadow:"none"}}
        >
          <i className="material-icons  ">arrow_downward</i>
        </button>
        <h3>{formatTime(time)}</h3>
        <button
          className="btn-large cyan darken-4"
          onClick={() => changeTime(60, type)}
          style={{boxShadow:"none"}}
        >
          <i className="material-icons  ">arrow_upward</i>
        </button>
      </div>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
