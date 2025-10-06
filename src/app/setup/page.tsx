"use client";

import { useState } from "react";
import Link from "next/link";

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationName: "",
    domain: "",
    industry: "",
    employeeCount: "",
    complianceRequirements: [] as string[],
    securityModules: {
      endpointProtection: true,
      emailSecurity: true,
      webSecurity: true,
      backupRecovery: true,
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const steps = [
    {
      id: 1,
      title: "Organization Info",
      description: "Basic company information",
    },
    {
      id: 2,
      title: "Security Configuration",
      description: "Choose security modules",
    },
    {
      id: 3,
      title: "Compliance Setup",
      description: "Select compliance frameworks",
    },
    { id: 4, title: "Deployment", description: "Automated setup and testing" },
  ];

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required";
    }

    if (
      formData.domain &&
      !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/.test(
        formData.domain
      )
    ) {
      newErrors.domain = "Please enter a valid domain (e.g., yourcompany.com)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Check if step 1 is valid for button state
  const isStep1Valid = () => {
    if (currentStep !== 1) return true;

    const hasOrganizationName = formData.organizationName.trim().length > 0;
    const hasValidDomain =
      !formData.domain ||
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/.test(
        formData.domain
      );

    return hasOrganizationName && hasValidDomain;
  };

  const handleComplianceToggle = (framework: string) => {
    setFormData((prev) => ({
      ...prev,
      complianceRequirements: prev.complianceRequirements.includes(framework)
        ? prev.complianceRequirements.filter((f) => f !== framework)
        : [...prev.complianceRequirements, framework],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MSSP Platform Setup
          </h1>
          <p className="text-gray-600">
            Configure your organization's security infrastructure
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {step.id}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="relative">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-start relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 flex-shrink-0 ${
                        currentStep >= step.id
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-gray-300 text-gray-500"
                      }`}
                    >
                      <span className="text-sm font-medium">{step.id}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-0.5 h-8 mt-2 ${
                          currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                  <div className="ml-3 flex-1 pb-6">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.id
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          {currentStep === 1 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <span className="text-2xl">🏢</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Organization Information
                </h2>
                <p className="text-gray-600">
                  Tell us about your organization to customize your security
                  setup
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <span className="text-red-500">*</span>
                      Organization Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.organizationName}
                    onChange={(e) =>
                      handleInputChange("organizationName", e.target.value)
                    }
                    className={`w-full text-gray-900 placeholder:text-gray-400 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.organizationName
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your organization name"
                  />
                  {errors.organizationName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.organizationName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <span className="text-gray-400">🌐</span>
                      Domain (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={(e) =>
                      handleInputChange("domain", e.target.value)
                    }
                    className={`w-full text-gray-900 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-gray-400 ${
                      errors.domain
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="yourcompany.com"
                  />
                  {errors.domain && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.domain}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Used for email security and domain-based policies
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <span className="text-gray-400">🏭</span>
                      Industry
                    </span>
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) =>
                      handleInputChange("industry", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors text-gray-900"
                    aria-label="Select your industry"
                  >
                    <option value="" className="text-gray-400">
                      Select your industry
                    </option>
                    <option value="technology">💻 Technology</option>
                    <option value="finance">💰 Finance & Banking</option>
                    <option value="healthcare">🏥 Healthcare</option>
                    <option value="retail">🛒 Retail & E-commerce</option>
                    <option value="manufacturing">🏭 Manufacturing</option>
                    <option value="education">🎓 Education</option>
                    <option value="government">🏛️ Government</option>
                    <option value="nonprofit">🤝 Non-profit</option>
                    <option value="other">📋 Other</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Helps us recommend industry-specific security policies
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <span className="text-gray-400">👥</span>
                      Number of Employees
                    </span>
                  </label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) =>
                      handleInputChange("employeeCount", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors text-gray-900"
                    aria-label="Select employee count"
                  >
                    <option value="" className="text-gray-400">
                      Select employee count
                    </option>
                    <option value="1-10">👤 1-10 employees (Startup)</option>
                    <option value="11-50">
                      👥 11-50 employees (Small Business)
                    </option>
                    <option value="51-200">
                      🏢 51-200 employees (Medium Business)
                    </option>
                    <option value="201-500">
                      🏬 201-500 employees (Large Business)
                    </option>
                    <option value="500+">🏭 500+ employees (Enterprise)</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Determines licensing and deployment scale
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Security Configuration
              </h2>
              <p className="text-gray-600 mb-6">
                Select which security modules you want to enable for your
                organization.
              </p>

              <div className="space-y-6">
                {[
                  {
                    key: "endpointProtection",
                    title: "Endpoint Protection",
                    description:
                      "Antivirus, behavioral monitoring, ransomware detection",
                  },
                  {
                    key: "emailSecurity",
                    title: "Email Security",
                    description:
                      "Spam filtering, phishing protection, malware scanning",
                  },
                  {
                    key: "webSecurity",
                    title: "Web Security",
                    description:
                      "DNS filtering, content filtering, safe browsing",
                  },
                  {
                    key: "backupRecovery",
                    title: "Backup & Recovery",
                    description:
                      "Automated backups, ransomware rollback, cloud storage",
                  },
                ].map((module) => (
                  <div
                    key={module.key}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {module.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        aria-label={module.title}
                        type="checkbox"
                        checked={
                          formData.securityModules[
                            module.key as keyof typeof formData.securityModules
                          ]
                        }
                        onChange={(e) =>
                          handleInputChange("securityModules", {
                            ...formData.securityModules,
                            [module.key]: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Compliance Frameworks
              </h2>
              <p className="text-gray-600 mb-6">
                Select the compliance frameworks that apply to your
                organization.
              </p>

              <div className="space-y-4">
                {[
                  {
                    id: "NDPR",
                    title: "Nigeria Data Protection Regulation (NDPR)",
                    description:
                      "Required for Nigerian businesses handling personal data",
                  },
                  {
                    id: "POPIA",
                    title: "Protection of Personal Information Act (POPIA)",
                    description: "Required for South African businesses",
                  },
                  {
                    id: "GDPR",
                    title: "General Data Protection Regulation (GDPR)",
                    description: "Required for EU data processing",
                  },
                ].map((framework) => (
                  <div
                    key={framework.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {framework.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {framework.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        aria-label={framework.title}
                        type="checkbox"
                        checked={formData.complianceRequirements.includes(
                          framework.id
                        )}
                        onChange={() => handleComplianceToggle(framework.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Deployment & Testing
              </h2>
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Ready to Deploy!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your MSSP platform will be automatically configured and
                  deployed. This process typically takes 15-30 minutes.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    What happens next:
                  </h4>
                  <ul className="text-left text-blue-800 space-y-1">
                    <li>• Security modules will be installed and configured</li>
                    <li>• Compliance frameworks will be set up</li>
                    <li>• Initial security scan will be performed</li>
                    <li>
                      • Dashboard will be configured for your organization
                    </li>
                    <li>• You'll receive setup completion notification</li>
                  </ul>
                </div>

                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Deploy Platform
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  !isStep1Valid()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={!isStep1Valid()}
              >
                Next
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Complete Setup
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
