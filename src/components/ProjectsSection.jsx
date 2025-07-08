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
    <section id="projects">
    <div className="space-y-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>

      {categorizedProjects.map((category) => {
        const matchedProjects = category.projects
          .map((title) => allProjects.find((p) => p.title === title))
          .filter(Boolean);

        if (!matchedProjects.length) return null;

        return (
          <div key={category.title}>
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
              <h3 className="text-xl font-semibold">{category.title}</h3>
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
              {expandedFolders[category.title] && (
                <motion.div
                  className="mt-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {matchedProjects.map((project, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
                      onClick={() => setSelectedProject(project)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <h4 className="text-lg font-semibold">{project.title}</h4>
                      <p className="text-gray-500 text-sm mt-1">{project.summary}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setSelectedProject(null)}
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-2">{selectedProject.title}</h3>
              <div className="text-gray-700 text-sm">{selectedProject.details}</div>
              {selectedProject.links?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProject.links.map((link, i) => (
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </section>
  );
}
