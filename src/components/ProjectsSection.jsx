import React, { useState } from 'react';
import categorizedProjects from '../data/CategorizedProjects';
import allProjects from '../data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderIcon, FolderOpenIcon } from '@heroicons/react/24/outline';

export default function ProjectsSection() {
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);

  const toggleFolder = (folderTitle) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderTitle]: !prev[folderTitle],
    }));
  };

  return (
    <section id="projects" className="py-16 sm:py-20 bg-white">
      <div className="space-y-10 px-4 sm:px-6 lg:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-600">Projects</h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categorizedProjects.map((category) => {
            const matchedProjects = category.projects
              .map((title) => allProjects.find((p) => p.title === title))
              .filter(Boolean);

            if (!matchedProjects.length) return null;

            return (
              <div
                key={category.title}
                className="bg-white rounded-xl shadow p-4 transition hover:shadow-md"
              >
                {/* Folder Header */}
                <div
                  className="flex items-center gap-3 cursor-pointer group mb-2"
                  onClick={() => toggleFolder(category.title)}
                >
                  {expandedFolders[category.title] ? (
                    <FolderOpenIcon className="w-6 h-6 text-purple-600 group-hover:scale-105 transition" />
                  ) : (
                    <FolderIcon className="w-6 h-6 text-gray-500 group-hover:text-purple-500" />
                  )}
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>

                {/* Expandable Project Grid */}
                <AnimatePresence>
                  {expandedFolders[category.title] && (
                    <motion.div
                      className="mt-4 grid gap-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {matchedProjects.map((project, idx) => {
                        const isExpanded = selectedProject?.title === project.title;

                        return (
                          <motion.div
                            key={idx}
                            className={`bg-gray-50 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                              isExpanded
                                ? 'shadow-xl border border-purple-200'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() =>
                              setSelectedProject(isExpanded ? null : project)
                            }
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <h4 className="text-md sm:text-lg font-semibold">
                              {project.title}
                            </h4>
                            <p className="text-gray-500 text-sm mt-1">{project.summary}</p>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  className="mt-3 text-sm text-gray-700"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <p>{project.details}</p>
                                  {project.links?.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {project.links.map((link, i) => (
                                        <a
                                          key={i}
                                          href={link.url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-purple-600 underline hover:text-purple-800"
                                        >
                                          {link.label}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
