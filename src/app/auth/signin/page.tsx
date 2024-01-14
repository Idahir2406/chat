import { AuthButton } from "components/littleComponents/AuthButton";


export default function Page() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="bg-blue-400 p-4 rounded-md flex flex-col gap-4 items-center">
        <h1 className="text-xl text-white">Iniciar Sesión</h1>
        <AuthButton />
      </div>
    </div>
  );
}
