import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    channel: string;
    views: string;
    uploadDate: string;
    thumbnail: string;
    duration: string;
    verified: boolean;
  };
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const rutubeUrl = `https://rutube.ru/`;
    window.open(rutubeUrl, '_blank');
  };

  return (
    <Card
      className="group overflow-hidden bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Badge className="absolute bottom-2 right-2 bg-black/80 text-white border-0 backdrop-blur-sm">
          {video.duration}
        </Badge>

        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center animate-scale-in">
            <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm neon-glow">
              <Icon name="Play" size={28} className="text-background ml-1" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 neon-glow">
            <span className="text-sm font-bold">{video.channel[0]}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span className="font-medium">{video.channel}</span>
              {video.verified && (
                <Icon name="BadgeCheck" size={14} className="text-primary" />
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{video.views} просмотров</span>
              <span>•</span>
              <span>{video.uploadDate}</span>
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Icon name="MoreVertical" size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;
