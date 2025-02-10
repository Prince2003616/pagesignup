const Breadcrumb: React.FC = () => {
    return (
      <div className="py-4">
        <div className="container mx-auto px-6">
          <nav className="flex items-center space-x-3 text-base text-blue-400">
            <a href="/" className="text-blue-500 hover:underline">Home</a>
            <span className="text-gray-600">&gt;</span>
            <a href="/instructornetwork" className="hover:text-blue-500 hover:underline transition-colors"> Instructor Network</a>
          </nav>
        </div>
      </div>
    );
  };
  
  Breadcrumb.displayName = 'Breadcrumb';
  export default Breadcrumb;