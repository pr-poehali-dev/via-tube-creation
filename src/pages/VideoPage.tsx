import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import Sidebar from '@/components/Sidebar';
import VideoCard from '@/components/VideoCard';

const mockComments = [
  {
    id: '1',
    author: 'Александра К.',
    avatar: '👩',
    text: 'Потрясающий контент! Очень вдохновляет на творчество 🎨',
    likes: 234,
    timestamp: '2 часа назад',
    replies: 12
  },
  {
    id: '2',
    author: 'Дмитрий М.',
    avatar: '👨',
    text: 'Спасибо за подробный разбор! Все понятно объяснили',
    likes: 156,
    timestamp: '5 часов назад',
    replies: 8
  },
  {
    id: '3',
    author: 'Екатерина В.',
    avatar: '🦋',
    text: 'Жду продолжение этой серии! Тема очень актуальная',
    likes: 89,
    timestamp: '1 день назад',
    replies: 3
  }
];

const relatedVideos = [
  {
    id: '7',
    title: 'Продвинутые техники дизайна',
    channel: 'DesignHub',
    views: '890К',
    uploadDate: '3 дня назад',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80',
    duration: '12:30',
    verified: true
  },
  {
    id: '8',
    title: 'История современного искусства',
    channel: 'ArtWorld',
    views: '1.2М',
    uploadDate: '1 неделю назад',
    thumbnail: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&q=80',
    duration: '20:15',
    verified: true
  }
];

const VideoPage = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(true);

  const handlePlayVideo = () => {
    const rutubeUrl = `https://rutube.ru/`;
    window.open(rutubeUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 ml-64">
          <div className="container mx-auto px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div 
                  className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl overflow-hidden cursor-pointer group neon-glow"
                  onClick={handlePlayVideo}
                >
                  <img
                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform neon-glow">
                      <Icon name="Play" size={40} className="text-background ml-2" />
                    </div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-primary to-secondary neon-glow text-white border-0">
                    Смотреть на Rutube
                  </Badge>
                </div>

                <div>
                  <h1 className="text-3xl font-bold mb-2 gradient-text">
                    Креативный дизайн в 2025: тренды и инновации
                  </h1>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="font-medium">2.3М просмотров</span>
                      <span>•</span>
                      <span>2 дня назад</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant={liked ? "default" : "outline"}
                        size="sm"
                        className={`gap-2 ${liked ? 'bg-gradient-to-r from-primary to-secondary neon-glow' : ''}`}
                        onClick={() => setLiked(!liked)}
                      >
                        <Icon name={liked ? "Heart" : "Heart"} size={18} fill={liked ? "currentColor" : "none"} />
                        <span>2.3К</span>
                      </Button>

                      <Button variant="outline" size="sm" className="gap-2">
                        <Icon name="Share2" size={18} />
                        <span>Поделиться</span>
                      </Button>

                      <Button
                        variant={saved ? "default" : "outline"}
                        size="sm"
                        className={`gap-2 ${saved ? 'bg-gradient-to-r from-primary to-secondary neon-glow' : ''}`}
                        onClick={() => setSaved(!saved)}
                      >
                        <Icon name="Bookmark" size={18} fill={saved ? "currentColor" : "none"} />
                        <span>{saved ? 'Сохранено' : 'Сохранить'}</span>
                      </Button>

                      <Button variant="outline" size="icon">
                        <Icon name="MoreHorizontal" size={18} />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 rounded-xl p-6 border border-border/50">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
                      <span className="text-xl">🎨</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">DesignHub</h3>
                        <Icon name="BadgeCheck" size={18} className="text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">2.5М подписчиков</p>
                      <p className="text-foreground leading-relaxed">
                        Исследуем самые актуальные тренды современного дизайна. В этом видео разбираем ключевые направления 2025 года: минимализм нового поколения, неоморфизм и футуристические интерфейсы. 🚀
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-secondary neon-glow">
                      Подписаться
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Icon name="MessageSquare" size={24} className="text-primary" />
                      Комментарии ({mockComments.length})
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowComments(!showComments)}
                    >
                      {showComments ? 'Скрыть' : 'Показать'}
                    </Button>
                  </div>

                  {showComments && (
                    <>
                      <div className="flex gap-3 mb-6">
                        <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <span>👤</span>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Добавьте комментарий..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-[80px] bg-background/50 border-border/50 focus:border-primary resize-none"
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <Button variant="ghost" size="sm" onClick={() => setComment('')}>
                              Отмена
                            </Button>
                            <Button 
                              size="sm"
                              disabled={!comment.trim()}
                              className="bg-gradient-to-r from-primary to-secondary neon-glow"
                            >
                              Опубликовать
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {mockComments.map((comment) => (
                          <div key={comment.id} className="flex gap-3 animate-fade-in">
                            <Avatar className="h-10 w-10 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl">
                              {comment.avatar}
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                              </div>
                              <p className="text-foreground mb-2">{comment.text}</p>
                              <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="h-8 gap-2">
                                  <Icon name="ThumbsUp" size={16} />
                                  <span className="text-xs">{comment.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 gap-2">
                                  <Icon name="MessageSquare" size={16} />
                                  <span className="text-xs">{comment.replies}</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Sparkles" className="text-primary" size={24} />
                  <h3 className="font-bold text-lg gradient-text">Похожие видео</h3>
                </div>
                {relatedVideos.map((video) => (
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

export default VideoPage;
