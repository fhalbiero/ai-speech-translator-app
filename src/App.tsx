import { useEffect, useRef, useState } from "react";
import { Header } from "./components/Header"
import { Home } from "./pages/Home"
import { FileDisplay } from "./components/FileDisplay";
import { Information } from "./components/Information";
import { Transcribing } from "./components/Transcribing";
import { MessageTypes } from "./utils/presets";


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [audioStream, setAudioStream] = useState<Blob | null>(null);
  const [outputText, setOutputText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const [finished, setFinished] = useState<boolean>(false);

  const worker = useRef<Worker | null>(null);

  const isAudioAvailable = file || audioStream;

  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  } 

  async function readAudioFromFile(file: any) { 
    const sampleRate = 16000;
    // Create an AudioContext instance with the sample rate
    const audioContext = new AudioContext({ sampleRate });
    // Read the file as an ArrayBuffer
    const reader = await file.arrayBuffer();
    // Decode the audio data
    const decodedAudio = await audioContext.decodeAudioData(reader);
    // Get the audio data from the decoded
    const audio = decodedAudio.getChannelData(0);

    return audio;
  }

  async function handleFormSubmit() {
    if (!file && !audioStream) return;
    if (!worker.current) return;

    const audio = await readAudioFromFile(file || audioStream);
    const aiModel = "openai/whisper-tiny.en";

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name: aiModel
    });
  }

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL("./utils/worker.ts", import.meta.url), {
        type: "module"
      });
    }

    async function onMessageReceived(event: MessageEvent) {
      switch (event.data.type) {
        case "DOWNLOADING":
          setDownloading(true);
          console.log("Downloading...");
          break;
        case "LOADING":
          setLoading(false);
          console.log("Loading...");
          break;
        case "RESULT": 
          setOutputText(event.data.results);
          console.log("Result: ", event.data.results);
          break;
        case "INFERENCE_DONE":
          setFinished(true);
          console.log("Inference done!");
          break;
        }
      }

      worker.current.addEventListener("message", onMessageReceived);

      return worker.current.removeEventListener("message", onMessageReceived);
  }, []);

  return (
    <div className="flex flex-col mx-auto w-full max-w-[1000px]">
      <section className="min-h-screen flex flex-col ">
        <Header />
        {outputText ? 
          <Information />
          : loading ? 
            <Transcribing downloading={loading} />
            : isAudioAvailable ?
              <FileDisplay
                file={file}
                handleAudioReset={handleAudioReset}
                audioStream={audioStream}
              /> :
              <Home 
                setFile={setFile} 
                setAudioStream={setAudioStream} 
              />
        }
      </section>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>
          &copy; 2021
        </p>
      </footer>
    </div>
  )
}

export default App
