import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import Sidebar from '@/components/Sidebar';
import { getBadgeForSubscribers, formatSubscribers, BADGES } from '@/utils/badges';

interface UserData {
  channelName: string;
  avatar: string;
  subscribers: number;
  createdAt: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [testSubscribers, setTestSubscribers] = useState('');

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

  const handleLogout = () => {
    localStorage.removeItem('viatube_user');
    navigate('/auth');
  };

  const handleTestSubscribers = () => {
    const count = parseInt(testSubscribers);
    if (!isNaN(count) && count >= 0) {
      const updatedUser = { ...userData, subscribers: count };
      localStorage.setItem('viatube_user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setTestSubscribers('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 ml-64">
          <div className="container mx-auto px-6 py-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-primary/10 via-card/50 to-secondary/10 border-border/50 backdrop-blur-xl p-8 mb-6 animate-fade-in">
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div className="h-32 w-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-7xl neon-glow">
                      {userData.avatar}
                    </div>
                    {userBadge && (
                      <img 
                        src={userBadge.icon} 
                        alt="badge" 
                        className="absolute -bottom-2 -right-2 h-12 w-12" 
                        style={{ filter: userBadge.color }}
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <h1 className="text-4xl font-bold gradient-text mb-2">
                      {userData.channelName}
                    </h1>
                    <p className="text-2xl font-semibold text-foreground mb-2">
                      {formatSubscribers(userData.subscribers)} подписчиков
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Канал создан {new Date(userData.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                    
                    {userBadge && (
                      <div className="flex items-center gap-2 bg-card/50 rounded-lg px-4 py-2 inline-flex">
                        <img 
                          src={userBadge.icon} 
                          alt="badge" 
                          className="h-6 w-6" 
                          style={{ filter: userBadge.color }}
                        />
                        <span className="font-semibold">{userBadge.name}</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleLogout}
                  >
                    <Icon name="LogOut" size={20} />
                  </Button>
                </div>
              </Card>

              <Card className="bg-card/50 border-border/50 backdrop-blur-xl p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-2xl font-bold gradient-text mb-4 flex items-center gap-2">
                  <Icon name="Award" size={28} className="text-primary" />
                  Система наград
                </h2>
                <p className="text-muted-foreground mb-6">
                  Зарабатывайте галочки за увеличение количества подписчиков
                </p>

                <div className="space-y-4">
                  {BADGES.map((badge, index) => {
                    const isEarned = userData.subscribers >= badge.minSubscribers;
                    const progress = Math.min((userData.subscribers / badge.minSubscribers) * 100, 100);

                    return (
                      <div 
                        key={index}
                        className={`bg-background/50 rounded-lg p-4 border transition-all ${
                          isEarned 
                            ? 'border-primary/50 neon-glow' 
                            : 'border-border/50'
                        }`}
                      >
                        <div className="flex items-center gap-4 mb-2">
                          <img 
                            src={badge.icon} 
                            alt={badge.name} 
                            className="h-10 w-10" 
                            style={{ 
                              filter: isEarned ? badge.color : 'grayscale(1) opacity(0.3)'
                            }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`font-bold ${isEarned ? 'gradient-text' : 'text-muted-foreground'}`}>
                                {badge.name}
                              </span>
                              {isEarned && (
                                <Icon name="CheckCircle2" size={20} className="text-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {formatSubscribers(badge.minSubscribers)} подписчиков
                            </p>
                          </div>
                        </div>
                        
                        {!isEarned && (
                          <div className="mt-3">
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatSubscribers(badge.minSubscribers - userData.subscribers)} осталось
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="bg-card/50 border-border/50 backdrop-blur-xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-bold gradient-text mb-4 flex items-center gap-2">
                  <Icon name="TestTube" size={24} className="text-primary" />
                  Тестирование наград
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Измените количество подписчиков, чтобы увидеть разные награды
                </p>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Количество подписчиков"
                    value={testSubscribers}
                    onChange={(e) => setTestSubscribers(e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                  <Button 
                    onClick={handleTestSubscribers}
                    className="bg-gradient-to-r from-primary to-secondary neon-glow"
                  >
                    Применить
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[0, 100, 1000, 50000, 1000000].map((count) => (
                    <Button
                      key={count}
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const updatedUser = { ...userData, subscribers: count };
                        localStorage.setItem('viatube_user', JSON.stringify(updatedUser));
                        setUserData(updatedUser);
                      }}
                    >
                      {formatSubscribers(count)}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
