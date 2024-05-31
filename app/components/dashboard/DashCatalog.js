import Image from "next/image";

const DashCatalog = () => {
  // Datos de ejemplo para los lugares
  const workspacesData = [
    {
      id: 1,
      name: "Lugar 1",
      description: "Breve descripción del lugar 1",
      price: "$10",
      imageUrl: "/images/dashboard/example1.png",
    },
    {
      id: 2,
      name: "Lugar 2",
      description: "Breve descripción del lugar 2",
      price: "$12",
      imageUrl: "/images/dashboard/example2.png",
    },
    {
      id: 3,
      name: "Lugar 3",
      description: "Breve descripción del lugar 3",
      price: "$15",
      imageUrl: "/images/dashboard/example3.png",
    },
    {
      id: 4,
      name: "Lugar 4",
      description: "Breve descripción del lugar 4",
      price: "$20",
      imageUrl: "/images/dashboard/example4.png",
    },
    {
      id: 5,
      name: "Lugar 5",
      description: "Breve descripción del lugar 5",
      price: "$18",
      imageUrl: "/images/dashboard/example5.png",
    },
    {
      id: 6,
      name: "Lugar 6",
      description: "Breve descripción del lugar 6",
      price: "$25",
      imageUrl: "/images/dashboard/example6.png",
    },
  ];

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {" "}
      {/* Limita el ancho máximo */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Espacios de trabajo cerca de ti
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
        {/* Utilizamos .map para generar los lugares dinámicamente */}
        {workspacesData.map((workspace) => (
          <WorkspaceCard
            key={workspace.id}
            name={workspace.name}
            description={workspace.description}
            price={workspace.price}
            imageUrl={workspace.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default DashCatalog;

// WorkspaceCard.js

const WorkspaceCard = ({ name, description, price, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="aspect-w-4 aspect-h-3 w-full">
        <div className="relative w-full h-full">
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover rounded-lg mb-2"
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-700 mb-2">{description}</p>
      <p className="text-sm text-gray-600">{price} por hora</p>
    </div>
  );
};
