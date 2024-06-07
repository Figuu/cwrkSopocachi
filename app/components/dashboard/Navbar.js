import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center space-x-8">
              <Link href="/">
                <div className="text-xl font-bold">CWRK</div>
              </Link>
              <Link href="/find-location">
                <div className="text-gray-700 hover:text-gray-900">Encontrar ubicación</div>
              </Link>
              <Link href="/space-type">
                <div className="text-gray-700 hover:text-gray-900">Tipo de espacio</div>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/login">
              <div className="text-gray-700 hover:text-gray-900">Login</div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
