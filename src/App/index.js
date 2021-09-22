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
import {  red } from '@material-ui/core/colors'
import { createTheme } from '@material-ui/core/styles'


const theme = createTheme({
    palette: {
        background: {
            paper: '#000'
        },
        type: "dark",
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
            backgroundColor: '#ffffffba',
            width: '60px',
            color: red[500]
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
            // margin: theme.spacing(2, 12.5),
            fontSize: "x-large",
            '&:hover': {
                color: red[500]
            }
        },
        button: {
            margin: "30px"
        },
        session: {
            fontFamily: 'fantasy',
            margin: theme.spacing(2, 12.5),
            fontSize: "x-large",
            '&:hover': {
                color: red[500]
            }
        }
    }
})
const audioTracks = [
    { sound: Bass, label: 'Bass' },
    { sound: BassDrum, label: 'BassDrum' },
    { sound: Tanggu, label: 'Tanggu' },
    { sound: BreakBeats, label: 'BreakBeats' },
    { sound: Guitar, label: 'guitar', },
    { sound: FunkBeats, label: 'funkBeats' },
    { sound: Synth, label: 'Synth' },
    { sound: RockGroove, label: 'RockGroove' },
    { sound: MazePolitics, label: 'MazePolitics' }
]


export default function App() {
    const classes = useStyles(),
        [onAndOff, setOnAndOff] = useState([]),
        [mode, setMode] = useState(''),
        [counter, setCounter] = useState(0),
        [checked, setChecked] = useState(false),
        [session, setSession] = useState(''),
        [error, setError] = useState('')







    function trackPlay() {
        if (mode == 'play') {
            console.log(onAndOff);
            onAndOff.forEach(item => item.stop())
            onAndOff.forEach(item => item.play())
            setCounter(counter + 1)
        }
        else if (mode == 'join') {
            console.log(`join:`, onAndOff)
            onAndOff[0].on('end', function () {
                setMode('play')
            })
        }
        else if (mode == 'off' || mode == 'of') {
            let src = JSON.parse(localStorage.off)
            onAndOff.forEach(item => item._src == src ? item.stop() : '')
            let array = onAndOff.filter(item => item._src != src)
            setOnAndOff(array)

        }
        else {
            onAndOff.forEach(item => item.stop())
            setCounter(0)

        }
    }

    function handleOnClick(src, status) {
        if (status == 'on') {
            setOnAndOff([...onAndOff, new Howl({
                src,
                loop: true,
                volume: src == Guitar ? 0.5 : 0.1
            })])
            if (counter > 0)
                setMode('join')
            if (checked) {
                let arr = []
                arr = JSON.parse(localStorage.record)
                arr.push({ click: src, time: Date.now(), type: status })
                localStorage.record = JSON.stringify(arr)
            }
        }
        else {
            localStorage.off = JSON.stringify(src)
            if (checked) {
                let arr = []
                arr = JSON.parse(localStorage.record)
                arr.push({ click: src, time: Date.now(), type: status })
                localStorage.record = JSON.stringify(arr)
            }
            setMode(mode == 'off' ? 'of' : 'off')

        }
    }


    function handleRec(event) {
        setChecked(event.target.checked)
        if (event.target.checked) {
            setSession('')
            delete localStorage.record
            if (counter > 0 || onAndOff.length == 0) {
                setError(`select one track at least or stop the loop`)
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
        let play = []
        arr.forEach((item, index) => {
            if (index != 0 && item.click != 'play' && item.click != 'stop') {
                if (!item.time) {
                    let src = item.click
                    play.push(new Howl({
                        src,
                        loop: true,
                        volume: src == Guitar ? 0.5 : 0.1
                    }))

                }

                else {
                    if (item.type == 'on') {
                        setTimeout(() => {
                            let src = item.click
                            play.push(new Howl({
                                src,
                                loop: true,
                                volume: src == Guitar ? 0.5 : 0.1
                            }))

                            play[0].on('end', function () {
                                play.forEach(item => item.stop())
                                play.forEach(item => item.play())
                            })
                        }, item.time - arr[0].start_time)
                    }
                    else if (item.type == 'off') {
                        setTimeout(() => {
                            console.log(`play off:`, play);

                            play.forEach(element => element._src == item.click ? element.stop() : '')
                            let played = play.filter(element => element._src != item.click)
                            play = played

                        }, item.time - arr[0].start_time)
                    }
                }
            }
            else if (item.click == 'play') {
                if (!item.time) {
                    play.forEach(item => item.play())
                }
                else {
                    setTimeout(() => {

                        play.forEach(item => item.stop())
                        play.forEach(item => item.play())
                    }, item.time - arr[0].start_time)
                }
            }
            else if (item.click == 'stop') {
                setTimeout(() => {

                    play.forEach(item => item.stop())
                }, item.time - arr[0].start_time)

            }
        })
    }

    useEffect(() => trackPlay(), [mode])


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
                                arr.push({ click: 'play', time: Date.now() })
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

                <Typography className={classes.playRecord}>play & record</Typography>
                {error ? <Typography  className={classes.playRecord} variant="h5" color="error">{error}</Typography> : ''}
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
