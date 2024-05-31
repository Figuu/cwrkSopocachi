const WorkspaceSection = () => {
  const workspaceData = [
    {
      id: 1,
      name: "Espacio A",
      cost: "$100",
      imageUrl: "/images/dashboard/workspace1.png",
    },
    {
      id: 2,
      name: "Espacio B",
      cost: "$120",
      imageUrl: "/images/dashboard/workspace2.png",
    },
    {
      id: 3,
      name: "Espacio C",
      cost: "$90",
      imageUrl: "/images/dashboard/workspace3.png",
    },
    {
      id: 4,
      name: "Espacio D",
      cost: "$90",
      imageUrl: "/images/dashboard/workspace4.png",
    },
    {
      id: 5,
      name: "Espacio CE",
      cost: "$90",
      imageUrl: "/images/dashboard/workspace5.png",
    }
  ];

  return (
    <div className="px-4 py-8">
      <div className="flex justify-around mb-6">
        <div className="w-1/3">
          <h2 className="text-3xl font-bold text-gray-900">
            Seleccionar espacio de trabajo
          </h2>
          <p className="text-3xl font-bold text-gray-900">Como desees</p>
        </div>
        <div className="w-1/3">
          <p className="text-lg text-gray-700">
            Estamos seguros de que encontrarás un espacio de trabajo que se
            adapte a tus deseos y gustos. Nos aseguramos de que usted estará
            cómodo.
          </p>
        </div>
      </div>
      <div className="flex overflow-x-auto space-x-16">
        {workspaceData.map((workspace) => (
          <WorkspaceCard
            key={workspace.id}
            name={workspace.name}
            cost={workspace.cost}
            imageUrl={workspace.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkspaceSection;

const WorkspaceCard = ({ name, cost, imageUrl }) => {
  return (
    <div className="flex-none w-1/5">
      <div
        className="relative overflow-hidden bg-gray-200 rounded-xl"
        style={{ aspectRatio: "4/7" }}
      >
        {/* Imagen de fondo */}
        <img
          src={imageUrl}
          alt="Workspace"
          className="object-cover absolute inset-0 w-full h-full rounded-t-lg"
        />
        {/* Contenedor de texto */}
        <div className="absolute bottom-0 left-0 w-1/3 bg-white bg-opacity-75 p-4 rounded-tr-xl">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-700">Costo: {cost}</p>
        </div>
      </div>
    </div>
  );
};
