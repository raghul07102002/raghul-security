import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PasswordPrompt from './PasswordPrompt';
import { toast } from 'sonner';

interface AchievementsProps {
  onClose: () => void;
}

interface Certificate {
  id: string;
  name: string;
  url: string;
  addedAt: string;
}

const Achievements = ({ onClose }: AchievementsProps) => {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [actionType, setActionType] = useState<'upload' | 'rename' | 'delete' | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('certificates');
    if (saved) {
      setCertificates(JSON.parse(saved));
    }
  }, []);

  const saveCertificates = (certs: Certificate[]) => {
    setCertificates(certs);
    localStorage.setItem('certificates', JSON.stringify(certs));
  };

  const handleUploadClick = () => {
    setActionType('upload');
    setShowPasswordPrompt(true);
  };

  const handleRenameClick = (cert: Certificate) => {
    setSelectedCert(cert);
    setNewName(cert.name);
    setActionType('rename');
    setShowPasswordPrompt(true);
  };

  const handleDeleteClick = (cert: Certificate) => {
    setSelectedCert(cert);
    setActionType('delete');
    setShowPasswordPrompt(true);
  };

  const handlePasswordSuccess = () => {
    if (actionType === 'upload') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,.pdf';
      input.multiple = true;
      input.onchange = (e: any) => {
        const files = Array.from(e.target.files) as File[];
        if (files.length > 0) {
          let processed = 0;
          const newCerts: Certificate[] = [];
          
          files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              newCerts.push({
                id: Date.now().toString() + Math.random(),
                name: file.name,
                url: reader.result as string,
                addedAt: new Date().toISOString(),
              });
              processed++;
              
              if (processed === files.length) {
                saveCertificates([...certificates, ...newCerts]);
                toast.success(`${files.length} certificate(s) uploaded successfully!`);
              }
            };
            reader.readAsDataURL(file);
          });
        }
      };
      input.click();
    } else if (actionType === 'rename' && selectedCert) {
      const updated = certificates.map((cert) =>
        cert.id === selectedCert.id ? { ...cert, name: newName } : cert
      );
      saveCertificates(updated);
      toast.success('Certificate renamed successfully!');
      setSelectedCert(null);
      setNewName('');
    } else if (actionType === 'delete' && selectedCert) {
      const updated = certificates.filter((cert) => cert.id !== selectedCert.id);
      saveCertificates(updated);
      toast.success('Certificate deleted successfully!');
      setSelectedCert(null);
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

        <Button
          onClick={handleUploadClick}
          className="fixed top-8 right-24 z-50 bg-primary hover:bg-primary/80 text-background font-orbitron"
        >
          <Upload className="w-4 h-4 mr-2" />
          UPLOAD
        </Button>

        <div className="max-w-7xl mx-auto p-8 pt-24">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-orbitron text-center text-primary cyber-glow mb-12"
          >
            ACHIEVEMENTS
          </motion.h1>

          {certificates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                No certificates uploaded yet. Click the upload button to add your achievements.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-4 card-glow hover:border-primary transition-all"
                >
                  <div className="aspect-[4/3] bg-muted rounded-lg mb-3 overflow-hidden">
                    {cert.url.endsWith('.pdf') ? (
                      <div className="w-full h-full flex items-center justify-center text-primary">
                        <span className="text-4xl">📄</span>
                      </div>
                    ) : (
                      <img
                        src={cert.url}
                        alt={cert.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <p className="text-sm font-medium text-foreground truncate mb-2">
                    {cert.name}
                  </p>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRenameClick(cert)}
                      className="flex-1 border-primary/30 text-primary hover:bg-primary hover:text-background"
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Rename
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(cert)}
                      className="flex-1 border-accent/30 text-accent hover:bg-accent hover:text-white"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <PasswordPrompt
        isOpen={showPasswordPrompt}
        onClose={() => {
          setShowPasswordPrompt(false);
          setActionType(null);
          setSelectedCert(null);
        }}
        onSuccess={handlePasswordSuccess}
      />

      {/* Rename modal */}
      {actionType === 'rename' && selectedCert && (
        <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
          <div className="bg-card border-2 border-primary/30 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-orbitron text-primary mb-4">RENAME CERTIFICATE</h3>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-background/50 border-primary/30 focus:border-primary mb-4"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setActionType(null);
                  setSelectedCert(null);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowPasswordPrompt(true)}
                className="flex-1 bg-primary hover:bg-primary/80"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Achievements;
