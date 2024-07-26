import Header from "../Header"
import MenuLateralConfiguracoes from "./components/MenuLateralConfiguracoes";

const SettingLayout = ({ children }) => {
    return (
        <>
            <Header title="Configurações" />
            <div className="py-8">
                <div className="flex gap-5 max-w-7xl mx-auto sm:px-6 lg:px-8">
                   <MenuLateralConfiguracoes />
                    <div className="bg-white w-[85%] overflow-hidden shadow-sm sm:rounded-lg mt-2 p-6 border-gray-200 border">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingLayout