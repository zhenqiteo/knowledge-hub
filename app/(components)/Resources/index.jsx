"use client";

import { RESS } from "@/app/(constants)/ress";
import React, { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import Filters from "./Filters";
import Button from "../ui/Button";
import { GoPlus } from "react-icons/go";

const tabs = [
  { id: "all", label: "All" },
  { id: "case-studies", label: "Case Studies" },
  { id: "white-paper", label: "White Paper" },
  { id: "product-brochures", label: "Product Brochures" },
];

const PERPAGE = 12;

const Resources = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [filteredResources, setFilteredResources] = useState(RESS);
  const [currentTab, setCurrentTab] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PERPAGE); // Initial visible count

  const filterResources = useCallback(() => {
    const filtered = RESS.filter((resource) => {
      const matchesTab =
        currentTab === "all" ||
        resource.categories?.some(
          (category) => category.toLowerCase().replace(" ", "-") === currentTab
        );

      const matchesTopics =
        selectedTopics.length === 0 ||
        selectedTopics?.some((topic) => resource.topics?.includes(topic));

      const matchesIndustries =
        selectedIndustries.length === 0 ||
        selectedIndustries?.some((industry) =>
          resource.industries?.includes(industry)
        );

      return matchesTab && matchesTopics && matchesIndustries;
    });

    setFilteredResources(filtered);
    setVisibleCount(PERPAGE); // Reset to 12 items when filters change
  }, [currentTab, selectedTopics, selectedIndustries]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PERPAGE); // Load 12 more items
  };

  return (
    <section className="flex flex-col">
      <div className="max-w-screen-2xl mx-auto flex flex-col px-5  py-12 md:py-20 lg:py-32 gap-12 md:gap-20 w-full">
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="tracking-wide text-base text-sec font-medium uppercase">
            RESOURCES
          </p>
          <h1 className="font-medium text-3xl sm:text-5xl lg:text-7xl">
            Digital Resources <br />
            for Industry Innovators
          </h1>
        </div>
        <div className="flex flex-col gap-12 md:gap-20 items-center">
          <Filters
            currentTab={currentTab}
            tabs={tabs}
            selectedTopics={selectedTopics}
            setSelectedTopics={setSelectedTopics}
            selectedIndustries={selectedIndustries}
            setSelectedIndustries={setSelectedIndustries}
            filterResources={filterResources}
            setCurrentTab={setCurrentTab}
          />
          <div className="w-full max-md:flex-col flex justify-between max-md:items-start gap-3 md:gap-12">
            <h2 className="font-medium text-2xl sm:text-4xl lg:text-6xl flex-shrink-0 relative">
              {tabs.find((tab) => tab.id === currentTab)?.label}
              {currentTab === "all" && " Resources"}
              <span className="text-xs md:text-base font-normal absolute left-full bottom-full -translate-x-1/2 translate-y-1/2">
                ({filteredResources?.length})
              </span>
            </h2>
            <p className="max-w-[55ch] text-sm sm:text-base leading-normal">
              Discover our <b>case studies</b>, <b>white papers</b>, and{" "}
              <b>product brochures</b>, crafted to guide you in navigating key
              industry transformations and accelerating your path to value
              realisation.
            </p>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6 sm:gap-y-12">
            {filteredResources.slice(0, visibleCount).map((item, index) => {
              return <Card key={index} item={item} />;
            })}
            {filteredResources.length < 1 && (
              <p className="text-center w-full col-span-full py-12">
                No Result To Show
              </p>
            )}
          </div>
          {visibleCount < filteredResources.length && (
            <div>
              <Button
                onClick={handleLoadMore}
                rounded
                btnType="link"
                innerClass="px-3 py-2 !h-auto"
                className={"!h-auto"}
              >
                <span className="mr-2 text-[1.5em] w-[1.5em] h-[1.5em] grid place-content-center border border-black/30 rounded-full">
                  <GoPlus />
                </span>
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Resources;
