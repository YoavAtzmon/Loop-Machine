import Bass from '../audioTrack/bass.mp3'
import BassDrum from '../audioTrack/bassdrum.mp3'
import BreakBeats from '../audioTrack/breakbeats.mp3'
import FunkBeats from '../audioTrack/funkbeats.mp3'
import Guitar from '../audioTrack/guitar.mp3'
import MazePolitics from '../audioTrack/mazepolitics.mp3'
import RockGroove from '../audioTrack/rockgroove.mp3'
import Synth from '../audioTrack/synth.mp3'
import Tanggu from '../audioTrack/tanggu.mp3'
import { Howl, Howler } from 'howler';
import React, { useEffect, useState } from 'react'
import { Switch, ButtonGroup, IconButton, makeStyles, Radio, RadioGroup, Typography, ThemeProvider, Paper, Button } from '@material-ui/core'
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import { grey, red, purple } from '@material-ui/core/colors'
import { createTheme } from '@material-ui/core/styles'


const theme = createTheme({
    palette: {
        background: {
            default: '#000',
            paper: '#000'
        },
        type: "dark",
        primary: {
            main: '#fefefe'
        }
    },

})
const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            width: ' 100%',
        },
        radio: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',

        },
        play: {
            backgroundColor: grey[300],
            width: '60px',
            color: "#0098f5b8"
        },
        title: {
            color: "#0098f5b8",
            margin: theme.spacing(4),
            fontFamily: 'fantasy',
            color: "#ffffffba"
        },
        on: {
            color: red[500]
        },
        sound: {
            fontFamily: 'fantasy',
            margin: theme.spacing(2, 12.5),
            fontSize: "x-large",
        },
        playRecord: {
            fontFamily: 'fantasy',
            margin: theme.spacing(2, 12.5),
            fontSize: "x-large",
            '&:hover': {
                color: red[400]
            }
        },
        button: {
            margin: "30px"
        },
        session: {
            backgroundColor: "#ffffffba",
            borderRadius: '30px'
        }
    }
})
const audioTracks = [
    { sound: Bass, label: 'Bass', icon: "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-electric-guitar-rock-and-roll-justicon-lineal-color-justicon.png" },
    { sound: BassDrum, label: 'BassDrum', icon: "https://img.icons8.com/emoji/48/000000/drum-emoji.png" },
    { sound: Tanggu, label: 'Tanggu', icon: "https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-drums-tropical-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png" },
    { sound: BreakBeats, label: 'BreakBeats', icon: "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-drum-rock-and-roll-justicon-lineal-color-justicon.png" },
    { sound: Guitar, label: 'guitar', icon: "https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/000000/external-guitar-stay-home-vitaliy-gorbachev-blue-vitaly-gorbachev.png" },
    { sound: FunkBeats, label: 'funkBeats', icon: "https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-drum-chinese-new-year-wanicon-lineal-color-wanicon.png" },
    { sound: Synth, label: 'Synth', icon: "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-keyboard-rock-and-roll-justicon-lineal-color-justicon.png" },
    { sound: RockGroove, label: 'RockGroove', icon: "https://img.icons8.com/color/48/000000/drum-set.png" },
    { sound: MazePolitics, label: 'MazePolitics', icon: "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/000000/external-stars-location-vitaliy-gorbachev-flat-vitaly-gorbachev.png" },
]


