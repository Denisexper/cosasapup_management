import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

function Login() {

  const backend = import.meta.env.VITE_API_URL

  const [loginData, setLoginData] = useState({
    correo: "",
    contraseña: "",
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${backend}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);

      toast.success("Inicio de sesión exitoso");

      setTimeout(() => navigate("/dashboard"), 1000);
      
    } catch (error) {
      toast.error(error.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 p-4">
      <Toaster position="top-center" richColors />
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Logo Section */}
          <div className="bg-blue-600 py-6 px-4 flex justify-center">
            <div className="flex items-center space-x-2">
              <img 
                src="/src/logos/logo.png"
                alt="Logo de la empresa"
                className="h-12 w-12 object-contain"
              />
              <h1 className="text-2xl font-bold text-white">COSASAPUP</h1>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">Bienvenido</h2>
            <p className="text-gray-600 text-sm text-center mb-6">Ingresa tus credenciales para continuar</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={loginData.correo}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="contraseña"
                  name="contraseña"
                  value={loginData.contraseña}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2">Recordarme</span>
                </label>

                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Procesando...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </button>
            </form>

            {/* Register Button */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{" "}
                <button
                  onClick={handleGoToRegister}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-4 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} PeguesApp. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
