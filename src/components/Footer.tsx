import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center shadow-lg">
                  <img
                    src="/images/hacknover_logo.jpeg"
                    alt="HackNover logo"
                    className="w-16 h-16 rounded-lg"
                  />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  HackNover
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                Empowering organizations with cutting-edge cybersecurity
                solutions. Protect your digital assets with our comprehensive
                security platform.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  {
                    icon: "/images/x.png",
                    name: "Twitter",
                  },
                  {
                    icon: "/images/linkedin.png",
                    name: "LinkedIn",
                  },
                  {
                    icon: "/images/insta.png",
                    name: "Instagram",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="group w-12 h-12 bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                    title={social.name}
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={24}
                      height={24}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Company */}
                <div>
                  <h3 className="text-white font-semibold text-lg mb-6">
                    Company
                  </h3>
                  <ul className="space-y-4">
                    {["About", "Press", "Careers"].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm group flex items-center"
                        >
                          <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-white font-semibold text-lg mb-6">
                    Resources
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Blogs",
                      "Events and Webinars",
                      "Case study",
                      "White Paper",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm group flex items-center"
                        >
                          <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div>
                  <h3 className="text-white font-semibold text-lg mb-6">
                    Solutions
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Cyber Operation Center",
                      "Offensive Security",
                      "Security Engineering",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm group flex items-center"
                        >
                          <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-white font-semibold text-lg mb-6">
                    Services
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Endpoint Protection",
                      "Email Security",
                      "Web Security",
                      "Backup Solutions",
                      "Compliance",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-sm group flex items-center"
                        >
                          <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} HackNover. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                    (item) => (
                      <a
                        key={item}
                        href="#"
                        className="text-gray-500 hover:text-white text-sm transition-colors duration-200"
                      >
                        {item}
                      </a>
                    )
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-gray-500 text-sm">
                    All systems operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
