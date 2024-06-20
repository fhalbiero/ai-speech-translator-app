
export function Header() {
  return (
    <header className="flex items-center justify-between gap-4 p-4">
        <a href='/'>
            <h1 className="text-2xl font-semibold">
                AI<span className="text-blue-400">Translator</span>
            </h1>
        </a>
        <a href='/' className="specialButton px-4 py-2 flex items-center gap-2 rounded-md">
            <i className="fas fa-solid fa-plus"></i>
            <p>New</p>
        </a>
    </header>
  )
}