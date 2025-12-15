import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const emojiAvatars = [
  '😀', '😎', '🤩', '😇', '🥳', '🤓', '🧐', '😸',
  '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🐸', '🦄',
  '🌟', '⭐', '✨', '🔥', '💎', '👑', '🎨', '🎮',
  '🎵', '🎸', '🎬', '📷', '🚀', '✈️', '🌈', '🎯'
];

const CreateChannel = () => {
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('😀');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (channelName.trim()) {
      const userData = {
        channelName,
        avatar: selectedAvatar,
        subscribers: 0,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('viatube_user', JSON.stringify(userData));
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center neon-glow animate-glow">
              <Icon name="Play" size={36} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">ViaTube</h1>
          </div>
        </div>

        <Card className="p-8 bg-card/50 border-border/50 backdrop-blur-xl animate-scale-in">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold gradient-text mb-2">
              Создайте свой канал
            </h2>
            <p className="text-muted-foreground">
              Выберите имя и аватар для вашего канала
            </p>
          </div>

          <form onSubmit={handleCreate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="channelName" className="text-base">Название канала</Label>
              <Input
                id="channelName"
                type="text"
                placeholder="Мой Крутой Канал"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                required
                maxLength={30}
                className="bg-background/50 border-border/50 focus:border-primary h-12 text-lg"
              />
              <p className="text-xs text-muted-foreground">
                {channelName.length}/30 символов
              </p>
            </div>

            <div className="space-y-3">
              <Label className="text-base">Выберите аватар</Label>
              <div className="bg-background/30 rounded-lg p-4 flex items-center justify-center mb-4">
                <div className="h-24 w-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-6xl neon-glow">
                  {selectedAvatar}
                </div>
              </div>
              
              <div className="grid grid-cols-8 gap-2 max-h-64 overflow-y-auto p-2 bg-background/30 rounded-lg">
                {emojiAvatars.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedAvatar(emoji)}
                    className={`h-12 w-12 text-3xl rounded-lg transition-all hover:scale-110 ${
                      selectedAvatar === emoji
                        ? 'bg-gradient-to-br from-primary to-secondary neon-glow ring-2 ring-primary'
                        : 'bg-card/50 hover:bg-card'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Info" size={16} className="text-primary" />
                <span className="font-semibold">Система наград:</span>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground ml-6">
                <div className="flex items-center gap-2">
                  <img src="https://cdn.poehali.dev/files/8we2lr3m.png" alt="badge" className="h-4 w-4" style={{ filter: 'sepia(1) saturate(3) hue-rotate(15deg)' }} />
                  <span>100 подписчиков — Коричневая галочка</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="https://cdn.poehali.dev/files/8we2lr3m.png" alt="badge" className="h-4 w-4" style={{ filter: 'brightness(1.2)' }} />
                  <span>1,000 подписчиков — Белая галочка</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="https://cdn.poehali.dev/files/8we2lr3m.png" alt="badge" className="h-4 w-4" style={{ filter: 'hue-rotate(200deg) saturate(2)' }} />
                  <span>1,000,000 подписчиков — Синяя галочка</span>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={!channelName.trim()}
              className="w-full bg-gradient-to-r from-primary to-secondary neon-glow h-14 text-lg font-semibold"
            >
              Создать канал
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateChannel;
