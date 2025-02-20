"use client";

import { cn } from "@/app/(utils)/utils";
import React, { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import Button from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const Topics = [
  "Predictive Maintenance",
  "Process Optimization",
  "Quality Control",
  "Supply Chain Optimization",
  "Digital Twins",
  "Robotics",
  "Automation",
  "Safety and Risk Management",
  "Anomaly Detection",
  "Cybersecurity",
];

const Industries = [
  "Oil and Gas",
  "Chemical",
  "Power",
  "Building Material",
  "Pulp and Paper",
  "Metallurg",
  "Life Science",
  "Food and Beverage",
  "Utility",
];

const Filters = ({
  currentTab,
  tabs,
  selectedTopics,
  setSelectedTopics,
  selectedIndustries,
  setSelectedIndustries,
  filterResources,
  setCurrentTab,
}) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [isFilter, setIsFilter] = useState(false);
  const [showSelected, setShowSelected] = useState(true);

  // Handle tab change
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  // Toggle Filter
  const toggleFilter = (name) => {
    if (activeFilter === name) {
      setActiveFilter(null);
      setIsFilter(false);
    } else {
      setActiveFilter(name);
      setIsFilter(true);
    }
  };

  // Toggle topic selection
  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const toggleTopicIns = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
    setTimeout(() => {
      filterResources();
    }, 10);
  };

  // Toggle industry selection
  const toggleIndustry = (industry) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const toggleIndustryIns = (industry) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
    setTimeout(() => {
      filterResources();
    }, 10);
  };

  // Clear all selections
  const clearAll = () => {
    setSelectedTopics([]);
    setSelectedIndustries([]);
    setActiveFilter(null);
    setIsFilter(false);
  };

  const clearAllOuter = () => {
    clearAll();
    setShowSelected(false);
  };

  // Show Results function
  const showResults = () => {
    setIsFilter(false);
    setActiveFilter(null);
    setShowSelected(true);
  };

  useEffect(() => {
    filterResources();
  }, [isFilter, currentTab, showSelected]);

  const TabClass =
    "text-xs md:text-lg py-1.5 md:py-2 px-3 md:px-4 border border-[#1C1C1C33] rounded-full whitespace-nowrap cursor-pointer hover:bg-[#006FE514] flex gap-1 items-center transition-colors duration-300 capitalize";

  return (
    <div className="w-full">
      <div className="border-b border-black/30 w-full flex max-md:flex-col justify-between gap-3 md:gap-4">
        <nav className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "pb-1 md:pb-3 px-2 md:px-3 border-b-2 font-medium text-sm sm:text-base md:text-lg transition-all relative leading-tight",
                currentTab === tab.id
                  ? "border-sec text-sec opacity-100"
                  : "border-transparent text-dark opacity-30 hover:opacity-100"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-0.5 md:gap-2 max-md:border-t max-md:border-black/30">
          <button
            onClick={() => toggleFilter("topic")}
            className="max-md:flex-1 max-md:justify-center max-md:bg-black/10 p-2 text-sm md:text-base font-medium flex items-center gap-2"
          >
            <span>Topic</span>
            <div
              className={`text-secD text-base md:text-lg transition-transform duration-500 ${
                activeFilter === "topic" ? "rotate-180" : "rotate-0"
              }`}
            >
              <IoChevronDown />
            </div>
          </button>
          <button
            onClick={() => toggleFilter("industry")}
            className="max-md:flex-1 max-md:justify-center max-md:bg-black/10 p-2 text-sm md:text-base font-medium flex items-center gap-2"
          >
            <span>Industry</span>
            <div
              className={`text-secD text-base md:text-lg transition-transform duration-300 ${
                activeFilter === "industry" ? "rotate-180" : "0"
              }`}
            >
              <IoChevronDown />
            </div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {(activeFilter ||
          selectedTopics.length > 0 ||
          selectedIndustries.length > 0) &&
          isFilter && (
            <motion.div
              className="overflow-hidden w-full"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 md:py-4">
                <div className="flex gap-2 md:gap-3 py-1 md:py-5 flex-wrap">
                  {activeFilter === "topic" &&
                    Topics.map((item, index) => (
                      <div
                        key={index}
                        className={cn(
                          TabClass,
                          selectedTopics.includes(item) &&
                            "bg-[#006FE514] text-sec border-sec"
                        )}
                        onClick={() => toggleTopic(item)}
                      >
                        {selectedTopics.includes(item) ? (
                          <IoMdCheckmark className="text-sec sm:mr-1 text-sm md:text-xl" />
                        ) : (
                          <FiPlus className="text-sec sm:mr-1 sm:p-0.5 text-sm md:text-xl" />
                        )}
                        {item}
                      </div>
                    ))}
                  {activeFilter === "industry" &&
                    Industries.map((item, index) => (
                      <div
                        key={index}
                        className={cn(
                          TabClass,
                          selectedIndustries.includes(item) &&
                            "bg-[#006FE514] text-sec border-sec"
                        )}
                        onClick={() => toggleIndustry(item)}
                      >
                        {selectedIndustries.includes(item) ? (
                          <IoMdCheckmark className="text-sec sm:mr-1 text-sm md:text-xl" />
                        ) : (
                          <FiPlus className="text-sec sm:mr-1 sm:p-0.5 text-sm md:text-xl" />
                        )}
                        {item}
                      </div>
                    ))}
                </div>
                <div className="flex justify-end items-center">
                  <Button rounded btnType="link" onClick={clearAll}>
                    Clear all
                  </Button>
                  <Button btnType="sec" rounded onClick={showResults}>
                    Apply
                  </Button>
                </div>
              </div>
              <div className="w-full border-b border-black/30"></div>
            </motion.div>
          )}
      </AnimatePresence>
      <AnimatePresence>
        {(selectedTopics.length > 0 || selectedIndustries.length > 0) &&
          !isFilter &&
          showSelected && (
            <motion.div
              className="overflow-hidden w-full origin-bottom"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 md:py-4">
                <div className="flex gap-2 md:gap-3 pt-1 md:pt-2 flex-wrap items-center">
                  {selectedTopics.map((item, index) => (
                    <div
                      key={`topic-${index}`}
                      className={cn(
                        TabClass,
                        selectedTopics.includes(item) &&
                          "bg-[#006FE514] text-sec border-sec"
                      )}
                      onClick={() => toggleTopicIns(item)}
                    >
                      {selectedTopics.includes(item) ? (
                        <IoMdCheckmark className="text-sec sm:mr-1 text-sm md:text-xl" />
                      ) : (
                        <FiPlus className="text-sec sm:mr-1 sm:p-0.5 text-sm md:text-xl" />
                      )}
                      {item}
                    </div>
                  ))}
                  {selectedIndustries.map((item, index) => (
                    <div
                      key={`industry-${index}`}
                      className={cn(
                        TabClass,
                        selectedIndustries.includes(item) &&
                          "bg-[#006FE514] text-sec border-sec"
                      )}
                      onClick={() => toggleIndustryIns(item)}
                    >
                      {selectedTopics.includes(item) ? (
                        <IoMdCheckmark className="text-sec sm:mr-1 text-sm md:text-xl" />
                      ) : (
                        <FiPlus className="text-sec sm:mr-1 sm:p-0.5 text-sm md:text-xl" />
                      )}
                      {item}
                    </div>
                  ))}
                  <Button
                    rounded
                    btnType="link"
                    onClick={clearAllOuter}
                    className={"h-fit md:h-fit p-0"}
                    innerClass={
                      "text-xs md:text-lg py-2.5 md:py-3 px-3 md:px-4 h-fit md:h-fit"
                    }
                  >
                    Clear all
                    <RiDeleteBin6Line className="sm:ml-1 text-sm md:text-xl" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default Filters;
