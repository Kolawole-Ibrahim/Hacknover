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
  const securitySectionRef = useRef<HTMLDivElement>(null);

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

  // Security cards animation - Email Security triggers when in view, then others sequentially
  useEffect(() => {
    let hasAnimated = false;
    const isMobile = window.innerWidth < 1024;

    const handleScroll = () => {
      // Security cards Mobile animation - scroll-triggered upward movement
      if (isMobile) {
        if (!securitySectionRef.current) return;

        const sectionRect = securitySectionRef.current.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const windowHeight = window.innerHeight;

        // Calculate scroll progress (0 to 1)
        const scrollProgress = Math.max(
          0,
          Math.min(
            1,
            (windowHeight - sectionTop) / (windowHeight + sectionHeight)
          )
        );

        // Sequential animation - each card waits for previous to complete
        securityCardsRef.current.forEach((card, index) => {
          if (card) {
            // Define animation phases for each card
            let cardProgress = 0;

            if (index === 1) {
              // Card 1 (Email) - animates first (0% to 25% of scroll)
              if (scrollProgress <= 0.25) {
                cardProgress = scrollProgress / 0.25;
              } else {
                cardProgress = 1;
              }
            } else if (index === 2) {
              // Card 2 (Web) - animates second (25% to 50% of scroll)
              if (scrollProgress >= 0.25 && scrollProgress <= 0.5) {
                cardProgress = (scrollProgress - 0.25) / 0.25;
              } else if (scrollProgress > 0.5) {
                cardProgress = 1;
              }
            } else if (index === 0) {
              // Card 0 (Endpoint) - animates third (50% to 75% of scroll)
              if (scrollProgress >= 0.5 && scrollProgress <= 0.70) {
                cardProgress = (scrollProgress - 0.5) / 0.20;
              } else if (scrollProgress > 0.70) {
                cardProgress = 1;
              }
            } else if (index === 3) {
              // Card 3 (Backup) - animates last (75% to 100% of scroll)
              if (scrollProgress >= 0.70) {
                cardProgress = (scrollProgress - 0.70) / 0.30;
              }
            }

            const targetY =
              index == 0
                ? 300 - index * 10 // Start lower down, move up to final position
                : index == 1
                ? -480 - index * 10
                : index == 2
                ? -450 - index * 10
                : index == 3
                ? -470 - index * 10
                : -450 - index * 10;
            const currentY = targetY * cardProgress;

            gsap.set(card, {
              y: currentY,
              duration: 0.3,
            });
          }
        });
        return;
      }

      // Only animate on large devices (lg and above)
      if (!securitySectionRef.current || isMobile) return;

      const sectionRect = securitySectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const windowHeight = window.innerHeight;

      // Check if Email Security card (index 1) is in view
      const emailCard = securityCardsRef.current[1];
      if (!emailCard) return;

      const emailCardRect = emailCard.getBoundingClientRect();
      const emailCardTop = emailCardRect.top;
      const emailCardHeight = emailCardRect.height;

      // Email Security card is in view when its top reaches 80% of viewport
      const emailTriggerPoint = windowHeight * 0.8;
      const isEmailInView =
        emailCardTop <= emailTriggerPoint &&
        emailCardTop + emailCardHeight >= 0;

      if (isEmailInView && !hasAnimated) {
        // First animate Email Security card
        const targetX = -340 - 1 * 40; // -290
        const targetY = -240 - 1 * 40; // -290

        gsap.to(emailCard, {
          x: targetX,
          y: targetY,
          rotation: 0,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => {
            // After Email Security finishes, animate the other cards
            securityCardsRef.current.forEach((card, index) => {
              if (card && index !== 1) {
                // Skip Email Security (already animated)
                const targetX =
                  index == 2
                    ? 460 - index * 40
                    : index == 3
                    ? -140 - index * 40
                    : 200 + (index - 0) * 40;
                const targetY =
                  index == 2
                    ? -200 - index * 40
                    : index == 3
                    ? 200 - index * 40
                    : 80 + (index - 0) * 40;

                gsap.to(card, {
                  x: targetX,
                  y: targetY,
                  rotation: 0,
                  duration: 1.2,
                  ease: "power2.out",
                  delay: index === 0 ? 0 : index === 2 ? 0.2 : 0.4, // Stagger other cards
                });
              }
            });
          },
        });
        hasAnimated = true;
      } else if (!isEmailInView && hasAnimated) {
        // Return all cards to initial stacked positions
        securityCardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.to(card, {
              x: 0,
              y: 0,
              rotation: index % 2 === 0 ? 2 : -2,
              duration: 1.2,
              ease: "power2.out",
            });
          }
        });
        hasAnimated = false;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

    // Security decorative line animation
    gsap.to(".security-decorative-line", {
      transformOrigin: "top top",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".security-decorative-line",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".security-decorative-line", {
            scaleY: self.progress,
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

    // Initial card setup and hover effects
    if (securityCardsRef.current.length > 0) {
      securityCardsRef.current.forEach((card, index) => {
        if (card) {
          // Set initial state
          gsap.set(card, {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            rotation: index % 2 === 0 ? 2 : -2,
          });
        }
      });
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
                <div className="group bg-red-300 z-10 rounded-2xl">
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
                  <div className="gradient-line w-1 h-[150%]" />
                </div>

                {/* Solution Card */}
                <div className="group bg-green-300 z-10 rounded-2xl">
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

          {/* Modern Security Modules Section */}
          <div ref={securitySectionRef} className="relative w-full mb-16">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-3xl"></div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>
            <div className="absolute top-10 right-10 w-20 h-20 bg-blue-100 rounded-full opacity-30 blur-xl"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-purple-100 rounded-full opacity-30 blur-xl"></div>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="text-center lg:mb-12 mb-82">
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                  Core Security Modules
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Comprehensive protection across all attack vectors with
                  enterprise-grade security
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
              </div>

              {/* Stacked Cards Container */}
              <div className="relative h-[800px] flex justify-center items-center perspective-1000">
                {/* Endpoint Protection - Bottom Card */}
                <div
                  ref={(el) => {
                    if (el) {
                      securityCardsRef.current[0] = el;
                    }
                  }}
                  className="absolute w-full  max-w-sm bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-2xl border border-blue-200 transform md:translate-y-[340px] translate-y-16 translate-x-[-160px] rotate-2 z-25"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-xl">💻</span>
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Available
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Endpoint Protection
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Advanced antivirus with behavioral monitoring and ransomware
                    detection
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Real-time scanning
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Behavioral analysis
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Ransomware protection
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Real-time protection</span>
                    <span className="font-semibold text-blue-600">24/7</span>
                  </div>
                </div>

                {/* Email Security - Third Card */}
                <div
                  ref={(el) => {
                    if (el) {
                      securityCardsRef.current[1] = el;
                    }
                  }}
                  className="absolute w-full max-w-sm bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-2xl border border-green-200 transform translate-y-12 translate-x-[-120px] rotate-1 z-20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Included
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Email Security
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Comprehensive email protection against spam, phishing, and
                    malware
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Spam filtering
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Phishing protection
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Malware scanning
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">AI-powered filtering</span>
                    <span className="font-semibold text-green-600">99.9%</span>
                  </div>
                </div>

                <div className="security-decorative-line"></div>

                {/* Web Security - Second Card */}
                <div
                  ref={(el) => {
                    if (el) {
                      securityCardsRef.current[2] = el;
                    }
                  }}
                  className="absolute w-full max-w-sm bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-2xl border border-purple-200 transform translate-y-8 translate-x-[120px] -rotate-1 z-30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-xl">🌐</span>
                    </div>
                    <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      Standard
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Web Security
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    DNS filtering and content protection for safe browsing
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        DNS filtering
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Content filtering
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Safe browsing
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Global network</span>
                    <span className="font-semibold text-purple-600">200+</span>
                  </div>
                </div>

                {/* Backup & Recovery - Top Card */}
                <div
                  ref={(el) => {
                    if (el) {
                      securityCardsRef.current[3] = el;
                    }
                  }}
                  className="absolute w-full max-w-sm bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-2xl border border-orange-200 transform translate-y-4 translate-x-[160px] -rotate-2 z-40"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-xl">💾</span>
                    </div>
                    <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      Essential
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Backup & Recovery
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Automated backups with ransomware rollback capabilities
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Automated backups
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Ransomware rollback
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Cloud storage
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Recovery time</span>
                    <span className="font-semibold text-orange-600">1hr</span>
                  </div>
                </div>
              </div>

              {/* Security Stats */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    99.9%
                  </div>
                  <div className="text-sm text-gray-600">
                    Threat Detection Rate
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">
                    Monitoring Coverage
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    1min
                  </div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Uptime Guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
