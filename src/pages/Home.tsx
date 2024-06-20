import { useEffect, useRef, useState } from "react";


type Props = {
    setFile: (file: File) => void;
    setAudioStream: (stream: Blob) => void;
}

export function Home({ setFile, setAudioStream }: Props) {

    const [isRecording, setIsRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [duration, setDuration] = useState<number>(0);

    const audioRecorder = useRef<MediaRecorder | null>(null);

    const mimeType = "audio/webm";

    async function startRecording() {
        try {
           const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: true, 
                video: false 
            });
            setIsRecording(true);
            //Create a new MediaRecorder instance using the stream
            const media = new MediaRecorder(stream, { mimeType });
            //Set the mediaRecorder instance to the audioRecorder ref
            audioRecorder.current = media;
            //Add an event listener to the dataavailable event
            audioRecorder.current.start();
            const localAudioChunk: Blob[] = [];
            audioRecorder.current.ondataavailable = (event) => {
                if (typeof event.data === "undefined") return;
                if (event.data.size === 0) return;
                localAudioChunk.push(event.data);
            };
            //Set the audioChunks state to the localAudioChunk
            setAudioChunks(localAudioChunk);
        } catch (error) {
            console.log(error);
        }
    }

    async function stopRecording() {
        try {
            if (audioRecorder.current?.state === "inactive") return;
            if (audioRecorder.current){
                audioRecorder.current.stop();
                audioRecorder.current.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: mimeType });
                    setAudioStream(audioBlob);
                    setAudioChunks([]);
                };
                setIsRecording(false);
                setDuration(0);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;
        setFile(file);
    }

    useEffect(() => {
        if (!isRecording) return;

        const interval = setInterval(() => {
            setDuration((prevDuration) => prevDuration + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRecording]);

    return (
        <main className="flex-1 flex flex-col justify-center text-center sm:gap-4 md:gap-5 p-4 pb-20">
            <h1 className="text-2xl font-semibold text-5xl sm:text-6xl md:text-7xl">
                AI<span className="text-blue-400">Translator</span>
            </h1>
            <h3 className="font-medium">
                Record 
                <span className="text-blue-400">&rarr;</span> 
                Transcribe
                <span className="text-blue-400">&rarr;</span> 
                Translate
            </h3>
            <button 
                className="specialButton px-4 py-2 rounded-xl flex item-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4"
                onClick={ isRecording ? stopRecording : startRecording}
            >
                <p className="font-semibold text-2xl text-blue-400">
                    { !isRecording ? "Record" : "Stop Recording" }
                </p>
                <div className="flex items-conter gap-2">
                    {duration > 0 && <p className="text-sm">{duration}s</p>}
                    <i className={`fas fa-solid fa-microphone text-2xl 
                        ${isRecording ? "text-red-500" : ""}
                    `}></i>
                </div>
            </button>
            <p className="mx-auto flex item-center gap-2 text-base font-semibold text-gray-500">Or 
                <label className="text-blue-400 cursor-pointer hover:text-blue-600 duration-200">
                    upload 
                    <input 
                        onChange={handleFileChange}
                        className="hidden" 
                        type="file" 
                        accept=".mp3,.wave"
                    />
                </label>
                a mp3 file
            </p>
            <p className="italic text-slate-400">Free Now and Forever</p>
        </main>
    )
}