export default function App() {
    const classes = useStyles(),
        [onAndOff, setOnAndOff] = useState([]),
        [mode, setMode] = useState(''),
        [counter, setCounter] = useState(0),
        [checked, setChecked] = useState(false),
        [session, setSession] = useState(''),
        [error, setError] = useState(''),
        [replay, setReplay] = useState([]),
        [replayMode, setReplayMode] = useState('')
    // [timer,setTimer] = useState(0)



    function trackPlay(status, arr) {
        if (mode == 'play' && !status) {
            console.log(onAndOff);
            onAndOff.forEach(item => item.stop())
            onAndOff.forEach(item => item.play())
            setCounter(counter + 1)
        }
        else if (mode == 'join' && !status) {
            console.log(`join:`, onAndOff)
            onAndOff[0].on('end', function () {
                setMode('play')
            })
        }
        else if (status == 'off' && counter > 0) {
            onAndOff.forEach(item => item.pause())
            arr.forEach(item => item.play())
        }
        else {
            onAndOff.forEach(item => item.stop())
            setCounter(0)
            // setOnAndOff([])
        }
    }

    function handleOnClick(src, status) {
        if (status == 'on') {
            setOnAndOff([...onAndOff, new Howl({
                src,
                loop: true
            })])
            setMode('join')
            if (checked) {
                let arr = []
                arr = JSON.parse(localStorage.record)
                arr.push({ click: src, time: Date.now(), type: status })
                localStorage.record = JSON.stringify(arr)
            }
        }
            else {
                let arr = onAndOff.filter(item => item._src != src)
                trackPlay('off', arr)
                setOnAndOff(arr)
            }
        }

        function rePlay(status, arr) {
            console.log(status);
            if (replayMode == 'play' && !status) {
                console.log(`play:`,replay);
                replay.forEach(item => item.stop())
                replay.forEach(item => item.play())
                setCounter(counter + 1)
            }
            else if (replayMode == 'join' && !status) {
                console.log(`join:`,replay);
                replay[0].on('end', function () {
                    setReplayMode('play')
                })
            }
            else if (status == 'off' && counter > 0) {
                replay.forEach(item => item.pause())
                arr.forEach(item => item.play())
            }
            else if(replayMode == 'stop'){
                console.log('we got to the stop!');
                console.log(`replay:`, replay)
                replay.forEach(item => item.stop())
                setCounter(0)
            }
        }

        function handleOnReplay(src, status) {
            if (status == 'on') {
                console.log(`src :`,src);
                setReplay([...replay, new Howl({
                    src,
                    loop: true
                })])
                setReplayMode('join')
            }
            else {
                let arr = replay.filter(item => item._src != src)
                rePlay('off', arr)
                setReplay(arr)
            }
        }

        function handleRec(event) {
            
            setChecked(event.target.checked)
            if (event.target.checked) {
                delete localStorage.record
                if (counter > 0 || onAndOff.length == 0) {
                    setError(`for record you have to select one track at least or stop the loop`)
                    setChecked(false)
                }
                else {
                    setError('')
                    setMode('play')
                }
                
                let arr = []
                localStorage.record = JSON.stringify([{ start_time: Date.now() }])
                onAndOff.forEach(item => {
                    if (onAndOff.length == 1) {
                        arr = JSON.parse(localStorage.record)
                        arr.push({ click: item._src }, { click: 'play' })
                        localStorage.record = JSON.stringify(arr)
                    }
                    else {
                        if (arr.length == onAndOff.length) {
                            arr = JSON.parse(localStorage.record)
                            arr.push({ click: item._src }, { click: 'play' })
                            localStorage.record = JSON.stringify(arr)
                        }
                        else {
                            arr = JSON.parse(localStorage.record)
                            arr.push({ click: item._src })
                            localStorage.record = JSON.stringify(arr)
                        }
                    }
                })

            }
            else {
                setSession('session')
            }
        }


        function playSession() {
            let arr = JSON.parse(localStorage.record)
            arr.forEach( (item, index)=> {
                if (index != 0 && item.click != 'play' && item.click != 'stop') {
                    if (!item.time)
                        handleOnReplay(item.click, 'on')
                    else {
                        setTimeout(() => {
                            handleOnReplay(item.click, item.type)
                        }, item.time - arr[0].start_time)
                    }
                }
                else if (item.click == 'play') {
                    if (!item.time)
                    setTimeout(() => {
                        setReplayMode('play')
                    },0.01)
                    else {
                        setTimeout(() => {
                            setReplayMode('play')
                        }, item.time - arr[0].start_time)
                    }
                }
                else if (item.click == 'stop') {
                    setTimeout(() => {
                        setReplayMode('stop')
                    }, item.time - arr[0].start_time)

                }
            })
        }

        useEffect(() => trackPlay(), [mode])
        useEffect(() => rePlay(), [replayMode])

        Howler.volume(0.2)

        return <ThemeProvider theme={theme}>
            <Paper className={classes.wrapper}>
                <div className="container">
                    <Typography
                        className={classes.title}
                        variant="h4"
                    >LOOPER MACHINE</Typography>
                    {audioTracks.map((track, index) =>
                        <div className="loop">
                            <RadioGroup className={classes.radio} color="primary">
                                <Radio key={index} value={'on'} className={classes.on} onClick={() => handleOnClick(track.sound, 'on')} /><p className="p">ON</p>
                                <Radio key={track.label} color="primary" value={'off'} className={classes.r} onClick={() => handleOnClick(track.sound, 'off')} /><p className="p"> OFF</p>
                            </RadioGroup>
                            <div className='title'>
                                <Typography className={classes.sound}>  {track.label}</Typography>
                                {/* <img className="img" src={track.icon} /> */}
                            </div>
                        </div>

                    )}
                    <ButtonGroup className={classes.button}>
                        <IconButton
                            className={classes.play}
                            name="play"
                            onClick={() => {
                                if (checked) {
                                    let arr = JSON.parse(localStorage.record)
                                    arr.push({ click: 'play' })
                                    localStorage.record = JSON.stringify(arr)
                                }
                                setMode('play')
                            }
                            }

                        >
                            <PlayCircleFilledWhiteOutlinedIcon />
                        </IconButton>
                        <IconButton
                            className={classes.play}
                            name="stop"
                            onClick={() => {
                                if (checked) {
                                    let arr = JSON.parse(localStorage.record)
                                    arr.push({ click: 'stop', time: Date.now() })
                                    localStorage.record = JSON.stringify(arr)
                                }
                                setMode('stop')
                            }
                            }
                            color="secondary"
                        >
                            <StopOutlinedIcon />
                        </IconButton>
                    </ButtonGroup>

                    {error ? <Typography variant="h5" color="error">{error}</Typography> : ''}
                    <Typography className={classes.playRecord}>play & record</Typography>
                    <Switch
                        checked={checked}
                        onChange={handleRec}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    {session ?
                        <Button
                            className={classes.session}
                            onClick={playSession}
                        >PLAY SESSION</Button> : ''}
                </div>
            </Paper>
        </ThemeProvider>

    }
