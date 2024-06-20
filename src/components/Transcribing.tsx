type Props = {
    downloading: boolean;
}

export function Transcribing({ downloading }: Props) {

    return (
        <div className="flex-1 flex items-center flex-col justify-center gap-10 md:gap-14 pb-24 text-center p-4">
            <div className="flex flex-col gap-2 sm:gap-4">
                <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
                    <span className="text-blue-400">Transcribing</span>
                </h1>
                <p>
                    {!downloading ? "Transcribing..." : "Transcription Ready!"}
                </p>
            </div>
            <div className="flex flex-col gap-1 sm:gap-4 max-w-[400px] mx-auto w-full">
                {[1,2,3].map((index) => {
                    return (
                        <div key={index} className="rounded-full h-4 bg-slate-200" >
                            <div 
                                key={index} 
                                className={`rounded-full h-4 bg-slate-300 loading ${`loading${index}`}`}
                            >
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
    
}