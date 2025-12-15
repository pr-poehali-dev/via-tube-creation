import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Sidebar from '@/components/Sidebar';
import { getBadgeForSubscribers } from '@/utils/badges';

interface UserData {
  channelName: string;
  avatar: string;
  subscribers: number;
  createdAt: string;
}

const trendingTags = [
  'Музыка', 'Игры', 'Образование', 'Технологии', 'Кино', 'Спорт', 'Комедия', 'Новости'
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('viatube_user');
    if (!storedUser) {
      navigate('/auth');
    } else {
      setUserData(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!userData) return null;

  const userBadge = getBadgeForSubscribers(userData.subscribers);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 ml-64">
          <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 max-w-2xl relative">
                  <Icon 
                    name="Search" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
                    size={20} 
                  />
                  <Input
                    type="text"
                    placeholder="Поиск видео..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 h-12 bg-background/50 border-border/50 focus:border-primary neon-glow transition-all"
                  />
                </div>
                <Button size="icon" variant="ghost" className="h-12 w-12">
                  <Icon name="Mic" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="h-12 w-12">
                  <Icon name="Bell" size={20} />
                </Button>
                <Button 
                  size="icon" 
                  className="h-12 w-12 bg-gradient-to-br from-primary to-secondary neon-glow relative"
                  onClick={() => navigate('/profile')}
                >
                  <span className="text-2xl">{userData.avatar}</span>
                  {userBadge && (
                    <img 
                      src={userBadge.icon} 
                      alt="badge" 
                      className="absolute -bottom-1 -right-1 h-5 w-5" 
                      style={{ filter: userBadge.color }}
                    />
                  )}
                </Button>
              </div>
            </div>
          </header>

          <div className="container mx-auto px-6 py-6">
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {trendingTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm whitespace-nowrap transition-all hover:scale-105 ${
                    selectedTag === tag 
                      ? 'bg-gradient-to-r from-primary to-secondary neon-glow' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <div className="h-32 w-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6">
                <Icon name="Video" size={64} className="text-primary" />
              </div>
              <h2 className="text-3xl font-bold gradient-text mb-3">Пока здесь пусто</h2>
              <p className="text-muted-foreground text-lg mb-8 text-center max-w-md">
                Видео появятся, когда создатели начнут загружать контент на ViaTube
              </p>
              <div className="bg-card/50 border border-border/50 rounded-xl p-6 max-w-md">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{userData.avatar}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{userData.channelName}</span>
                      {userBadge && (
                        <img 
                          src={userBadge.icon} 
                          alt="badge" 
                          className="h-5 w-5" 
                          style={{ filter: userBadge.color }}
                        />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {userData.subscribers} подписчиков
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {userBadge 
                    ? `Поздравляем! Вы заработали ${userBadge.name}` 
                    : 'Наберите 100 подписчиков для получения первой награды'}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
