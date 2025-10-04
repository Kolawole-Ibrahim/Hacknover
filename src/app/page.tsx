import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-300 to-red-300 -mt-35 pt-20">
      <div className="container  px-4 ">
        {/* Header */}
        <div className="h-screen flex items-center">
          <div className="w-1/2">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Safeguard your infrastructure with cybersecurity solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              We offer technology- based services tailored to solve
              cybersecurity challenges, ensuring organizations are continuously
              protected and secure through simplified approaches.
            </p>
          </div>

          <div className="w-1/2 flex flex-col gap-4 items-start">
            <Link
              href="/setup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started (2-Hour Setup)
            </Link>
            <Link
              href="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-blue-600 text-3xl mb-4 text-align-center">
              🛡️
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Enterprise Security
            </h3>
            <p className="text-gray-600">
              Multi-layered protection with endpoint, email, web, and backup
              security.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-green-600 text-3xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Under $50/Month
            </h3>
            <p className="text-gray-600">
              Affordable enterprise-grade security designed for SME budgets.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-purple-600 text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              2-Hour Setup
            </h3>
            <p className="text-gray-600">
              No IT expertise required. Automated deployment and configuration.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-orange-600 text-3xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              African Compliance
            </h3>
            <p className="text-gray-600">
              Built-in NDPR, POPIA, and GDPR compliance frameworks.
            </p>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-gray-900">
            The Problem We Solve
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-4">
                Current Challenges
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  • Only 30% of African SMEs have meaningful cybersecurity
                </li>
                <li>• Traditional solutions cost $500-2000 monthly</li>
                <li>• Require dedicated IT staff</li>
                <li>• 60% of SMEs close within 6 months of major attack</li>
                <li>• Average ransomware attack costs $200,000</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                Our Solution
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Comprehensive protection under $50/month</li>
                <li>• No IT expertise required</li>
                <li>• 24/7 automated monitoring</li>
                <li>• Scalable from 5 to 500 employees</li>
                <li>• African compliance ready</li>
                <li>• Offline capability for unreliable internet</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Modules */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Core Security Modules
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="font-semibold mb-2">Endpoint Protection</h3>
              <p className="text-sm text-gray-600">
                Antivirus, behavioral monitoring, ransomware detection
              </p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-semibold mb-2">Email Security</h3>
              <p className="text-sm text-gray-600">
                Spam filtering, phishing protection, malware scanning
              </p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="font-semibold mb-2">Web Security</h3>
              <p className="text-sm text-gray-600">
                DNS filtering, content filtering, safe browsing
              </p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-4xl mb-3">💾</div>
              <h3 className="font-semibold mb-2">Backup & Recovery</h3>
              <p className="text-sm text-gray-600">
                Automated backups, ransomware rollback, cloud storage
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
