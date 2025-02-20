import Link from "next/link";
import React from "react";
import { FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import ArrowLink from "../(assets)/ArrowLink";
import { FaYoutube } from "react-icons/fa";
import { LuMessageCircleMore } from "react-icons/lu";
import LinkEffect from "./ui/LinkEffect";

const data = [
  {
    title: "About SUPCON",
    links: [
      { name: "Who Are We", href: "#" },
      { name: "Location", href: "#" },
      { name: "Sustainability", href: "#" },
      { name: "Resources", href: "#" },
      { name: "Newsroom", href: "#" },
      { name: "Career", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "Next Gen Automation", href: "#" },
      { name: "Control & Instrumentation", href: "#" },
      { name: "Digital Solutions", href: "#" },
    ],
  },
  {
    title: "Industries",
    links: [
      { name: "Oil & Gas", href: "#" },
      { name: "Chemical", href: "#" },
      { name: "Power", href: "#" },
      { name: "Building Material", href: "#" },
      { name: "Pulp & Paper", href: "#" },
      { name: "Metallurgy", href: "#" },
      { name: "Life Science", href: "#" },
      { name: "Food & Beverage", href: "#" },
      { name: "Utility", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="w-full md:[clipPath:polygon(0%_0,100%_0%,100%_100%,0_100%)] relative h-fit md:h-[min(51rem,100vh)]"
      style={{
        "--footer-height": "min(51rem,100vh)",
      }}
    >
      <div className="font-light text-[#F5F5F5] bg-[#111111] relative md:h-[calc(100vh+var(--footer-height))] md:-top-[100vh]">
        <div className="h-fit md:h-[var(--footer-height)] md:sticky md:top-[calc(100vh-var(--footer-height))]">
          <div className="py-8 sm:py-16 max-w-screen-2xl mx-auto flex flex-col gap-10 md:gap-4 px-5 h-full w-full justify-between">
            {/* Top section with logo and contact */}
            <div className="flex max-sm:flex-col justify-between items-start max-sm:gap-3">
              <div>
                <Image
                  src="/LOGO.svg"
                  alt="SUPCON"
                  width={150}
                  height={40}
                  className="h-8 md:h-11 w-auto"
                  priority
                />
              </div>
              <div className="flex flex-col items-start sm:gap-1 md:gap-4">
                <Link href="#">
                  <LinkEffect
                    textClass={"text-xl sm:text-3xl md:text-4xl"}
                    text={"CONTACT US"}
                  />
                </Link>
                <div className="flex gap-3 sm:gap-6 text-xl md:text-3xl">
                  <Link href="#" className="hover:text-sec transition-colors">
                    <FaLinkedin />
                  </Link>
                  <Link href="#" className="hover:text-sec transition-colors">
                    <FaYoutube />
                  </Link>
                  <Link href="#" className="hover:text-sec transition-colors">
                    <LuMessageCircleMore />
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 pt-8 border-t border-[#F5F5F550]">
              <p className="col-span-1 md:col-span-2 text-xl leading-normal">
                Leading Industrial AI To
                <br className="max-md:hidden" />
                Sustainable Growth
              </p>

              {data.map((section, index) => (
                <div className="col-span-1" key={index}>
                  <h3 className="text-grayD mb-2 md:mb-4 uppercase text-base tracking-wider">
                    {section.title}
                  </h3>
                  <div className="max-md:text-sm flex md:flex-col max-md:flex-wrap max-md:gap-x-3">
                    {section.links.map((link, linkIndex) => (
                      <Link href={link.href} key={linkIndex}>
                        <LinkEffect
                          textClass={"p-0.5 sm:p-1"}
                          noicon
                          text={link.name}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom section with copyright and legal links */}
            <div className="flex gap-2 max-md:flex-col justify-between items-start sm:items-center pt-4 border-t border-[#F5F5F550]">
              <p className="text-sm">© 2024 SUPCON. All Rights Reserved</p>
              <div className="flex max-sm:flex-wrap gap-2 sm:gap-8 text-sm">
                <Link href="#">
                  <LinkEffect
                    textClass={"p-1"}
                    noicon
                    text={"Privacy Policy"}
                  />
                </Link>
                <Link href="#">
                  <LinkEffect
                    textClass={"p-1"}
                    noicon
                    text={"Terms Of Service"}
                  />
                </Link>
                <Link href="#">
                  <LinkEffect textClass={"p-1"} noicon text={"Accessibility"} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
