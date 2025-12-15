import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import VideoCard from '@/components/VideoCard';
import Sidebar from '@/components/Sidebar';

const mockVideos = [
  {
    id: '1',
    title: 'Креативный дизайн в 2025: тренды и инновации',
    channel: 'DesignHub',
    views: '2.3М',
    uploadDate: '2 дня назад',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    duration: '15:42',
    verified: true
  },
  {
    id: '2',
    title: 'Путешествие в Исландию: северное сияние',
    channel: 'TravelVlog',
    views: '1.8М',
    uploadDate: '5 дней назад',
    thumbnail: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    duration: '22:15',
    verified: true
  },
  {
    id: '3',
    title: 'Нейросети и искусство: будущее творчества',
    channel: 'TechArt',
    views: '985К',
    uploadDate: '1 неделю назад',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    duration: '18:30',
    verified: false
  },
  {
    id: '4',
    title: 'Космические открытия 2024: документальный фильм',
    channel: 'SpaceExplorer',
    views: '3.2М',
    uploadDate: '3 дня назад',
    thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80',
    duration: '45:20',
    verified: true
  },
  {
    id: '5',
    title: 'Минималистичная кухня: обзор и советы',
    channel: 'HomeStyle',
    views: '567К',
    uploadDate: '4 дня назад',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    duration: '12:08',
    verified: false
  },
  {
    id: '6',
    title: 'Электронная музыка: продакшн с нуля',
    channel: 'BeatMakers',
    views: '1.1М',
    uploadDate: '1 день назад',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
    duration: '28:55',
    verified: true
  }
];

const trendingTags = [
  'Музыка', 'Игры', 'Образование', 'Технологии', 'Кино', 'Спорт', 'Комедия', 'Новости'
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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
                <Button size="icon" className="h-12 w-12 bg-gradient-to-r from-primary to-secondary neon-glow">
                  <Icon name="User" size={20} />
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

            <div className="mb-6">
              <h2 className="text-2xl font-bold gradient-text mb-1">Рекомендации для вас</h2>
              <p className="text-muted-foreground">На основе ваших интересов</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {mockVideos.map((video, index) => (
                <div 
                  key={video.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <VideoCard video={video} />
                </div>
              ))}
            </div>

            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="TrendingUp" className="text-primary" size={28} />
                <h2 className="text-2xl font-bold gradient-text">В тренде</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVideos.slice(0, 3).map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
