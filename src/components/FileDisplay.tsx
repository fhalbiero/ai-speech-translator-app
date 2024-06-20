
type Props = {
    file: File | null;
    audioStream: Blob | null;
    handleAudioReset: () => void;
};

export function FileDisplay({ file, audioStream, handleAudioReset }: Props) {
    return (
        <main className="flex-1 flex flex-col justify-center text-center sm:gap-4 md:gap-5 p-4 pb-20 w-fit max-w-full mx-auto">
            <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
                Your<span className="text-blue-400">File</span>
            </h1>
            <div className="flex flex-col text-left my-8">
                <h3 className="font-semibold">
                    Name:
                </h3>
                <p>{file?.name}</p>
            </div>
            <div className="flex items-center justify-between gap-4 min-w-72">
                <button 
                    className="text-slate-400 font-semibold hover:text-blue-400 duration-200"
                    onClick={handleAudioReset}
                >
                    Reset
                </button>
                <button 
                    className="specialButton px-4 py-2 rounded-lg text-blue-400 flex items-center gap-2"
                    onClick={() => null}
                >
                    <i className="fas fa-solid fa-pen-nib"></i>
                    Transcribe
                </button>
            </div>
        </main>
    )
}