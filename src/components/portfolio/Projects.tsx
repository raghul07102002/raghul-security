import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import redHackerImage from '@/assets/red-hacker.png';

interface ProjectsProps {
  onClose: () => void;
}

const projects = [
  {
    id: 'iam',
    title: 'Identity and Access Management',
    description: 'Comprehensive IAM solutions for secure authentication and authorization',
  },
  {
    id: 'soc',
    title: 'Security Operations Centre',
    description: 'Real-time threat monitoring and incident response systems',
  },
  {
    id: 'vapt',
    title: 'Vulnerability Management and Penetration Testing',
    description: 'Advanced security testing and vulnerability assessment frameworks',
  },
];

const Projects = ({ onClose }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-40 overflow-y-auto"
    >
      <div className="min-h-screen relative grid-background">
        <Button
          onClick={onClose}
          className="fixed top-8 right-8 z-50 bg-accent hover:bg-accent/80 text-white"
          size="icon"
        >
          <X className="w-6 h-6" />
        </Button>

        <a
          href="https://github.com/raghul07102002"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed top-8 left-8 z-50"
        >
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-background font-orbitron"
          >
            <Github className="w-5 h-5 mr-2" />
            GITHUB
          </Button>
        </a>

        <div className="max-w-6xl mx-auto p-8 pt-24">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-orbitron text-center text-primary cyber-glow mb-12"
          >
            PROJECTS
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedProject(project.id)}
                className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-6 cursor-pointer card-glow transition-all hover:border-primary"
              >
                <h3 className="text-xl font-orbitron text-primary mb-3">
                  {project.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="relative w-full max-w-2xl bg-card border-2 border-accent rounded-lg p-8 card-glow">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-accent transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center">
                  <motion.img
                    src={redHackerImage}
                    alt="Red Hat Hacker"
                    className="w-full max-w-md mx-auto mb-6 rounded-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-accent cyber-glow-red mb-6 font-orbitron"
                  >
                    CLICK ME TO EXPLORE MORE
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      onClick={() => window.open('https://github.com/raghul07102002', '_blank')}
                      className="bg-accent hover:bg-accent/80 text-white font-orbitron"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      VIEW ON GITHUB
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
