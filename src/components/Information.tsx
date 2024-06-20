import { useState } from "react";
import { Transcription } from "./Transcription";
import { Translation } from "./Translation";

export function Information() {
    const [tab, setTab] = useState<"transcription" | "translate">("transcription");

    return (
        <main className="flex-1 flex flex-col justify-center text-center sm:gap-4 md:gap-5 p-4 pb-20 max-w-full mx-auto">
            <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
                Your<span className="text-blue-400">Transcription</span>
            </h1>
            <div className="flex items-center gap-2 mx-auto bg-white shadow rounded-full overflow-hidden">
                <button 
                    className={`px-4 py-1 font-medium duration-200 ${tab === "transcription" ? "bg-blue-400 text-white" : "text-blue-400"}`}
                    onClick={() => setTab("transcription")}
                >
                    Transcription
                </button>
                <button 
                    className={`px-4 py-1 font-medium duration-200 ${tab === "translate" ? "bg-blue-400 text-white" : "text-blue-400"}`}
                    onClick={() => setTab("translate")}
                >
                    Translation
                </button>
            </div>
            {tab === "transcription" ?
                <Transcription /> :
                <Translation />
            }
        </main>
    )
}