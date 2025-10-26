import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Edit, Mail, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePortfolio } from '@/contexts/PortfolioContext';
import PasswordPrompt from './PasswordPrompt';
import { toast } from 'sonner';
import profileImage from '@/assets/raghul-profile.jpg';

interface AboutMeProps {
  onClose: () => void;
}

const AboutMe = ({ onClose }: AboutMeProps) => {
  const { profileData, updateProfileData } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [editForm, setEditForm] = useState(profileData);

  const handleEditClick = () => {
    setShowPasswordPrompt(true);
  };

  const handlePasswordSuccess = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfileData(editForm);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditForm(profileData);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-40 overflow-y-auto"
    >
      <div className="min-h-screen relative grid-background">
        {/* Close button */}
        <Button
          onClick={onClose}
          className="fixed top-8 right-8 z-50 bg-accent hover:bg-accent/80 text-white"
          size="icon"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Edit button */}
        {!isEditing && (
          <Button
            onClick={handleEditClick}
            className="fixed top-8 right-24 z-50 bg-primary hover:bg-primary/80 text-background font-orbitron"
          >
            <Edit className="w-4 h-4 mr-2" />
            ADMIN EDIT
          </Button>
        )}

        <div className="max-w-4xl mx-auto p-8 pt-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-8 card-glow"
          >
            {isEditing ? (
              <div className="space-y-6">
                <h2 className="text-3xl font-orbitron text-primary cyber-glow mb-6">
                  EDIT PROFILE
                </h2>

                <div>
                  <label className="block text-sm font-orbitron text-primary mb-2">
                    NAME
                  </label>
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-orbitron text-primary mb-2">
                    ROLE
                  </label>
                  <Input
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-orbitron text-primary mb-2">
                    BIO
                  </label>
                  <Textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    rows={6}
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-orbitron text-primary mb-2">
                    EMAIL
                  </label>
                  <Input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-orbitron text-primary mb-2">
                    LINKEDIN
                  </label>
                  <Input
                    value={editForm.linkedin}
                    onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-orbitron text-primary mb-2">
                    GITHUB
                  </label>
                  <Input
                    value={editForm.github}
                    onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-primary hover:bg-primary/80 text-background font-orbitron"
                  >
                    SAVE CHANGES
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 border-accent text-accent hover:bg-accent hover:text-white font-orbitron"
                  >
                    CANCEL
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Profile header */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <motion.div
                    className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_30px_hsl(var(--cyber-blue))]"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={profileImage}
                      alt={profileData.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 mix-blend-overlay" />
                  </motion.div>

                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-orbitron text-primary cyber-glow mb-2">
                      {profileData.name}
                    </h1>
                    <p className="text-xl text-secondary mb-4">{profileData.role}</p>
                    <p className="text-foreground/80 leading-relaxed">
                      {profileData.bio}
                    </p>
                  </div>
                </div>

                {/* Contact information */}
                <div className="border-t border-primary/30 pt-6">
                  <h3 className="text-xl font-orbitron text-primary mb-4">CONTACT</h3>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${profileData.email}`}
                      className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group"
                    >
                      <Mail className="w-5 h-5 group-hover:text-primary" />
                      <span>{profileData.email}</span>
                    </a>
                    <a
                      href={profileData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group"
                    >
                      <Linkedin className="w-5 h-5 group-hover:text-primary" />
                      <span>LinkedIn Profile</span>
                    </a>
                    <a
                      href={profileData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group"
                    >
                      <Github className="w-5 h-5 group-hover:text-primary" />
                      <span>GitHub Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
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

export default AboutMe;
