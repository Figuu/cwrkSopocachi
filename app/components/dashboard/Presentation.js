const Presentation = () => {
  return (
    <div className="relative h-screen ">
      <div className="absolute inset-0 flex items-center justify-end">
        <img
          src="/images/dashboard/background.png"
          alt="Background Image"
          className="object-cover h-3/4 w-3/4 rounded-l-3xl"
        />
      </div>

      <div className="relative z-10 flex items-center justify-start h-full px-4">
        <div className="w-1/4 space-y-6 ml-32 mr-auto">
          <h1 className="text-4xl font-bold text-gray-900">
            Espacios de trabajo en alquier
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
            <div className="w-2/3">
              <p className="text-xs font-light mb-4">
                Encuentra un espacio de trabajo en
              </p>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="sopocachi">Sopocachi</option>
                <option value="miraflores">Miraflores</option>
                <option value="sanpedro">San Pedro</option>
                <option value="calacoto">Calacoto</option>
              </select>
            </div>
            <div className="w-2/3 flex justify-end">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg">
                Buscar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
