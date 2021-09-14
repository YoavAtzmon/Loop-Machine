import Bass from '../audioTrack/bass.mp3'
import BassDrum from '../audioTrack/bassdrum.mp3'
import BreakBeats from '../audioTrack/breakbeats.mp3'
import funkBeats from '../audioTrack/funkbeats.mp3'
import guitar from '../audioTrack/guitar.mp3'
import MazePolitics from '../audioTrack/mazepolitics.mp3'
import RockGroove from '../audioTrack/rockgroove.mp3'
import Synth from '../audioTrack/synth.mp3'
import Tanggu from '../audioTrack/tanggu.mp3'
import { Howl, Howler } from 'howler';
import React, { useEffect, useState } from 'react'


const audioTracks = [
    { sound: Bass, label: 'Bass' },
    { sound: BassDrum, label: 'BassDrum' },
    { sound: BreakBeats, label: 'BreakBeats' },
    { sound: funkBeats, label: 'funkBeats' },
    { sound: guitar, label: 'guitar' },
    { sound: MazePolitics, label: 'MazePolitics' },
    { sound: RockGroove, label: 'RockGroove' },
    { sound: Synth, label: 'Synth' },
    { sound: Tanggu, label: 'Tanggu' },
]


export default function App() {

    const [onAndOff, setOnAndOff] = useState([])
    const [counter, setCounter] = useState(0)
    // const[mode, setMode] = useState('')
    console.log(`map:`, onAndOff.map(item => item));

    const trackPlay = (mode) => {
        if (mode == 'play') {
            onAndOff.forEach(item =>item.stop())
            onAndOff.forEach(item => item.play())
        }
        else{
            onAndOff.forEach(item =>
                item.stop())
                
        }

    }

    function Play() {
        setCounter(counter + 1)
        trackPlay('play')
    }

    function Stop() {
        trackPlay('stop')
    }



    function handleOnClick(src,status){
        console.log(status);
        status == 'on' ? 
        setOnAndOff([...onAndOff,  new Howl({
            src,
            loop: true,
            autoplay:counter != 0 ? true : false,
        })])
        :
        setOnAndOff(onAndOff.filter(item => item._src != src))
    }

    Howler.volume(0.5)

    return <div>
        {audioTracks.map((track, index) =>
            <div>
                <p>{track.label}</p>
                <input  key ={index} type="radio" name={`radio${index}`} onClick={()=>handleOnClick(track.sound,'on')} />ON
                <input  type="radio" name={`radio${index}`} onClick={() =>handleOnClick(track.sound,'off') } />OFF
            </div>
        )}
        <button name="play" onClick={Play}>
            <p>play</p>
        </button>
        <button name="stop" onClick={Stop} >
            <p>stop</p>
        </button>
    </div>

}




