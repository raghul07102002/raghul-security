import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PasswordPrompt from './PasswordPrompt';
import { toast } from 'sonner';

interface ResumeProps {
  onClose: () => void;
}

const Resume = ({ onClose }: ResumeProps) => {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [resumeData, setResumeData] = useState<{ name: string; data: string; type: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('resumeFile');
    if (saved) {
      setResumeData(JSON.parse(saved));
    }
  }, []);

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
        const reader = new FileReader();
        reader.onload = () => {
          const fileData = {
            name: file.name,
            data: reader.result as string,
            type: file.type,
          };
          localStorage.setItem('resumeFile', JSON.stringify(fileData));
          setResumeData(fileData);
          toast.success('Resume uploaded successfully!');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleDownload = () => {
    if (resumeData) {
      const link = document.createElement('a');
      link.href = resumeData.data;
      link.download = resumeData.name;
      link.click();
      toast.success('Resume downloaded!');
    } else {
      toast.error('No resume available to download');
    }
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
              RESUME
            </h2>

            <div className="space-y-6">
              {resumeData ? (
                <div className="mb-8">
                  {resumeData.type === 'application/pdf' ? (
                    <iframe
                      src={resumeData.data}
                      className="w-full h-[600px] rounded-lg border border-primary/30"
                      title="Resume Preview"
                    />
                  ) : (
                    <div className="p-8 bg-primary/10 rounded-lg border border-primary/30">
                      <p className="text-foreground/80 text-center">
                        File: {resumeData.name}
                      </p>
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        Preview not available for this file type. Use download button.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-foreground/80 text-lg">
                  Upload your professional resume to display and download.
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button
                  onClick={handleDownload}
                  disabled={!resumeData}
                  className="bg-primary hover:bg-primary/80 text-background font-orbitron min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5 mr-2" />
                  DOWNLOAD RESUME
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

export default Resume;
