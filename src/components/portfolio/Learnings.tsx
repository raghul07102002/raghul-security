import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import blackHackerImage from '@/assets/black-hacker.png';

interface LearningsProps {
  onClose: () => void;
}

const learningTopics = [
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Comprehensive cybersecurity fundamentals and advanced concepts',
  },
  {
    id: 'iam',
    title: 'Identity Access Management',
    description: 'IAM principles, protocols, and implementation strategies',
  },
  {
    id: 'soc',
    title: 'SOC',
    description: 'Security Operations Centre practices and procedures',
  },
  {
    id: 'vapt',
    title: 'VAPT',
    description: 'Vulnerability Assessment and Penetration Testing methodologies',
  },
];

const Learnings = ({ onClose }: LearningsProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

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

        <div className="max-w-6xl mx-auto p-8 pt-24">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-orbitron text-center text-primary cyber-glow mb-12"
          >
            LEARNINGS
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedTopic(topic.id)}
                className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-6 cursor-pointer card-glow transition-all hover:border-primary"
              >
                <h3 className="text-2xl font-orbitron text-primary mb-3">
                  {topic.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {topic.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Topic detail modal */}
      <AnimatePresence>
        {selectedTopic && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTopic(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="relative w-full max-w-2xl bg-card border-2 border-primary rounded-lg p-8 card-glow">
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center">
                  <motion.img
                    src={blackHackerImage}
                    alt="Learning Resources"
                    className="w-full max-w-md mx-auto mb-6 rounded-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-primary cyber-glow mb-6 font-orbitron"
                  >
                    CLICK ON THE BELOW LINK TO LEARN ME
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      onClick={() =>
                        window.open(
                          'https://drive.google.com/drive/folders/17EPCTzaM2jvAg8hUe8yO2AvVb-HoTHYJ?usp=sharing',
                          '_blank'
                        )
                      }
                      className="bg-primary hover:bg-primary/80 text-background font-orbitron"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      ACCESS LEARNING MATERIALS
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

export default Learnings;
