import Head from 'next/head'
import Image from 'next/image'
import customStyles from './timer.module.css'

import Segment from '../components/Segment';
import Cell from '../components/Cell';

import { useState, useEffect, useRef } from 'react';

export default function Home() {

  const [config, setConfig] = useState({
    outer: {
      name: "Outer Surface",
      time: 15,
      styles: {
        radius: 180,
        stroke: 3,
        reversed: true,
        beforecolor: "#222222",
        startcolor: "#555555",
        endcolor: "#AAFFAA",
        donecolor: "#00FF00"
      }
    },
    chewing: {
      name: "Chewing Surface",
      time: 15,
      styles: {
        radius: 170,
        stroke: 3,
        reversed: true,
        beforecolor: "#222222",
        startcolor: "#555555",
        endcolor: "#AAFFAA",
        donecolor: "#00FF00"
      }
    },
    inner: {
      name: "Inner Surface",
      time: 15,
      styles: {
        radius: 160,
        stroke: 3,
        reversed: true,
        beforecolor: "#222222",
        startcolor: "#555555",
        endcolor: "#AAFFAA",
        donecolor: "#00FF00"
      }
    }
  });

  const [percentages, setPercentages] = useState({
    outer: {
      tl: 0,
      tr: 0,
      bl: 0,
      br: 0
    },
    chewing: {
      tl: 0,
      tr: 0,
      bl: 0,
      br: 0
    },
    inner: {
      tl: 0,
      tr: 0,
      bl: 0,
      br: 0
    }
  });

  const [fullfilled, setFullfilled] = useState({
    outer: 0,
    chewing: 0,
    inner: 0
  });

  // - - -

  let iterateOrder = ["tl", "tr", "bl", "br"];
  let baseOrder = ["tl", "tr", "br", "bl"];
  let basePoints = {
    top: 4.5,
    right: 5.5,
    bot: 6.5,
    left: 7.5
  }

  const [startingPoint, setStartingPoint] = useState("left")
  const [clockwise, setClockwise] = useState(false)

  const [segmentOrder, setSegmentOrder] = useState(["bl", "br", "tr", "tl"]);
  const [timeInputSafe, setTimeInputSafe] = useState(["15", "15", "15"]);

  const [showSettings, setShowSettings] = useState(false);

  const rotation = { tl: 180, tr: 270, bl: 90, br: 0 }

  // - - - COLOR RELATED - - -

  const getColor = (percentage, beforeC, startC, endC, doneC) => {

    if (percentage == 0) {
      return beforeC;
    } else if (percentage == 1) {
      return doneC;
    }

    const r1 = parseInt(startC.slice(1, 3), 16);
    const g1 = parseInt(startC.slice(3, 5), 16);
    const b1 = parseInt(startC.slice(5, 7), 16);

    const r2 = parseInt(endC.slice(1, 3), 16);
    const g2 = parseInt(endC.slice(3, 5), 16);
    const b2 = parseInt(endC.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * percentage);
    const g = Math.round(g1 + (g2 - g1) * percentage);
    const b = Math.round(b1 + (b2 - b1) * percentage);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const calcPercentages = (ms, config: Object) => {
    let tmp = {};
    let time = calcTime(config) - ms;

    Object.entries(config).forEach(([surface, config]) => {
      tmp[surface] = {};

      segmentOrder.forEach((quadrant) => {
        if (time == 0) {
          tmp[surface][quadrant] = 0;
        } else if (time > config.time * 1000) {
          tmp[surface][quadrant] = 1;
          time -= config.time * 1000;
        } else if (time > 0) {
          tmp[surface][quadrant] = time / (config.time * 1000);
          time = 0;
        }
      });
    });

    calcFullfilled(tmp);

    return tmp;
  }
  
  const calcFullfilled = (percentages) => {
    let tmp = {
      outer: 0,
      chewing: 0,
      inner: 0
    };

    Object.entries(percentages).forEach(([surface, percentages]) => {
      Object.entries(percentages).forEach(([quadrant, percentage]) => {
        if (percentage == 1) {
          tmp[surface] += 1;
        }
      });
    });

    setFullfilled(tmp);
  }

  // - Amount of surfaces that are currently fullfilled
  const calcTotalFullfilled = (fullfilled) => {
    let tmp = 0;

    Object.values(fullfilled).forEach((value: number) => {
      tmp += value;
    });

    return tmp;
  }

  // - Name of the surface that is currently unfullfilled
  const calcCurrentFullfilled = (fullfilled) => {
    let throwIt = null;

    Object.entries(fullfilled).some(([key, value]) => {
      if (value != 4) {
        throwIt = [config[key].name, value];
        return true;
      }
    });

    if (throwIt !== null) {
      return throwIt
    }

    let keys = Object.keys(fullfilled);
    return [config[keys[keys.length - 1]].name, 4]
  }

  // - - - CONFIG RELATED - - -

  function toggleShowSettings() {
    
    if (running) {
      toggleTimer();
    }

    setShowSettings((previous) => !previous);

    if (showSettings) {
      setOrder(clockwise, startingPoint);
    }
  }

  function setOrder(clockwise: boolean, startingPoint: string) {
    let start = basePoints[startingPoint] + (clockwise ? 0.5 : -0.5);
    let tmpOrder = [];
    for (let i = 0; i > -4 && i < 4; clockwise ? i++ : i--) {
      tmpOrder.push(baseOrder[(start + i + 4) % 4]); // Adding 4 to handle negative values
    }

    Object.keys(config).forEach((surface, i) => {
      if (config[surface].time != Number(timeInputSafe[i])) {
        config[surface].time = Number(timeInputSafe[i]);
        setMs(calcTime(config));
      } else {
        setMs(prev => prev + 1);
        setMs(prev => prev - 1);
      };
    })

    Object.keys(config).forEach((surface, i) => {
      config[surface].styles.reversed = (clockwise ? false : true);
    });

    setSegmentOrder(tmpOrder);
  }

  // - - - TIMER RELATED - - -

  const [ms, setMs] = useState(calcTime(config));
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [msStop, setMsStop] = useState(0);


  // calculate the time that should be counted down
  function calcTime(config: Object) {
    let tmp = 0;

    Object.entries(config).forEach(([surface, config]) => {
      tmp += config.time * 1000 * 4;
    });

    return tmp;
  }

  // convert to mm:ss:ms
  function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    const formattedMinutes = String(minutes).padStart(1, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }

  // - - - EVENT HANDLERS - - -

  function toggleTimer() {
    setStartTime(Date.now());
    if (ms == 0) {
      setMs(calcTime(config));
      setMsStop(0);
    }
    setRunning((previous) => !previous);
    if (!running) {
      setMsStop(calcTime(config) - ms);
    }
  }

  // - - - USE EFFECTS - - -
  
  const intervalRef = useRef();

  // update this shitty stuff

  useEffect(() => {

    const decrease = async () => {
      if (ms >= 10 && running) {
        intervalRef.current = setInterval(() => {
          setMs(calcTime(config) - (Date.now() - startTime + msStop))
        }, 10) as any;
      } else if (ms < 10) {
        setMs(0);
        setRunning(false);
        setMsStop(0);
      }
    };

    decrease();
    setPercentages(calcPercentages(ms, config) as any);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [ms, running]);

  // - - - INIT - - -

  useEffect(() => {
    setMs(calcTime(config));
    setPercentages(calcPercentages(ms, config) as any);
  }, []);

  // - - - RENDER - - -

  return (
    <div className={customStyles.container}>

      <Head>
        <title>t3lls tooth timer</title>
        <link rel="icon" href="https://data.t3l.ls/media/t3.ico" />
      </Head>

      <div className={customStyles.main}>

        {/* Segments / Circle of the Timer */}
        <div className={customStyles.container} onClick={toggleTimer}>
          <div className={customStyles.circles}>
            { Object.entries(config).map(([surface, config]: any) => (
              // - - - ITERATE OVER SURFACES - - -
              <div key={surface} className={customStyles.grid2x2}>
                { iterateOrder.map((quadrant) => (
                  // - - - ITERATE OVER QUADRANTS - - -
                  <Segment
                    radius={config.styles.radius}
                    stroke={config.styles.stroke}
                    rotation={rotation[quadrant]}
                    percentage={percentages[surface][quadrant]}
                    reversed={config.styles.reversed}
                    background={config.styles.beforecolor}
                    foreground={getColor(percentages[surface][quadrant], config.styles.beforecolor, config.styles.startcolor, config.styles.endcolor, config.styles.donecolor)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Inside of the Timer */}
        <div className={customStyles.inside} onClick={toggleTimer}>
          <div className={customStyles.time}>
            { formatTime(ms) }
          </div>
          <div className={customStyles.fullfilment}>
            <Cell tag={ calcCurrentFullfilled(fullfilled)[0] } value={`${ calcCurrentFullfilled(fullfilled)[1] }/4`} width={6.7} />
            <br></br>
            <Cell tag="Total" value={`${ calcTotalFullfilled(fullfilled) }/${ Object.keys(config).length * 4 }`} width={4.3} />
          </div>
        </div>
      </div>

      {/* Settings Button */}
      <div className={customStyles.clickable} onClick={toggleShowSettings}>
        {
          showSettings ? (
            <Image className={customStyles.settingsIcon} src="https://data.t3l.ls/media/icons/cancel2.svg" alt="Settings" width={500} height={500} />
          ) : (
            <Image className={customStyles.settingsIcon} src="https://data.t3l.ls/media/icons/InfoGear.svg" alt="Settings" width={500} height={500} />
          )
        }
      </div>

      {/* Settings */}
      { showSettings && (
        <div className={customStyles.settingsBox}>
          <div className={customStyles.config} >
            <div>
              <div className={customStyles.generalTime}>
                <button className={customStyles.button} onClick={toggleShowSettings}>switch to advanced settings</button>
              </div>
              <p>Choose the starting point of the timer:</p>
              <input type="radio" id="top" name="startingpoint" defaultChecked={startingPoint == "top"} onChange={() => setStartingPoint("top")}/>
              <label htmlFor="top">Top</label>
              <input type="radio" id="bottom" name="startingpoint" defaultChecked={startingPoint == "bottom"} onChange={() => setStartingPoint("bottom")}/>
              <label htmlFor="bottom">Bottom</label>
              <input type="radio" id="right" name="startingpoint" defaultChecked={startingPoint == "right"} onChange={() => setStartingPoint("right")}/>
              <label htmlFor="right">Right</label>
              <input type="radio" id="left" name="startingpoint" defaultChecked={startingPoint == "left"} onChange={() => setStartingPoint("left")}/>
              <label htmlFor="left">Left</label>
            </div>
            <br/>
            <p>Choose the rotation of the timer:</p>
            <div>
              <input type="radio" id="right" name="rotation" defaultChecked={clockwise} onChange={() => setClockwise(true)}/>
              <label htmlFor="right">Clockwise</label>
              <input type="radio" id="left" name="rotation" defaultChecked={!clockwise} onChange={() => setClockwise(false)}/>
              <label htmlFor="left">Counter-Clockwise</label>
            </div>
            <br/>
            <p>Choose the time for each surface:</p>
            <div className={customStyles.generalTime}>
              <input className={customStyles.textInput} type="text" id="timeInput" value={timeInputSafe[0]} onChange={(e) => setTimeInputSafe([e.target.value, timeInputSafe[1], timeInputSafe[2]])}/>
              <input className={customStyles.textInput} type="text" id="timeInput" value={timeInputSafe[1]} onChange={(e) => setTimeInputSafe([timeInputSafe[0], e.target.value, timeInputSafe[2]])}/>
              <input className={customStyles.textInput} type="text" id="timeInput" value={timeInputSafe[2]} onChange={(e) => setTimeInputSafe([timeInputSafe[0], timeInputSafe[1], e.target.value])}/>
              </div>
          </div>
        </div>
      )}

      <footer className={customStyles.footer}>
        <a href="https://t3l.ls" target="_blank" rel="noopener noreferrer">
          © 2024 t3lls by Tell Hensel
        </a>
      </footer>

    </div>
  )
}