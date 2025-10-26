import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PasswordPrompt from './PasswordPrompt';
import { toast } from 'sonner';

interface CoverLetterProps {
  onClose: () => void;
}

const CoverLetter = ({ onClose }: CoverLetterProps) => {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const handleUploadClick = () => {
    setShowPasswordPrompt(true);
  };

  const handlePasswordSuccess = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        localStorage.setItem('coverLetterFile', JSON.stringify({
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
        }));
        toast.success('Cover letter uploaded successfully!');
      }
    };
    input.click();
  };

  const handleDownload = () => {
    toast.info('Download functionality ready. Cover letter would be downloaded here.');
  };

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

        <div className="max-w-4xl mx-auto p-8 pt-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-12 card-glow text-center"
          >
            <h2 className="text-3xl font-orbitron text-primary cyber-glow mb-8">
              COVER LETTER
            </h2>

            <div className="space-y-6">
              <p className="text-foreground/80 text-lg">
                Download my professional cover letter or upload a new version.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button
                  onClick={handleDownload}
                  className="bg-primary hover:bg-primary/80 text-background font-orbitron min-w-[200px]"
                >
                  <Download className="w-5 h-5 mr-2" />
                  DOWNLOAD
                </Button>

                <Button
                  onClick={handleUploadClick}
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-white font-orbitron min-w-[200px]"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  UPLOAD NEW
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-8">
                Supported formats: PDF, DOC, DOCX
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <PasswordPrompt
        isOpen={showPasswordPrompt}
        onClose={() => setShowPasswordPrompt(false)}
        onSuccess={handlePasswordSuccess}
      />
    </motion.div>
  );
};

export default CoverLetter;
