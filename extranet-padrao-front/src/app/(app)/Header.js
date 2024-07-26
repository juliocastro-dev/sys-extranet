const Header = ({ title, children }) => {
    return (
        <header className="bg-white shadow">
            <div className="flex gap-5 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {title}
                </h2>
                <div>
                    {children}
                </div>
            </div>
        </header>
    )
}

export default Header