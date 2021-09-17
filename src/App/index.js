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
import { ButtonGroup, IconButton, makeStyles, Radio, RadioGroup, Typography } from '@material-ui/core'
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import { grey, red,purple } from '@material-ui/core/colors'
import { createTheme } from '@material-ui/core/styles'
import {ThemeProvider} from '@material-ui/core'

const theme = createTheme({
    palette:{
      primary:{
        main:'#fefefe'
       },
       secondary:purple
    },
    typography:{
      fontFamily:'Quicksand',
      fontWeightLight : 400,
      fontWeightRegular : 500,
      fontWeightMedium : 600,
      fontWeightBold : 400
    }
  })
const useStyles = makeStyles((theme)=>{
    return {
    radio: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    play: {
        backgroundColor: grey[300],
        width: '60px',
        color :"#0098f5b8"
    },
    title:{
        color :"#0098f5b8",
        margin : theme.spacing(4),
        fontFamily:'fantasy',
        color:"#ffffffba"
    },
    on:{
        color:red[500]
    },
    sound:{
        fontFamily:'fantasy',
        // margin: theme.spacing(2,12.5),
        fontSize:"x-large"
    },
    button:{
        margin:"30px"
    }
}
})
const audioTracks = [
    { sound: Bass, label: 'Bass', icon: "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-electric-guitar-rock-and-roll-justicon-lineal-color-justicon.png" },
    { sound: BassDrum, label: 'BassDrum', icon: "https://img.icons8.com/emoji/48/000000/drum-emoji.png"},
    { sound: Tanggu, label: 'Tanggu', icon:"https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-drums-tropical-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png" },
    { sound: BreakBeats, label: 'BreakBeats', icon:"https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-drum-rock-and-roll-justicon-lineal-color-justicon.png"},
    { sound: Guitar, label: 'guitar', icon:"https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/000000/external-guitar-stay-home-vitaliy-gorbachev-blue-vitaly-gorbachev.png"},
    { sound: FunkBeats, label: 'funkBeats', icon:"https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-drum-chinese-new-year-wanicon-lineal-color-wanicon.png"},
    { sound: Synth, label: 'Synth', icon:"https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-keyboard-rock-and-roll-justicon-lineal-color-justicon.png" },
    { sound: RockGroove, label: 'RockGroove', icon: "https://img.icons8.com/color/48/000000/drum-set.png" },
    { sound: MazePolitics, label: 'MazePolitics', icon: "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/000000/external-stars-location-vitaliy-gorbachev-flat-vitaly-gorbachev.png"},
]


export default function App() {
    const classes = useStyles(),
    [onAndOff, setOnAndOff] = useState([]),
    [mode, setMode] = useState(''),
    [counter,setCounter] = useState(0)


    function trackPlay(status, arr) {
        if (mode == 'play' && !status) {
            onAndOff.forEach(item => item.pause())
            onAndOff.forEach(item => item.play())
            setCounter(counter + 1)
        } 
        else if (mode == 'join' && !status) {
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
        }
    }

    function handleOnClick(src, status) {
        if (status == 'on') {
            setOnAndOff([...onAndOff, new Howl({
                src,
                loop: true
            })])
            setMode('join')
        }
        else {
            let arr = onAndOff.filter(item => item._src != src)
            trackPlay('off', arr)
            setOnAndOff(arr)
        }
    }

    useEffect(() => trackPlay(), [mode])

    Howler.volume(0.2)

    return <ThemeProvider theme={theme}>
    <div className="container">
        <Typography
            className={classes.title}
            variant="h4"
        >LOOPER MACHINE</Typography>
        {audioTracks.map((track, index) =>
            <div className="loop">
                <RadioGroup className={classes.radio} color="primary">
                    <Radio key={index} value={'on'}  className={classes.on} onClick={() => handleOnClick(track.sound, 'on')} /><p className="p">ON</p>
                    <Radio key={track.label} color="primary" value={'off'} className={classes.r}  onClick={() => handleOnClick(track.sound, 'off')} /><p className="p"> OFF</p>
                </RadioGroup>
                <div>
                    <Typography
                        className={classes.sound}
                        spacing={10}
                        
                    >
                    {track.label}</Typography>
                    {/* <img className="img" src={track.icon} /> */}
                </div>
            </div>

        )}
        <ButtonGroup className={classes.button}>
            <IconButton
                className={classes.play}
                name="play"
                onClick={() => setMode('play')}
                
            >
                <PlayCircleFilledWhiteOutlinedIcon />
            </IconButton>
            <IconButton
                className={classes.play}
                name="stop"
                onClick={() => setMode('stop')}
                color="secondary"
            >
                <StopOutlinedIcon />
            </IconButton>
        </ButtonGroup>
    </div>
    </ThemeProvider>

}




