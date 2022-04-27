import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { useSpeechSynthesis } from "react-speech-kit";



const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);


  //const { speak } = useSpeechSynthesis();


  const handleSubmit = () => {
    setIsLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        // console.log(m);
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        // console.log(result.data);
        setText(result.data.text);
        setIsLoading(false);
      });
  };


  const talk = () => {
    if (text) {
      speechSynthesis.speak(
        new SpeechSynthesisUtterance(text.replace(/\s/g, " "))
      )
    }
  }


  function stopSpeaking() {
    speechSynthesis.cancel()
  }

  //console.log(text)


  const downloadText = async (text) => {

    const data = {
      "Content": [
        {

          "description": `${text}`,
        }]
    }
    console.log(data)
    const result = await easyinvoice.createInvoice(data)
    easyinvoice.download(`document.pdf`, result.pdf)
  };

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div className="row h-100">
        <div className="col-md-3 mx-auto h-100 d-flex flex-column justify-content-center">
          {!isLoading && (
            <h1 className="text-center py-2 mc-5">Image To Text</h1>
          )}

          {isLoading && (
            <>
              <progress className="form-control" value={progress} max="100">
                {progress}%{' '}
              </progress>{' '}
              <p className="text-center py-0 my-0">Converting:- {progress} %</p>
            </>
          )}
          {!isLoading && !text && (
            <>
              <input
                type="file"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                className="form-control mt-5 mb-2"
              />
              <input
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-5"
                value="Convert"
              />
            </>
          )}
          {!isLoading && text && (
            <>
              <button onMouseOver={talk} onMouseLeave={stopSpeaking}>
                🎤
              </button>
              {text && <p className="text-center py-0 my-0">Over the mic for listening</p>}
              <button className="btn btn-link py-0 my-2"
                onClick={() => setText("")}
              >Go back</button>
              <textarea
                className="form-control w-100 mt-3"
                rows="15"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>

              <button className='btn btn-primary btn-sm'
                //onClick={() => speak({ text: { text } })}
                onClick={talk}
              >
                Speak
           </button>
              <button className='btn btn-info btn-sm'
                onClick={stopSpeaking} >
                Stop
             </button>


            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;








// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import React, { useState, useEfect, useRef } from 'react';
// import Webcam from 'react-Webcam'
// import { createWorker } from 'tesseract.js';
// import stiling from '../styles/Styles.module.css'

// export default function Home() {


//   const [tekst, setTekst] = useState('')

//   const textRef = useRef(null)
//   const webRef = useRef(null)

//   console.log(webRef)
//   console.log(textRef)



//   async function setup() {

//     //const stream = await navigator.mediaDevices.getUserMedia({ video: true })
//     const video = webRef.current.stream



//     console.log(video)

//     video.addEventListener("playing", async () => {
//       const worker = createWorker();

//       console.log(worker)
//       await worker.load()
//       await worker.loadLanguage("eng")
//       await worker.initialize("eng")

//       const canvas = webRef.current.canvas
//       console.log(canvas)
//       canvas.width = video.width
//       canvas.height = video.height

//       document.addEventListener("keypress", async e => {
//         if (e.code !== "Space") return
//         canvas.getContext("2d").drawImage(video, 0, 0, video.width, video.height)
//         const {
//           data: { text },
//         } = await worker.recognize(canvas)
//         console.log(speechSynthesis)
//         speechSynthesis.speak(
//           new SpeechSynthesisUtterance(text.replace(/\s/g, " "))
//         )

//         textRef.current.value
//       })
//     })
//   }





//   return (

//     <>
//       {/* <video ref={webRef} width="720" height="560" autoplay muted> </video>
//       <button onClick={setup}>Klik</button>
//       <pre data-text >DDDD </pre> */}
//       <Webcam ref={webRef} width="720" height="560" autoPlay muted></Webcam>
//       <button onClick={setup}>Klik</button>
//       <h1 ref={textRef} ></h1>
//     </>
//   )
// }
