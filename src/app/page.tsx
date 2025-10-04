"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Button from "../components/Button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { isMobile } from "react-device-detect";

export default function Home() {
  const featureCardsRef = useRef<HTMLDivElement[]>([]);
  const securityCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Get Started button animation
    const getStartedButton = document.getElementById("get-started-button");
    if (getStartedButton) {
      getStartedButton.classList.add("animate-bounce");
      const timeout = setTimeout(() => {
        getStartedButton.classList.remove("animate-bounce");
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    // Main gradient line animation
    // gsap.to(".gradient-line", {
    //   scaleY: 1,
    //   transformOrigin: "top 10%",
    //   ease: "power2.out",
    //   scrollTrigger: {
    //     trigger: "main",
    //     start: "top center",
    //     end: "bottom center",
    //     scrub: 1,
    //     onUpdate: (self) => {
    //       gsap.to(".gradient-line", {
    //         scaleY: 1- self.progress,
    //         duration: 0.5,
    //       });
    //     },
    //   },
    // });

    gsap.to(".problem-timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".problem-timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".problem-timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });
  }, []);

  useEffect(() => {
    // Feature cards animation
    if (featureCardsRef.current.length > 0) {
      gsap.fromTo(
        featureCardsRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.85,
          rotationY: 20,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".feature-cards",
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Security cards animation
    if (securityCardsRef.current.length > 0) {
      gsap.fromTo(
        securityCardsRef.current,
        {
          opacity: 0,
          scale: 0.7,
          rotationY: 25,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          y: 0,
          duration: 1.0,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".security-cards",
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-300 to-red-300 -mt-35 pt-20 relative">
      {/* Animated Gradient Line */}
      <div className="fixed left-8 top-0 w-1 h-screen z-40 pointer-events-none">
        <div className="gradient-line w-full h-full scale-y-0"></div>
      </div>

      <div className="container px-4 py-30 relative z-10">
        {/* Header */}
        <div className="h-screen lg:-mt-20  md:px-8 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Enterprise-Grade Cybersecurity Made Simple for African SMEs
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              Get comprehensive endpoint protection, email security, web
              filtering, and backup solutions for $45/month. No IT expertise
              required - automated setup in just 2 hours.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-4 items-center">
            <div id="get-started-button">
              <Button
                href="/setup"
                title="Get Started"
                variant="primary"
                size="lg"
                className="w-auto"
              >
                Get Started
              </Button>
            </div>

            <Button
              href="/login"
              title="Login"
              variant="outline"
              size="lg"
              className="w-auto"
            >
              Login
            </Button>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-13 text-center">
            Why Choose Our Platform?
          </h2>
          <div className="feature-cards flex flex-col items-center space-y-15">
            <div
              ref={(el) => {
                if (el) {
                  featureCardsRef.current[0] = el;
                }
              }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform lg:!-translate-x-1/4 hover:-translate-y-2 group cursor-pointer"
            >
              <div className="text-blue-600 inline-block w-fit  rounded-xl lg:translate-x-112 text-3xl mb-4 text-center group-hover:scale-110 group-hover:shadow-xl shadow-blue-600/25 transition-transform duration-300">
                <Image
                  src="/images/cyber1.jpg"
                  alt="Enterprise Security"
                  width={isMobile ? 200 : 400}
                  height={200}
                  className="rounded-xl"
                  priority={true}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <h3 className="text-xl xl:text-3xl inline-block w-fit lg:-translate-y-40 lg:-translate-x-120 lg:text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-700 group-hover:from-red-600 group-hover:to-blue-700 transition-all duration-300">
                Enterprise Security
              </h3>
              <p className="text-gray-600 lg:text-xl group-hover:text-gray-700 transition-colors duration-300">
                Multi-layered protection with endpoint, email, web, and backup
                security.
              </p>
            </div>

            <div
              ref={(el) => {
                if (el) {
                  featureCardsRef.current[0] = el;
                }
              }}
              className="bg-blue-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform lg:!translate-x-1/4 hover:-translate-y-2 group cursor-pointer"
            >
              <div className="text-blue-600 inline-block w-fit  rounded-xl lg:-translate-x-52 text-3xl mb-4 text-center group-hover:scale-110 group-hover:shadow-xl shadow-blue-600/25 transition-all duration-500">
                <Image
                  src="/images/money.jpg"
                  alt="Enterprise Security"
                  width={isMobile ? 200 : 400}
                  height={200}
                  className="rounded-xl"
                  priority={true}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <h3 className="text-xl xl:text-3xl inline-block w-fit lg:-translate-y-40 lg:translate-x-25 lg:text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-700 group-hover:from-red-600 group-hover:to-blue-700 transition-all duration-500">
                Under $50/Month
              </h3>
              <p className="text-gray-600 lg:text-xl group-hover:text-gray-700 transition-colors duration-300">
                Affordable enterprise-grade security designed for SME budgets.
              </p>
            </div>

            <div
              ref={(el) => {
                if (el) {
                  featureCardsRef.current[2] = el;
                }
              }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
            >
              <div className="text-purple-600 text-3xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/images/time.jpg"
                  alt="Enterprise Security"
                  width={isMobile ? 200 : 400}
                  height={200}
                  className="rounded-xl"
                  priority={true}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <h3 className="text-xl xl:text-3xl inline-block w-fit  lg:text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-red-700 group-hover:from-red-600 group-hover:to-purple-700 transition-all duration-300">
                2-Hour Setup
              </h3>
              <p className="text-gray-600 lg:text-xl group-hover:text-gray-700 transition-colors duration-300">
                No IT expertise required. Automated deployment and
                configuration.
              </p>
            </div>

            <div
              ref={(el) => {
                if (el) {
                  featureCardsRef.current[2] = el;
                }
              }}
              className="bg-gradient-to-br from-red-300 to-green-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
            >
              <div className="text-purple-600 text-3xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/images/offline.jpg"
                  alt="Enterprise Security"
                  width={isMobile ? 200 : 400}
                  height={200}
                  className="rounded-xl"
                  priority={true}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <h3 className="text-xl xl:text-3xl inline-block w-fit  lg:text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-red-700 group-hover:from-red-600 group-hover:to-purple-700 transition-all duration-300">
                Offline Capability
              </h3>
              <p className="text-white-600 lg:text-xl group-hover:text-gray-700 transition-colors duration-300">
                Works offline for unreliable internet.
              </p>
            </div>

            <div
              ref={(el) => {
                if (el) {
                  featureCardsRef.current[2] = el;
                }
              }}
              className="bg-white bg-gradient-to-br from-gray-300 to-black flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
            >
              <div className="text-purple-600 text-3xl mb-4 text-center group-hover:scale-80 transition-transform duration-500">
                <Image
                  src="/images/earth.jpg"
                  alt="Enterprise Security"
                  width={isMobile ? 200 : 300}
                  height={isMobile ? 200 : 100}
                  className="rounded-xl"
                  priority={true}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <h3 className="text-xl xl:text-3xl inline-block w-fit  lg:text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-red-700 group-hover:from-red-600 group-hover:to-purple-700 transition-all duration-300">
                African Compliance
              </h3>
              <p className="text-white-600 lg:text-xl transition-colors duration-300">
                Built-in NDPR, POPIA, and GDPR compliance frameworks.
              </p>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="problem-statement-section relative w-screen -mx-4 mt-20 overflow-hidden">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="absolute top-20 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-100 rounded-full opacity-20 blur-xl"></div>

            <div className="relative container mx-auto px-8 py-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                  The Problem We Solve
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>

              <div className="relative grid lg:grid-cols-2 gap-12">
                {/* Challenges Card */}
                <div className="group bg-red-300 rounded-2xl">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-red-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-xl">⚠️</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Current Challenges
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          Only 30% of African SMEs have meaningful cybersecurity
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          Traditional solutions cost $500-2000 monthly
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          Require dedicated IT staff
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          60% of SMEs close within 6 months of major attack
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          Average ransomware attack costs $200,000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gradient Line - Between Problem and Solution Cards */}

                <div className="problem-timeline-wrapper  ">
                  <div className="problem-timeline z-60" />
                  <div className="gradient-line w-1 h-full" />
                </div>

                {/* Solution Card */}
                <div className="group bg-green-300 rounded-2xl">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-xl">✅</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Our Solution
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          Comprehensive protection under $50/month
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          No IT expertise required
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          24/7 automated monitoring
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          Scalable from 5 to 500 employees
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          African compliance ready
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          Offline capability for unreliable internet
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Modules */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Core Security Modules
            </h2>
            <div className="security-cards grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                ref={(el) => {
                  if (el) {
                    securityCardsRef.current[0] = el;
                  }
                }}
                className="text-center p-4 border rounded-lg hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  💻
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  Endpoint Protection
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Antivirus, behavioral monitoring, ransomware detection
                </p>
              </div>

              <div
                ref={(el) => {
                  if (el) {
                    securityCardsRef.current[1] = el;
                  }
                }}
                className="text-center p-4 border rounded-lg hover:border-green-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  📧
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-green-600 transition-colors duration-300">
                  Email Security
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Spam filtering, phishing protection, malware scanning
                </p>
              </div>

              <div
                ref={(el) => {
                  if (el) {
                    securityCardsRef.current[2] = el;
                  }
                }}
                className="text-center p-4 border rounded-lg hover:border-purple-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  🌐
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  Web Security
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  DNS filtering, content filtering, safe browsing
                </p>
              </div>

              <div
                ref={(el) => {
                  if (el) {
                    securityCardsRef.current[3] = el;
                  }
                }}
                className="text-center p-4 border rounded-lg hover:border-orange-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  💾
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  Backup & Recovery
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Automated backups, ransomware rollback, cloud storage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
